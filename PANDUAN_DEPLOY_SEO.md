# Panduan Lengkap: Dari Kode Sampai Muncul di Google

Panduan ini untuk website company profile **PT Kaltara Jaya Makmur (PT KJM)**.

---

## BAGIAN 1 — Ganti Data Contoh dengan Data Asli Perusahaan

1. **Data perusahaan utama** — buka file `frontend/src/data/company.js`
2. **Email tujuan form kontak** — buka `backend/.env`, ganti `CONTACT_INBOX` dan `EMAIL_REPLY_TO` dengan email asli perusahaan (misal `info@perusahaanmu.co.id`). Tanpa ini, pesan dari form kontak tidak sampai ke kamu.
3. **SEO dasar** — buka `frontend/public/index.html`:
4. **Robots & Sitemap** — buka `frontend/public/robots.txt` dan `backend/.env` (`SITE_URL`), ganti domain dengan domain aslimu.
5. **Konten berita & galeri** — login ke `/admin/login` 
6. **Password admin** — ganti `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `backend/.env`, lalu restart backend. Password baru otomatis aktif.

---

## BAGIAN 2 — Jalankan & Deploy Website

Hosting GRATIS (Vercel + Render + MongoDB Atlas)

Biaya Rp0/bulan. Satu-satunya kekurangan: backend Render gratis "tidur" setelah 15 menit tanpa pengunjung — pengunjung pertama menunggu ±30–60 detik, setelah itu normal. (Jadi saya pake UpTimeRobot juga.) 

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
5. Deploy → tunggu ±5 menit → dapat URL

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

