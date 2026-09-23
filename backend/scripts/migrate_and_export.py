"""Migrasi satu kali: pindahkan file dari Emergent object storage ke MongoDB,
lalu ekspor seluruh konten (news, gallery, files) ke seed_data.json
untuk auto-import saat deploy baru (Atlas/Render).

Jalankan dari folder backend:  python3 scripts/migrate_and_export.py
"""
import base64
import json
import os
import sys

import requests
from bson import Binary
from dotenv import load_dotenv
from pymongo import MongoClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

db = MongoClient(os.environ["MONGO_URL"])[os.environ["DB_NAME"]]

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")


def init_storage():
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    return resp.json()["storage_key"]


def get_object(path, key):
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content


def migrate_files():
    key = init_storage()
    migrated, skipped, failed = 0, 0, 0
    for rec in db.files.find({"is_deleted": False}):
        if rec.get("data"):
            skipped += 1
            continue
        try:
            content = get_object(rec["storage_path"], key)
            db.files.update_one({"_id": rec["_id"]}, {"$set": {"data": Binary(content), "size": len(content)}})
            migrated += 1
            print(f"  OK  {rec['storage_path']} ({len(content)} bytes)")
        except Exception as e:
            failed += 1
            print(f"  GAGAL {rec['storage_path']}: {e}")
    print(f"Migrasi selesai: {migrated} dipindah, {skipped} sudah ada, {failed} gagal")


def export_seed():
    def serialize(doc):
        doc["_id"] = str(doc["_id"])
        doc["created_at"] = doc["created_at"].isoformat()
        return doc

    seed = {
        "news": [serialize(n) for n in db.news.find()],
        "gallery": [serialize(g) for g in db.gallery.find()],
        "files": [],
    }
    for f in db.files.find({"is_deleted": False}):
        doc = serialize(f)
        doc["data_b64"] = base64.b64encode(bytes(doc.pop("data"))).decode()
        seed["files"].append(doc)

    out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "seed_data.json")
    with open(out, "w") as fp:
        json.dump(seed, fp)
    size_mb = round(os.path.getsize(out) / 1024 / 1024, 1)
    print(f"seed_data.json dibuat: {len(seed['news'])} berita, {len(seed['gallery'])} galeri, {len(seed['files'])} file ({size_mb} MB)")


if __name__ == "__main__":
    migrate_files()
    export_seed()
