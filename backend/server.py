from dotenv import load_dotenv
load_dotenv()

import asyncio
import ipaddress
import logging
import os
import re
import uuid
from datetime import datetime, timedelta, timezone
from html import escape
from html.parser import HTMLParser
from typing import Annotated, Optional
from urllib.parse import urlparse

import bcrypt
import httpx
import jwt
import requests
from bson import ObjectId
from fastapi import APIRouter, Depends, FastAPI, File, HTTPException, Request, Response, UploadFile
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="PT Kaltara Jaya Makmur API")
api_router = APIRouter(prefix="/api")

# ---------------- Mongo base ----------------
PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    def to_mongo(self) -> dict:
        doc = self.model_dump(by_alias=True)
        doc["_id"] = ObjectId(doc["_id"])
        return doc

    @classmethod
    def from_mongo(cls, doc):
        if doc is None:
            return None
        return cls(**doc)


class User(BaseDocument):
    email: str
    password_hash: str
    name: str = "Admin"
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class News(BaseDocument):
    title: str
    slug: str
    category: str = "Kegiatan"
    excerpt: str = ""
    content: str = ""
    image: str = ""
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GalleryItem(BaseDocument):
    title: str
    category: str = "Operasional"
    image: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessage(BaseDocument):
    name: str
    email: str
    phone: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FileRecord(BaseDocument):
    storage_path: str
    original_filename: str = ""
    content_type: str = "application/octet-stream"
    size: int = 0
    is_deleted: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsInput(BaseModel):
    title: str
    category: str = "Kegiatan"
    excerpt: str = ""
    content: str = ""
    image: str = ""
    published: bool = True


class GalleryInput(BaseModel):
    title: str
    category: str = "Operasional"
    image: str


class ContactInput(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    message: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


# ---------------- Auth ----------------
JWT_ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=12), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user["id"] = str(user["_id"])
    user["_id"] = str(user["_id"])
    user.pop("password_hash", None)
    return user


async def seed_admin():
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        admin = User(email=admin_email, password_hash=hash_password(admin_password))
        await db.users.insert_one(admin.to_mongo())
        logger.info("Admin seeded: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password refreshed from env")


@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request, response: Response):
    email = input.email.lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= 5:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.now(timezone.utc) < locked_until:
            raise HTTPException(status_code=429, detail="Terlalu banyak percobaan. Coba lagi dalam 15 menit.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Email atau password salah")

    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(str(user["_id"]), email)
    response.set_cookie(key="access_token", value=token, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    return {"id": str(user["_id"]), "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"status": "success"}


@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return {"id": user["id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


# ---------------- Email (Emergent managed) ----------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error("Email send error: %s", str(e))
        raise HTTPException(status_code=502, detail="Failed to send email")


# ---------------- Object storage (Emergent) ----------------
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "nusa-enviro-lestari"
storage_key = None

MIME_TYPES = {
    "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
    "gif": "image/gif", "webp": "image/webp",
}


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key, "Content-Type": content_type}, data=data, timeout=120)
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


@api_router.post("/admin/upload")
async def admin_upload(file: UploadFile = File(...), user=Depends(get_current_user)):
    ext = file.filename.rsplit(".", 1)[-1].lower() if file.filename and "." in file.filename else ""
    mime = MIME_TYPES.get(ext)
    if not mime:
        raise HTTPException(status_code=400, detail="Hanya gambar (jpg, png, webp, gif) yang diizinkan")
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Ukuran file maksimal 10MB")
    path = f"{APP_NAME}/uploads/{user['id']}/{uuid.uuid4()}.{ext}"
    result = await asyncio.to_thread(put_object, path, data, mime)
    record = FileRecord(storage_path=result["path"], original_filename=file.filename or "", content_type=mime, size=result.get("size", len(data)))
    await db.files.insert_one(record.to_mongo())
    return {"path": result["path"], "size": result.get("size", len(data))}


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File tidak ditemukan")
    data, content_type = await asyncio.to_thread(get_object, path)
    return Response(content=data, media_type=record.get("content_type") or content_type)


# ---------------- News (Berita) ----------------
def slugify(text: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return base or "berita"


@api_router.get("/news")
async def list_news():
    items = await db.news.find({"published": True}).sort("created_at", -1).to_list(200)
    return [News.from_mongo(i).model_dump(by_alias=False, mode="json") for i in items]


@api_router.get("/news/{slug}")
async def get_news(slug: str):
    item = await db.news.find_one({"slug": slug, "published": True})
    if not item:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    return News.from_mongo(item).model_dump(by_alias=False, mode="json")


@api_router.get("/admin/news")
async def admin_list_news(user=Depends(get_current_user)):
    items = await db.news.find().sort("created_at", -1).to_list(500)
    return [News.from_mongo(i).model_dump(by_alias=False, mode="json") for i in items]


@api_router.post("/admin/news")
async def create_news(input: NewsInput, user=Depends(get_current_user)):
    slug = slugify(input.title)
    if await db.news.find_one({"slug": slug}):
        slug = f"{slug}-{uuid.uuid4().hex[:6]}"
    news = News(title=input.title, slug=slug, category=input.category, excerpt=input.excerpt, content=input.content, image=input.image, published=input.published)
    await db.news.insert_one(news.to_mongo())
    return news.model_dump(by_alias=False, mode="json")


@api_router.put("/admin/news/{news_id}")
async def update_news(news_id: str, input: NewsInput, user=Depends(get_current_user)):
    result = await db.news.update_one(
        {"_id": ObjectId(news_id)},
        {"$set": {"title": input.title, "category": input.category, "excerpt": input.excerpt, "content": input.content, "image": input.image, "published": input.published}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    item = await db.news.find_one({"_id": ObjectId(news_id)})
    return News.from_mongo(item).model_dump(by_alias=False, mode="json")


@api_router.delete("/admin/news/{news_id}")
async def delete_news(news_id: str, user=Depends(get_current_user)):
    result = await db.news.delete_one({"_id": ObjectId(news_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Berita tidak ditemukan")
    return {"status": "success"}


# ---------------- Gallery (Galeri) ----------------
@api_router.get("/gallery")
async def list_gallery():
    items = await db.gallery.find().sort("created_at", -1).to_list(300)
    return [GalleryItem.from_mongo(i).model_dump(by_alias=False, mode="json") for i in items]


@api_router.post("/admin/gallery")
async def create_gallery(input: GalleryInput, user=Depends(get_current_user)):
    item = GalleryItem(title=input.title, category=input.category, image=input.image)
    await db.gallery.insert_one(item.to_mongo())
    return item.model_dump(by_alias=False, mode="json")


@api_router.delete("/admin/gallery/{item_id}")
async def delete_gallery(item_id: str, user=Depends(get_current_user)):
    result = await db.gallery.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Foto tidak ditemukan")
    return {"status": "success"}


# ---------------- Contact ----------------
@api_router.post("/contact")
async def submit_contact(input: ContactInput):
    msg = ContactMessage(name=input.name, email=str(input.email), phone=input.phone, message=input.message)
    await db.contact_messages.insert_one(msg.to_mongo())
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#0F172A">'
        f'<h2 style="margin:0 0 12px;color:#0D3B3E">Pesan Baru dari Website</h2>'
        f'<p style="margin:4px 0"><strong>Nama:</strong> {escape(input.name)}</p>'
        f'<p style="margin:4px 0"><strong>Email:</strong> {escape(str(input.email))}</p>'
        f'<p style="margin:4px 0"><strong>Telepon:</strong> {escape(input.phone or "-")}</p>'
        f'<p style="margin:12px 0 4px"><strong>Pesan:</strong></p>'
        f'<p style="margin:0;white-space:pre-line">{escape(input.message)}</p>'
        f'<p style="font-size:12px;color:#64748B;margin-top:20px">Dikirim otomatis oleh website {escape(EMAIL_FROM_NAME)}.</p>'
        "</td></tr></table>"
    )
    try:
        await send_email(to=os.environ["CONTACT_INBOX"], subject="Pesan Baru dari Website Company Profile", html=html)
    except Exception as e:
        logger.error("Contact email failed: %s", str(e))
    return {"status": "success", "message": "Terima kasih! Pesan Anda telah kami terima dan akan segera kami balas."}


# ---------------- SEO: sitemap ----------------
@api_router.get("/sitemap.xml")
async def sitemap():
    base = os.environ["SITE_URL"].rstrip("/")
    static_pages = ["", "/tentang-kami", "/legalitas", "/layanan", "/galeri", "/berita", "/kontak"]
    urls = []
    for p in static_pages:
        urls.append(f"<url><loc>{base}{p}</loc><changefreq>weekly</changefreq></url>")
    news_items = await db.news.find({"published": True}, {"slug": 1, "created_at": 1}).to_list(500)
    for n in news_items:
        urls.append(f"<url><loc>{base}/berita/{n['slug']}</loc><changefreq>monthly</changefreq></url>")
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>"
    return Response(content=xml, media_type="application/xml")


@api_router.get("/")
async def root():
    return {"message": "PT Kaltara Jaya Makmur API"}


# ---------------- Seed content ----------------
SEED_IMAGES = {
    "fleet": "https://images.unsplash.com/photo-1700891271072-03bef644f435?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxoYXphcmRvdXMlMjB3YXN0ZSUyMHRyYW5zcG9ydCUyMHRydWNrJTIwY2xlYW4lMjB0ZWNobm9sb2d5JTIwZmFjaWxpdHklMjBncmVlbiUyMGVuZXJneSUyMGVudmlyb25tZW50fGVufDB8fHx8MTc4OTExNDk4OXww&ixlib=rb-4.1.0&q=85",
    "warehouse": "https://images.unsplash.com/photo-1717667745830-de42bb75a4fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxoYXphcmRvdXMlMjB3YXN0ZSUyMHRyYW5zcG9ydCUyMHRydWNrJTIwY2xlYW4lMjB0ZWNobm9sb2d5JTIwZmFjaWxpdHklMjBncmVlbiUyMGVuZXJneSUyMGVudmlyb25tZW50fGVufDB8fHx8MTc4OTExNDk4OXww&ixlib=rb-4.1.0&q=85",
    "transport": "https://images.unsplash.com/photo-1660574554228-4cb61ed52309?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxoYXphcmRvdXMlMjB3YXN0ZSUyMHRyYW5zcG9ydCUyMHRydWNrJTIwY2xlYW4lMjB0ZWNobm9sb2d5JTIwZmFjaWxpdHklMjBncmVlbiUyMGVuZXJneSUyMGVudmlyb25tZW50fGVufDB8fHx8MTc4OTExNDk4OXww&ixlib=rb-4.1.0&q=85",
    "tanker": "https://images.unsplash.com/photo-1549909226-2f7fcd960d6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHw0fHxoYXphcmRvdXMlMjB3YXN0ZSUyMHRyYW5zcG9ydCUyMHRydWNrJTIwY2xlYW4lMjB0ZWNobm9sb2d5JTIwZmFjaWxpdHklMjBncmVlbiUyMGVuZXJneSUyMGVudmlyb25tZW50fGVufDB8fHx8MTc4OTExNDk4OXww&ixlib=rb-4.1.0&q=85",
    "lab": "https://images.unsplash.com/photo-1781330201986-005653f25a3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBlbnZpcm9ubWVudGFsJTIwZW5naW5lZXIlMjBsYWJvcmF0b3J5JTIwaGF6YXJkb3VzJTIwd2FzdGUlMjByZWN5Y2xpbmclMjBwbGFudHxlbnwwfHx8fDE3ODkxMTQ5OTd8MA&ixlib=rb-4.1.0&q=85",
    "plant": "https://images.unsplash.com/photo-1763315156830-07870b159121?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBlbnZpcm9ubWVudGFsJTIwZW5naW5lZXIlMjBsYWJvcmF0b3J5JTIwaGF6YXJkb3VzJTIwd2FzdGUlMjByZWN5Y2xpbmclMjBwbGFudHxlbnwwfHx8fDE3ODkxMTQ5OTd8MA&ixlib=rb-4.1.0&q=85",
    "storage": "https://images.unsplash.com/photo-1654703681116-3988648da2b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBlbnZpcm9ubWVudGFsJTIwZW5naW5lZXIlMjBsYWJvcmF0b3J5JTIwaGF6YXJkb3VzJTIwd2FzdGUlMjByZWN5Y2xpbmclMjBwbGFudHxlbnwwfHx8fDE3ODkxMTQ5OTd8MA&ixlib=rb-4.1.0&q=85",
}


async def seed_content():
    if await db.news.count_documents({}) == 0:
        seeds = [
            News(
                title="PT Kaltara Jaya Makmur Perkuat Layanan Pengangkutan Limbah B3 di Kalimantan",
                slug="pt-kaltara-jaya-makmur-perkuat-layanan-pengangkutan-limbah-b3",
                category="Perusahaan",
                excerpt="Komitmen kami melayani pengangkutan dan pengumpulan limbah B3 yang aman dan legal bagi industri di Kalimantan.",
                content="PT Kaltara Jaya Makmur (KJM313) terus memperkuat layanan pengangkutan dan pengumpulan limbah B3 bagi industri di Kalimantan Utara, Kalimantan Timur, dan sekitarnya.\n\nDidukung izin rekomendasi dari KLHK, izin penyelenggaraan angkutan barang khusus dari Kementerian Perhubungan, serta perlindungan asuransi dari Jasindo, setiap pengangkutan kami jalankan dengan standar keselamatan tinggi.\n\nKami berterima kasih kepada seluruh klien dan mitra yang mempercayakan penanganan limbah B3 mereka kepada kami.",
                image=SEED_IMAGES["plant"],
            ),
            News(
                title="Penambahan Unit Armada Baru untuk Layanan Kalimantan",
                slug="penambahan-unit-armada-baru-layanan-kalimantan",
                category="Armada",
                excerpt="Memperkuat kapasitas angkut limbah B3 dengan armada berstandar Kemenhub dan GPS tracking real-time.",
                content="Dalam rangka meningkatkan kapasitas layanan pengangkutan limbah B3, PT Kaltara Jaya Makmur menambah unit armada wingbox terbaru.\n\nSeluruh unit dilengkapi dengan GPS tracking real-time, APAR, spill kit, dan dikemudikan oleh pengemudi bersertifikat pengangkutan barang berbahaya.\n\nPenambahan armada ini memperkuat jangkauan layanan kami dari hub utama di Tarakan ke seluruh wilayah Kalimantan dengan jadwal penjemputan yang lebih fleksibel.",
                image=SEED_IMAGES["fleet"],
            ),
            News(
                title="Program CSR: Penanaman Pohon di Sekitar Fasilitas Tarakan",
                slug="program-csr-penanaman-pohon-tarakan",
                category="CSR",
                excerpt="Wujud nyata kepedulian lingkungan melalui penghijauan bersama masyarakat sekitar fasilitas.",
                content="PT Kaltara Jaya Makmur melaksanakan program CSR penanaman pohon di sekitar fasilitas pool armada dan TPS limbah B3 kami di Tarakan Timur.\n\nKegiatan ini melibatkan karyawan, masyarakat sekitar, dan kelurahan setempat sebagai bentuk komitmen kami terhadap kelestarian lingkungan Kalimantan Utara.\n\nProgram penghijauan ini akan berlanjut setiap tahun dengan target area yang lebih luas.",
                image=SEED_IMAGES["transport"],
            ),
        ]
        await db.news.insert_many([n.to_mongo() for n in seeds])
        logger.info("News seeded")

    if await db.gallery.count_documents({}) == 0:
        gallery_seeds = [
            GalleryItem(title="Armada Wingbox Siap Berangkat", category="Armada", image=SEED_IMAGES["fleet"]),
            GalleryItem(title="Gudang Penyimpanan Limbah B3", category="Fasilitas", image=SEED_IMAGES["warehouse"]),
            GalleryItem(title="Operasional Pengangkutan", category="Operasional", image=SEED_IMAGES["transport"]),
            GalleryItem(title="Truk Tangki Limbah Cair B3", category="Armada", image=SEED_IMAGES["tanker"]),
            GalleryItem(title="Uji Laboratorium Karakteristik Limbah", category="Fasilitas", image=SEED_IMAGES["lab"]),
            GalleryItem(title="Fasilitas Pengelolaan Terpadu", category="Fasilitas", image=SEED_IMAGES["plant"]),
            GalleryItem(title="Area Penyimpanan Drum Limbah", category="Operasional", image=SEED_IMAGES["storage"]),
        ]
        await db.gallery.insert_many([g.to_mongo() for g in gallery_seeds])
        logger.info("Gallery seeded")


# ---------------- Startup / shutdown ----------------
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.news.create_index("slug", unique=True)
    await db.login_attempts.create_index("identifier")
    await seed_admin()
    await seed_content()
    try:
        await asyncio.to_thread(init_storage)
        logger.info("Storage initialized")
    except Exception as e:
        logger.error("Storage init failed: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
