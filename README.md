# Website Company Profile — PT Kaltara Jaya Makmur (KJM313)

Website company profile untuk perusahaan pengangkutan & pengumpulan Limbah B3 berizin (Tarakan, Kalimantan Utara). Stack: **React (frontend) + FastAPI (backend) + MongoDB**.

## Struktur Proyek

```
├── backend/          # FastAPI + MongoDB (API, auth admin, email, upload foto)
├── frontend/         # React 19 + Tailwind + framer-motion + lenis
├── PANDUAN_DEPLOY_SEO.md   # Panduan deploy & muncul di Google
└── README.md
```

## Cara Menjalankan di Lokal (VS Code)

### 0. Prasyarat
- Install **Node.js 18+** dan **Yarn** (`npm install -g yarn`)
- Install **Python 3.10+**
- Install & jalankan **MongoDB** lokal (atau pakai MongoDB Atlas gratis)

### 1. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
cp .env.example .env         # lalu isi nilainya
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Frontend (terminal baru)
```bash
cd frontend
cp .env.example .env         # lalu isi nilainya
yarn install
yarn start
```
Buka http://localhost:3000 — API di http://localhost:8001/api

### 3. Login Admin CMS
Buka http://localhost:3000/admin/login — email & password sesuai `ADMIN_EMAIL` / `ADMIN_PASSWORD` di `backend/.env` (akun otomatis dibuat saat backend pertama jalan).

### Catatan
- **Upload foto** disimpan langsung di MongoDB (tanpa layanan eksternal). **Form kontak** mengirim email via SMTP — isi `SMTP_USER` & `SMTP_PASS` (App Password Gmail) di `.env`. Tanpa SMTP, website tetap jalan normal dan pesan kontak tetap tersimpan di database.
- Data perusahaan (alamat, WA, legalitas, armada, mitra) terpusat di `frontend/src/data/company.js`.
- Panduan lengkap sampai muncul di Google: baca **PANDUAN_DEPLOY_SEO.md**.

## Push ke GitHub (anggizahra2)
```bash
git remote add origin https://github.com/anggizahra2/kjm313-company-profile.git
git branch -M main
git push -u origin main
```
(Buat dulu repository kosong bernama `kjm313-company-profile` di https://github.com/new — jangan centang "Add README".)
