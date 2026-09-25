# Website Company Profile — PT Kaltara Jaya Makmur (PT KJM)

PT Kaltara Jaya Makmur merupakan perusahaan swasta yang telah berdiri sejak tahun 2015 dan bergerak di bidang Waste Service, dengan fokus pada layanan pengelolaan Limbah B3 (Bahan Berbahaya dan Beracun), khususnya dalam kegiatan pengangkutan (Transportir) Limbah B3.

Website company profile perusahaan pengangkutan Limbah B3 berizin (Tarakan, Kalimantan Utara). Stack: **React (frontend) + FastAPI (backend) + MongoDB**.

## Struktur Proyek

```
├── backend/          # FastAPI + MongoDB (API, auth admin, email, upload foto)
├── frontend/         # React 19 + Tailwind + framer-motion + lenis
├── PANDUAN_DEPLOY_SEO.md   # Panduan deploy & muncul di Google
└── README.md
```

### Catatan
- **Upload foto** disimpan langsung di MongoDB (tanpa layanan eksternal). **Form kontak** mengirim email via SMTP — isi `SMTP_USER` & `SMTP_PASS` (App Password Gmail) di `.env`. Tanpa SMTP, website tetap jalan normal dan pesan kontak tetap tersimpan di database.
- Data perusahaan (alamat, WA, legalitas, armada, mitra) terpusat di `frontend/src/data/company.js`.
- Panduan lengkap sampai muncul di Google: baca **PANDUAN_DEPLOY_SEO.md**.
