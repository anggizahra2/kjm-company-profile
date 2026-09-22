import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Recycle, Truck, FlaskConical, FileBadge, Award } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ArmadaTabs } from "@/components/ArmadaTabs";
import { api, imgUrl } from "@/lib/api";
import { COMPANY, STATS, HERO_IMAGES, LEGALITAS_TEKNIS, MITRA } from "@/data/company";

const partnerInitials = (name) => {
  if (/^dan/i.test(name)) return "100+";
  const clean = name.replace(/^(PT\.?|RSUD|RSAL|RS)\s*/i, "").trim();
  const words = clean.split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : clean.slice(0, 2)).toUpperCase();
};

const MaskedLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1 -mb-1">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const LAYANAN_CARDS = [
  {
    icon: Truck,
    judul: "Pengangkutan Limbah B3",
    deskripsi: "Armada berizin Kemenhub dengan GPS real-time dan manifest Festronik untuk setiap perjalanan.",
    to: "/layanan#pengangkutan",
    id: "layanan-card-pengangkutan",
  },
  {
    icon: Recycle,
    judul: "Pengelolaan Limbah B3",
    deskripsi: "Penyimpanan, pengumpulan, pemanfaatan, hingga pengolahan akhir di fasilitas berizin KLHK.",
    to: "/layanan#pengelolaan",
    id: "layanan-card-pengelolaan",
  },
  {
    icon: FlaskConical,
    judul: "Uji Karakteristik Limbah",
    deskripsi: "Identifikasi dan klasifikasi limbah B3 Anda sesuai PP 22/2021 oleh tim berpengalaman.",
    to: "/layanan#pengelolaan",
    id: "layanan-card-uji",
  },
  {
    icon: ShieldCheck,
    judul: "Konsultasi Kepatuhan",
    deskripsi: "Pendampingan dokumen lingkungan, pelaporan SIMPEL, dan audit kepatuhan internal.",
    to: "/kontak",
    id: "layanan-card-konsultasi",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    api.get("/news").then(({ data }) => setNews(data.slice(0, 3))).catch(() => {});
    api.get("/gallery").then(({ data }) => setGallery(data.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      <SEO path="/" />

      {/* ============ KINETIC HERO ============ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-950 grain-overlay" data-testid="hero-section">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={HERO_IMAGES.main}
            alt="Armada pengangkut limbah B3 PT Nusa Enviro Lestari"
            className="w-full h-[120%] object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,59,62,0.92) 0%, rgba(8,28,29,0.85) 100%)" }} />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/40 text-brand-500 text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full" data-testid="hero-badge-izin">
              <ShieldCheck className="w-3.5 h-3.5" /> Berizin KLHK & Kemenhub
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-100/80 text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full" data-testid="hero-badge-iso">
              <Award className="w-3.5 h-3.5" /> Berasuransi BUMIDA
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl" data-testid="hero-headline">
            <MaskedLine delay={0.2}>Limbah B3 Terkelola,</MaskedLine>
            <MaskedLine delay={0.35}><span className="text-brand-500">Lingkungan Terjaga,</span></MaskedLine>
            <MaskedLine delay={0.5}>Masa Depan Berkelanjutan.</MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-7 text-base lg:text-lg leading-relaxed text-brand-100/80 max-w-2xl"
            data-testid="hero-subtext"
          >
            {COMPANY.name} adalah perusahaan pengangkut dan pengumpul limbah B3 berizin resmi — melayani pengangkutan
            dan pengumpulan limbah berbahaya dari hub kami di Tarakan dengan armada terpantau GPS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/kontak"
              data-testid="hero-cta-konsultasi"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
            >
              Konsultasi Gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/layanan"
              data-testid="hero-cta-layanan"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-brand-500 hover:text-brand-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
            >
              Jelajahi Layanan <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
            data-testid="hero-stats"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-brand-950/80 backdrop-blur px-6 py-5">
                <p className="font-display text-3xl font-extrabold text-brand-500">{s.value}</p>
                <p className="text-xs text-brand-100/60 mt-1 uppercase tracking-wider font-mono">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* ============ TENTANG PREVIEW ============ */}
      <section className="py-24 lg:py-32" data-testid="home-about">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-100 rounded-[2rem] rotate-2" />
              <img
                src={HERO_IMAGES.facility}
                alt="Fasilitas penyimpanan limbah B3 berizin KLHK"
                className="relative rounded-[1.5rem] w-full aspect-[4/3] object-cover shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-4 lg:-right-6 bg-brand-950 text-white rounded-2xl px-6 py-4 shadow-2xl">
                <p className="font-display text-2xl font-extrabold text-brand-500">2015</p>
                <p className="text-xs text-brand-100/60 font-mono uppercase tracking-wider">Berdiri Sejak</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel>Tentang Kami</SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950">
                Satu Dekade Menjaga Industri & Lingkungan Kalimantan
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Berdiri di Tarakan, Kalimantan Utara sejak 2015, {COMPANY.name} melayani pengangkutan dan
                pengumpulan limbah B3 bagi industri di Kalimantan dan sekitarnya — didukung izin KLHK, Kemenhub,
                DLH, serta perlindungan asuransi BUMIDA untuk setiap pekerjaan.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["Izin KLHK & Kemenhub", "Armada GPS Real-Time", "Asuransi BUMIDA", "Zero-Leak Guarantee"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-brand-950">
                    <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <Link
                to="/tentang-kami"
                data-testid="about-readmore"
                className="mt-9 inline-flex items-center gap-2 text-brand-600 font-semibold text-sm group"
              >
                Kenali Kami Lebih Dekat
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MITRA ============ */}
      <section className="py-20 lg:py-24 bg-white border-y border-brand-100" data-testid="home-partners">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Dipercaya Oleh</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 max-w-2xl mb-12">
              100+ Mitra Industri & Fasilitas Kesehatan
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="partners-grid">
            {MITRA.map((m, i) => (
              <Reveal key={m} delay={(i % 4) * 0.05}>
                <div className="flex items-center gap-3 bg-brand-50 border border-brand-100 rounded-xl px-4 py-3.5 h-full hover:border-brand-600 transition-colors duration-300" data-testid="partner-item">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-brand-900 text-brand-500 font-display font-bold text-xs flex items-center justify-center">
                    {partnerInitials(m)}
                  </span>
                  <span className="text-sm font-medium text-brand-950 leading-snug">{m}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LAYANAN ============ */}
      <section className="py-24 lg:py-28 bg-white" data-testid="home-services">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Layanan Kami</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 max-w-xl">
                Solusi Limbah B3 Menyeluruh, Dari Penjemputan Hingga Pelaporan
              </h2>
              <Link to="/layanan" data-testid="services-viewall" className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm group shrink-0">
                Lihat Semua Layanan
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LAYANAN_CARDS.map((card, i) => (
              <Reveal key={card.id} delay={i * 0.1}>
                <Link
                  to={card.to}
                  data-testid={card.id}
                  className="group block bg-brand-50 hover:bg-brand-950 rounded-2xl p-7 h-full transition-colors duration-500"
                >
                  <card.icon className="w-8 h-8 text-brand-600 group-hover:text-brand-500 transition-colors duration-500" />
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-950 group-hover:text-white transition-colors duration-500">
                    {card.judul}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 group-hover:text-brand-100/70 transition-colors duration-500">
                    {card.deskripsi}
                  </p>
                  <ArrowUpRight className="mt-5 w-5 h-5 text-brand-600 group-hover:text-brand-500 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARMADA ============ */}
      <section className="py-24 lg:py-28" data-testid="home-fleet">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Armada Kami</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-12 max-w-xl">
              Armada Khusus Limbah B3, Terpantau Setiap Kilometer
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ArmadaTabs />
          </Reveal>
        </div>
      </section>

      {/* ============ LEGALITAS STRIP ============ */}
      <section className="py-24 lg:py-28 bg-brand-950 grain-overlay relative" data-testid="home-legalitas">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Legalitas</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-xl">
                Berizin Lengkap. Teraudit. Terpercaya.
              </h2>
              <Link to="/legalitas" data-testid="legalitas-viewall" className="inline-flex items-center gap-2 text-brand-500 font-semibold text-sm group shrink-0">
                Lihat Semua Perizinan
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEGALITAS_TEKNIS.slice(0, 3).map((item, i) => (
              <Reveal key={item.nomor} delay={i * 0.1}>
                <div className="bg-brand-900/50 border border-white/10 rounded-2xl p-7 hover:border-brand-500/50 transition-colors duration-300 h-full">
                  <FileBadge className="w-7 h-7 text-brand-500" />
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{item.nama}</h3>
                  <p className="mt-2 text-xs font-mono text-brand-100/50 break-all">{item.nomor}</p>
                  <p className="mt-3 text-sm text-brand-100/70">{item.penerbit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALERI PREVIEW ============ */}
      <section className="py-24 lg:py-28 bg-white" data-testid="home-gallery">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Galeri</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 max-w-xl">
                Operasional Kami, Dalam Bingkai
              </h2>
              <Link to="/galeri" data-testid="gallery-viewall" className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm group shrink-0">
                Lihat Galeri Lengkap
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
          <div className="columns-2 lg:columns-3 gap-4">
            {gallery.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.07} className="break-inside-avoid mb-4">
                <div className="group relative rounded-2xl overflow-hidden bg-brand-100">
                  <img
                    src={imgUrl(item.image)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BERITA PREVIEW ============ */}
      <section className="py-24 lg:py-28" data-testid="home-news">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Berita & Kegiatan</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 max-w-xl">
                Kabar Terbaru dari Lapangan
              </h2>
              <Link to="/berita" data-testid="news-viewall" className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm group shrink-0">
                Baca Semua Berita
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <Link to={`/berita/${item.slug}`} data-testid={`news-card-${item.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-brand-100 hover:shadow-xl hover:shadow-brand-950/10 transition-shadow duration-500 h-full">
                  <div className="overflow-hidden bg-brand-100">
                    <img src={imgUrl(item.image)} alt={item.title} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-brand-600">{item.category}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-brand-950 leading-snug group-hover:text-brand-600 transition-colors duration-300">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 lg:py-28 bg-brand-950 grain-overlay relative overflow-hidden" data-testid="home-cta">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-left lg:text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-3xl lg:mx-auto">
              Limbah B3 Perusahaan Anda, Tanggung Jawab Kami.
            </h2>
            <p className="mt-5 text-base text-brand-100/70 max-w-xl lg:mx-auto">
              Konsultasikan kebutuhan pengangkutan dan pengelolaan limbah B3 Anda hari ini — gratis, tanpa komitmen.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap lg:justify-center gap-4">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                Chat WhatsApp Sekarang
              </a>
              <Link
                to="/kontak"
                data-testid="cta-contact-form"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-brand-500 hover:text-brand-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                Kirim Pesan via Formulir
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
