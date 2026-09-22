# PRD — Website Company Profile Pengelola & Pengangkut Limbah B3

## Problem Statement (asli)
"developkan web browser untuk company profile sebuah perusahan pengelola dan pengangkut limbah b3, yang nantinya ketika sudah dideploy bisa langsung muncul di google setelah nama perusahaannya ditulis di mesin pencarian (code mencakup SEO, dll). kasih desain yang lingkungan banget, bersih, dan modern casual. kira2 isi menunya: Beranda, Tentang Kami (Profil Perusahaan, Visi & Misi, Nilai Perusahaan), Legalitas, Armada & Layanan (Armada, Wilayah Layanan, Pengangkutan Limbah B3, Pengelolaan Limbah B3), Galeri, Berita. kemudian di footer ada info alamat, kontak sosial media, dan hubungi kami dengan whatsapp. kasih cara2 yang harus aku lakukan juga dari awal sampe jadi dan terlihat di google"

## User Personas
- Calon klien industri (HSSE/procurement) mencari transporter/pengelola limbah B3 berizin
- Auditor/tender yang memverifikasi legalitas perusahaan
- Admin perusahaan (non-teknis) yang mengelola berita & galeri

## Keputusan User
- Data perusahaan: contoh dulu (PT Kaltara Jaya Makmur), mudah diganti via `frontend/src/data/company.js`
- Konten: dengan panel admin (login, CRUD berita + galeri + upload foto)
- WhatsApp: nomor contoh dulu (6281234567890)
- Desain: biru-hijau (teal), kesan teknologi & kebersihan, modern casual
- Fitur: profil + kontak WhatsApp + formulir kontak email

## Arsitektur
- Frontend: React 19 + Tailwind + framer-motion (scroll reveal, masked hero) + lenis (smooth scroll) + react-helmet-async (SEO per halaman) + shadcn/ui + sonner
- Backend: FastAPI + MongoDB (motor) + JWT auth (httpOnly cookie, bcrypt, brute-force lockout)
- Integrasi: Emergent managed Resend (form kontak → email), Emergent object storage (upload foto admin)
- SEO: meta lengkap + OG/Twitter + JSON-LD Organization & WebSite, robots.txt, sitemap dinamis `/api/sitemap.xml` (termasuk slug berita)

## Selesai (22 September 2026, sesi 3)
- Deskripsi armada: plat nomor dihapus, diganti kalimat selling-point
- Halaman English /en: profil lengkap (about, visi-misi, layanan, armada tanpa plat, coverage, compliance, mitra, kontak + link maps), tombol EN di header desktop+mobile, hreflang id/en
- Git history dirapikan jadi 1 commit bersih atas nama anggizahra2 (riwayat lama berisi password dibuang), lalu push ke https://github.com/anggizahra2/kjm-company-profile (branch main) via PAT user; token tidak disimpan di git config

## Selesai (22 September 2026, sesi 2) — Masukan user
- Hero beranda diganti foto armada asli KJM (truk box hitam-kuning, /images/hero-armada.webp 152KB)
- Halaman Kontak: embed Google Maps office Perumnas & warehouse Amal Baru + tombol buka di Maps (link share asli)
- Password admin CMS diganti: anz0903 (login teruji)
- Marquee mitra dihapus → grid statis dengan monogram inisial per mitra (logo resmi mitra tidak diambil sembarangan demi hak cipta)
- Foto galeri & berita: tidak lagi ter-crop (masonry/rasio asli), tetap WebP ringan
- Brand: KJM (bukan KJM313) di Tentang & title; KJM313 tetap di keywords SEO
- Tentang: intro Nilai Perusahaan jadi paragraf biasa (tidak kolom sempit memanjang)
- Berita dipecah jadi 14 artikel bertanggal 2024–2026 (caption berfoto banyak jadi 2–3 pemberitaan); tanggal galeri ikut disebar
- Foto "Gerbang TPS" dirotasi tegak (kiri 90°)
- PANDUAN_DEPLOY_SEO.md ditambah rekomendasi domain (.co.id/.com, Niagahoster/Hostinger/IDwebhost) & hosting (Emergent Deploy / Vercel+Render+Atlas / VPS)

## Selesai (22 September 2026) — Rombak konten sesuai KJM WEBB.docx
- Konten dikoreksi/ditambah dari dokumen: alamat office Jl. Perumnas RT.02 No.56 & warehouse Jl. Amal Baru RT.05, jam Senin–Sabtu 08.30–16.30 WITA, telp (0551) 31500, email kaltarajayamakmur354@gmail.com (juga jadi ADMIN_EMAIL baru), Instagram @ptkjm313 aktif di footer, asuransi BUMIDA (bukan Jasindo), statistik 1,5K ton/tahun, visi-misi-profil persis dari dokumen
- Legalitas: +2 izin rekomendasi KLHK baru (S.489/2025, B.115/2026); total 16 dokumen
- Jenis limbah sesuai izin rekomendasi MENLHK; wilayah layanan 5 kabupaten/kota Kaltara; armada asli 7 unit + 1 forklift dengan plat nomor
- Seksi baru di Beranda: marquee "Dipercaya Oleh" berisi 24 mitra asli (RS, PT Kayan LNG, dll)
- Galeri: 34 foto asli (dari 127 foto dokumen, dikelompokkan per caption) — dioptimasi WebP max 1600px q82 (~100KB/foto, total 3,5MB), rotasi EXIF diperbaiki
- Berita: 7 artikel asli 2–3 paragraf (pelatihan SDM, oli Kayan, medis Malinau, kunjungan DLH, CSR bansos, study banding PRIA, APAR)
- Ikon daun di marquee diganti logo KJM
- Repo git siap push ke GitHub anggizahra2: .gitignore (tanpa .env & kredensial), README run lokal VS Code, backend/.env.example, frontend/.env.example

## Selesai (11 September 2026)
- Halaman: Beranda (hero kinetik + parallax, marquee, statistik, preview semua seksi, CTA), Tentang Kami (profil, visi-misi, nilai — numbered chapters + anchor), Legalitas (grup Legalitas Perusahaan + Dokumen Teknis + CTA WA), Armada & Layanan (tabs armada, wilayah, alur pengangkutan, pengelolaan — anchor), Galeri (filter kategori), Berita (cari + filter + detail per slug), Kontak (form → email + kartu info)
- Admin CMS: /admin/login, /admin (CRUD berita, CRUD galeri, upload foto ke object storage)
- Footer: alamat, sosial media, WhatsApp; tombol WA mengambang di semua halaman publik
- Panduan lengkap: /app/PANDUAN_DEPLOY_SEO.md (ganti data, deploy, domain, Google Search Console, Business Profile, perawatan SEO)
- Kredensial: /app/memory/test_credentials.md

## Terverifikasi
- curl: health, login/me, list news/gallery, create+delete news admin, contact form, sitemap.xml
- screenshot: hero, seksi tengah, admin login → dashboard → tab galeri

## Belum / Pending (butuh aksi user)
- Ganti data contoh: company.js, CONTACT_INBOX & EMAIL_REPLY_TO di backend/.env (email asli!), nomor WA asli, domain di index.html/robots.txt/SITE_URL
- Email form kontak terkirim via relay managed (belum diverifikasi ke inbox asli karena email tujuan masih placeholder)
- Deploy produksi + domain + Google Search Console (langkah di panduan)

## Backlog Prioritas
- P0: Ganti data asli & email tujuan form kontak; deploy + domain; Search Console
- P1: Widget lacak manifest Festronik (saat ini belum ada — perlu integrasi); halaman berita pagination bila >30 artikel
- P2: Peta interaktif wilayah layanan; dark mode toggle; blog kategori terpisah; bahasa Inggris (EN/ID)
