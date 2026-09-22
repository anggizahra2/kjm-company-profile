# Panduan Lengkap: Dari Kode Sampai Muncul di Google

Panduan ini untuk website company profile **PT Kaltara Jaya Makmur (KJM313)**. Ikuti urut dari awal.

---

## BAGIAN 1 — Ganti Data Contoh dengan Data Asli Perusahaan

Semua data contoh terpusat dan mudah diganti:

1. **Data perusahaan utama** — buka file `frontend/src/data/company.js`:
   - `name`: nama resmi perusahaan (sesuai akta/izin, ini penting untuk SEO)
   - `address`, `phone`, `email`
   - `whatsapp`: nomor WA format internasional tanpa `+` (contoh: `6281234567890`)
   - `whatsappMessage`: pesan otomatis saat orang klik tombol WA
   - `socials`: link Instagram, LinkedIn, Facebook, YouTube
   - `legalitas`: daftar izin (nomor SK KLHK, Kemenhub, ISO, dll)
   - `armada`: jenis & jumlah armada
   - `wilayah`: wilayah layanan
2. **Email tujuan form kontak** — buka `backend/.env`, ganti `CONTACT_INBOX` dan `EMAIL_REPLY_TO` dengan email asli perusahaan (misal `info@perusahaanmu.co.id`). Tanpa ini, pesan dari form kontak tidak sampai ke kamu.
3. **SEO dasar** — buka `frontend/public/index.html`:
   - Ganti `<title>`, `meta description`, `keywords` dengan nama perusahaan asli
   - Ganti semua URL `https://b3-care-portal.preview.emergentagent.com` dengan domain aslimu nanti
   - Ganti data di blok `application/ld+json` (alamat, telepon, sosial media)
4. **Robots & Sitemap** — buka `frontend/public/robots.txt` dan `backend/.env` (`SITE_URL`), ganti domain dengan domain aslimu.
5. **Konten berita & galeri** — login ke `/admin/login` lalu hapus konten contoh dan tambahkan berita & foto asli perusahaan.
6. **Password admin** — ganti `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `backend/.env`, lalu restart backend. Password baru otomatis aktif.

---

## BAGIAN 2 — Jalankan & Deploy Website

### Opsi A — Deploy langsung dari Emergent (paling mudah)
1. Klik tombol **Deploy** di dashboard Emergent.
2. Website langsung online dengan URL permanen `https://namakamu.emergent.host` (atau serupa).
3. Semua fitur (CMS admin, form kontak, galeri) langsung jalan.

### Opsi B — Hosting sendiri (Vercel + Render/Railway + MongoDB Atlas)
1. **Database**: buat akun gratis di mongodb.com/atlas → buat cluster → ambil connection string → isi ke `MONGO_URL` di `backend/.env`.
2. **Backend**: deploy folder `backend` ke Render.com / Railway → start command: `uvicorn server:app --host 0.0.0.0 --port $PORT` → isi semua environment variable dari `.env`.
3. **Frontend**: deploy folder `frontend` ke Vercel → build command `yarn build`, output `build` → isi env `REACT_APP_BACKEND_URL` dengan URL backend-mu.
4. Update `SITE_URL`, `FRONTEND_URL`, canonical URL, dan `robots.txt` dengan domain final.

---

## BAGIAN 3 — Pasang Domain Sendiri (agar terlihat profesional)

1. Beli domain di Niagahoster / IDWebhost / Cloudflare / GoDaddy (misal `nusaenvirolestari.co.id` — domain `.co.id` butuh dokumen SIU/NIB, `.com` langsung bisa).
2. Arahkan DNS ke hostingmu:
   - Emergent/Vercel: tambahkan domain di dashboard, lalu buat record `CNAME` sesuai petunjuk.
3. Setelah domain aktif, update semua URL di `index.html`, `robots.txt`, `SITE_URL` (backend .env) ke domain baru.

---

## BAGIAN 4 — Daftarkan ke Google (INI KUNCI MUNCUL DI PENCARIAN)

1. Buka **Google Search Console**: https://search.google.com/search-console
2. Klik **Tambah Properti** → pilih **URL prefix** → masukkan `https://domainmu.co.id`.
3. Verifikasi kepemilikan — cara termudah: pilih metode **HTML tag**, salin meta tag-nya, tempel di `frontend/public/index.html` di dalam `<head>`, deploy ulang, klik Verifikasi.
4. Setelah terverifikasi, masuk menu **Sitemaps** → submit: `https://domainmu.co.id/api/sitemap.xml`
5. Masuk menu **Inspeksi URL** → masukkan URL beranda → klik **Minta Pengindeksan** (request indexing). Ulangi untuk halaman `/tentang-kami`, `/layanan`, `/legalitas`.
6. Tunggu 1–7 hari. Cek di Google dengan mengetik: `site:domainmu.co.id`. Kalau sudah muncul, websitemu terindeks.
7. Agar muncul saat **nama perusahaan** diketik: pastikan nama perusahaan ada di `<title>` beranda (sudah saya buat), di heading H1, dan di footer. Biasanya butuh 1–4 minggu untuk nama baru.

### Percepat dengan Google Business Profile (GRATIS, sangat disarankan)
1. Buka https://business.google.com → daftarkan nama perusahaan, alamat, telepon, jam operasional.
2. Verifikasi (biasanya via telepon/pos).
3. Hasilnya: perusahaanmu muncul di **Google Maps** dan panel kanan hasil pencarian — biasanya lebih cepat muncul daripada website.

---

## BAGIAN 5 — Perawatan SEO Rutin (agar tetap di atas)

1. **Tulis berita rutin** (2–4x/bulan) lewat panel admin: kegiatan, sertifikasi, armada baru, CSR. Google menyukai website yang aktif.
2. **Judul berita** mengandung kata kunci: "pengangkutan limbah B3 [kota]", "jasa pengelolaan limbah B3", dll.
3. **Daftarkan bisnis** ke direktori lokal: Yellow Pages Indonesia, Indonetwork, asosiasi (ASLI / APL3I bila ada).
4. **Kecepatan**: jangan upload foto lebih dari ~500KB; kompres dulu di squoosh.app.
5. **Cek performa** di PageSpeed Insights (https://pagespeed.web.dev) — target skor hijau.
6. **Backlink**: tautkan website dari profil LinkedIn/Instagram perusahaan, email signature, dan proposal.

---

## Checklist Akhir Sebelum Go-Live

- [ ] Nama perusahaan asli di `company.js`, `index.html`, footer
- [ ] Nomor WhatsApp asli
- [ ] `CONTACT_INBOX` email asli (form kontak)
- [ ] Alamat & legalitas asli (nomor izin KLHK/Kemenhub)
- [ ] Foto asli armada & fasilitas di galeri (lebih dipercaya Google & klien)
- [ ] Password admin diganti
- [ ] Domain aktif + Search Console terverifikasi + sitemap disubmit
- [ ] Google Business Profile aktif

---

## Rekomendasi Domain & Hosting (Hemat & SEO-Friendly)

### 1. Beli Domain (pilih nama yang mengandung brand)
- Kandidat bagus: `ptkjm.co.id`, `kaltarajayamakmur.co.id`, atau `ptkjm.com`.
- **.co.id** (±Rp250–300rb/tahun) — butuh dokumen NIB/SIUP (kamu sudah punya) dan paling dipercaya untuk perusahaan Indonesia.
- **.com** (±Rp150–200rb/tahun) — tanpa syarat dokumen.
- Provider affordable: **Niagahoster, Hostinger, IDwebhost, Rumahweb**. Cukup beli domain saja — TIDAK perlu beli hosting di tempat yang sama.

### 2. Hosting / Deploy — pilih salah satu
1. **Deploy via Emergent (paling mudah, direkomendasikan)**: klik tombol Deploy di dashboard Emergent — frontend + backend + database + HTTPS sudah termasuk, TIDAK perlu berlangganan hosting terpisah. Lalu sambungkan domain custom dari menu deploy.
2. **Hemat terpisah (gratis)**: frontend di Vercel (gratis), backend di Render/Railway (free tier), database MongoDB Atlas (gratis 512MB). Caranya ada di Bagian 2 Opsi B — lebih hemat tapi perlu setup manual.
3. **VPS** (Hostinger VPS / DigitalOcean / Vultr, ±Rp60–100rb/bulan): kontrol penuh tapi harus urus server sendiri — tidak disarankan tanpa admin server.

### 3. Setelah domain aktif
1. Update `SITE_URL` di backend/.env, canonical + JSON-LD di frontend/public/index.html, dan robots.txt ke domain baru.
2. Google Search Console → submit sitemap `https://domainmu/api/sitemap.xml` → minta pengindeksan.
3. Daftar Google Business Profile dengan alamat office Perumnas — paling berpengaruh agar muncul saat nama perusahaan dicari.
