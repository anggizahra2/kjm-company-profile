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
   - Ganti semua URL preview sementara dengan domain aslimu nanti
   - Ganti data di blok `application/ld+json` (alamat, telepon, sosial media)
4. **Robots & Sitemap** — buka `frontend/public/robots.txt` dan `backend/.env` (`SITE_URL`), ganti domain dengan domain aslimu.
5. **Konten berita & galeri** — login ke `/admin/login` lalu hapus konten contoh dan tambahkan berita & foto asli perusahaan.
6. **Password admin** — ganti `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `backend/.env`, lalu restart backend. Password baru otomatis aktif.

---

## BAGIAN 2 — Jalankan & Deploy Website

### Opsi A — Deploy langsung dari platform (paling mudah)
1. Klik tombol **Deploy** di dashboard platform tempat web ini dibangun.
2. Website langsung online dengan URL permanen bawaan platform.
3. Semua fitur (CMS admin, form kontak, galeri) langsung jalan.
4. Biaya: ±50 ECU/bulan.

### Opsi B — Hosting GRATIS (Vercel + Render + MongoDB Atlas)

Biaya Rp0/bulan. Satu-satunya kekurangan: backend Render gratis "tidur" setelah 15 menit tanpa pengunjung — pengunjung pertama menunggu ±30–60 detik, setelah itu normal. (Bisa di-upgrade berbayar nanti kalau mau selalu instan.)

#### Langkah 1 — Database: MongoDB Atlas (gratis 512MB)
1. Buka mongodb.com/atlas → Sign up gratis (bisa pakai akun Google).
2. **Create Cluster** → pilih **M0 FREE** → region Singapore → Create.
3. Menu **Database Access** → Add New Database User → buat username & password (SIMPAN).
4. Menu **Network Access** → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0).
5. Menu **Database** → Connect → Drivers → salin connection string `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/` → ganti `<username>` dan `<password>` dengan milikmu.
6. Tidak perlu import data manual — website otomatis mengisi seluruh konten (14 berita, 34 foto galeri, 37 gambar) dari file `backend/seed_data.json` saat pertama kali jalan.

#### Langkah 2 — Backend: Render (gratis)
1. Buka render.com → Sign up dengan akun **GitHub** (otomatis tersambung ke repo).
2. New → **Web Service** → pilih repo `kjm-company-profile`.
3. Pengaturan:
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Instance Type: **Free**
4. Menu **Environment** → tambahkan variabel (contoh di `backend/.env.example`):
   - `MONGO_URL` = connection string Atlas (Langkah 1)
   - `DB_NAME` = `kjm313_db`
   - `JWT_SECRET` = teks acak 64 karakter (buat via `openssl rand -hex 32`)
   - `ADMIN_EMAIL` = `kaltarajayamakmur354@gmail.com`
   - `ADMIN_PASSWORD` = password admin pilihanmu
   - `FRONTEND_URL` = `https://kaltarajayamakmur.co.id`
   - `SITE_URL` = `https://kaltarajayamakmur.co.id`
   - `EMAIL_FROM_NAME` = `PT Kaltara Jaya Makmur`
   - `CONTACT_INBOX` = `kaltarajayamakmur354@gmail.com`
   - `SMTP_HOST` = `smtp.gmail.com`, `SMTP_PORT` = `465`
   - `SMTP_USER` = `kaltarajayamakmur354@gmail.com`
   - `SMTP_PASS` = App Password Gmail (cara di bawah)
5. Deploy → tunggu ±5 menit → dapat URL seperti `https://kjm-backend.onrender.com`. **CATAT URL INI.**

**Cara bikin App Password Gmail (agar form kontak terkirim ke email):**
1. Login Gmail → myaccount.google.com → **Security**.
2. Aktifkan **Verifikasi 2 Langkah** dulu (wajib).
3. Cari "App passwords" / "Sandi Aplikasi" → buat baru, nama "Website KJM" → dapat 16 huruf acak → itulah isi `SMTP_PASS`.
4. Tanpa ini website tetap jalan; pesan kontak tetap tersimpan di database, hanya email notifikasi yang tidak terkirim.

#### Langkah 3 — Frontend: Vercel (gratis)
1. Edit file `frontend/vercel.json` di GitHub (klik file → ikon pensil → Commit): ganti `GANTI-DENGAN-URL-BACKEND-RENDER` dengan URL Render dari Langkah 2 (tanpa garis miring di akhir). Ini penting agar sitemap SEO bisa diakses di `domainmu/api/sitemap.xml`.
2. Buka vercel.com → Sign up dengan akun **GitHub**.
3. Add New → Project → Import repo `kjm-company-profile`.
4. Root Directory: klik Edit → pilih `frontend`.
5. Environment Variables: `REACT_APP_BACKEND_URL` = URL Render dari Langkah 2.
6. Deploy → ±2 menit → website live di URL `*.vercel.app`.

#### Langkah 4 — Sambungkan domain kaltarajayamakmur.co.id
1. Di Vercel: Project → Settings → **Domains** → ketik `kaltarajayamakmur.co.id` → Add. Vercel akan menampilkan DNS record yang diminta.
2. Login panel registrar tempat beli domain (misal Registrindo) → Kelola DNS:
   - Record **A**: nama `@` → isi `76.76.21.21`
   - Record **CNAME**: nama `www` → isi `cname.vercel-dns.com`
   - (atau persis sesuai instruksi Vercel)
3. Tunggu 10 menit – 24 jam → domain aktif dengan HTTPS otomatis.
4. Lanjut ke **Bagian 4** (Google Search Console).

---

## BAGIAN 3 — Pasang Domain Sendiri (agar terlihat profesional)

1. Beli domain di Niagahoster / IDWebhost / Cloudflare / GoDaddy (misal `nusaenvirolestari.co.id` — domain `.co.id` butuh dokumen SIU/NIB, `.com` langsung bisa).
2. Arahkan DNS ke hostingmu:
   - Platform deploy/Vercel: tambahkan domain di dashboard, lalu buat record `CNAME` sesuai petunjuk.
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
1. **Deploy via platform bawaan (paling mudah, direkomendasikan)**: klik tombol Deploy di dashboard platform — frontend + backend + database + HTTPS sudah termasuk, TIDAK perlu berlangganan hosting terpisah. Lalu sambungkan domain custom dari menu deploy.
2. **Hemat terpisah (gratis)**: frontend di Vercel (gratis), backend di Render/Railway (free tier), database MongoDB Atlas (gratis 512MB). Caranya ada di Bagian 2 Opsi B — lebih hemat tapi perlu setup manual.
3. **VPS** (Hostinger VPS / DigitalOcean / Vultr, ±Rp60–100rb/bulan): kontrol penuh tapi harus urus server sendiri — tidak disarankan tanpa admin server.

### 3. Setelah domain aktif
1. Update `SITE_URL` di backend/.env, canonical + JSON-LD di frontend/public/index.html, dan robots.txt ke domain baru.
2. Google Search Console → submit sitemap `https://domainmu/api/sitemap.xml` → minta pengindeksan.
3. Daftar Google Business Profile dengan alamat office Perumnas — paling berpengaruh agar muncul saat nama perusahaan dicari.
