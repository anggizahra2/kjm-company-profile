import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ShieldCheck, Truck, Recycle, MapPin, Award, MessageCircle, Building2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { COMPANY, MITRA, ARMADA, WILAYAH, JENIS_LIMBAH, STATS } from "@/data/company";

const partnerInitials = (name) => {
  if (/^dan/i.test(name)) return "100+";
  const clean = name.replace(/^(PT\.?|RSUD|RSAL|RS)\s*/i, "").trim();
  const words = clean.split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : clean.slice(0, 2)).toUpperCase();
};

const EN = {
  heroBadges: ["Licensed by KLHK & Ministry of Transportation", "Insured by BUMIDA"],
  heroTitle1: "Hazardous Waste (B3)",
  heroTitle2: "Transport & Collection",
  heroTitle3: "Done Right.",
  heroSub:
    "PT Kaltara Jaya Makmur (KJM) is a licensed hazardous waste transporter and collector based in Tarakan, North Kalimantan, Indonesia — serving industrial clients across the region with GPS-tracked fleet and full documentation.",
  aboutTitle: "A Decade Serving Industry & the Environment of Kalimantan",
  about: [
    "PT Kaltara Jaya Makmur is a private company established in 2015, operating in Waste Services with a focus on hazardous waste (B3 — Bahan Berbahaya dan Beracun) management, specifically waste transportation (transporter) and collection.",
    "With continuously developed experience and commitment, we deliver professional, accountable B3 waste management services oriented toward full environmental compliance. We support every partner in achieving safe and proper waste handling while contributing to environmental preservation.",
    "For us, success is not only about service delivery, but about building trust and long-term partnerships. That is why we consistently prioritize service quality, customer satisfaction, and environmental responsibility in every operation.",
  ],
  vision: "To become a trusted hazardous waste (B3) management service company that makes a real contribution to preserving the environment and preventing B3 waste pollution.",
  mission: [
    "Deliver professional, safe, and accountable B3 waste management services in full compliance with prevailing laws and regulations.",
    "Support environmental protection and preservation through proper and sustainable B3 waste management.",
    "Prioritize customer satisfaction and needs through responsive, consistent, and quality service.",
    "Build trusted and sustainable partnerships with customers and all parties working with the company.",
  ],
  fleetNote: "7 vehicle units + 1 forklift, operated by crews trained and certified for dangerous goods transport.",
  fleetEn: {
    pickup: { cocok: "Packaged B3 waste: used batteries, used rags, infectious clinical waste, expired pharmaceuticals" },
    "truk-box": { cocok: "Drummed used oil/solvent, contaminated packaging, and high-volume packaged solid waste" },
    tangki: { cocok: "Liquid B3 waste: used lubricating oil (hydraulic, engine, gear), oil treatment sludge" },
    "bak-terbuka": { cocok: "Bulk solid waste: bottom ash, fly ash, sludge, and palletized materials" },
    forklift: { cocok: "Handling and stacking of B3 waste drums/packaging within the KJM storage facility" },
  },
  wasteEn: [
    "Used batteries / accumulators",
    "Infectious clinical waste",
    "Expired pharmaceutical products",
    "Sludge from oil treatment / storage facilities",
    "Used rags and similar materials",
    "Used lubricating oil (hydraulic, engine, gear, etc.)",
    "Bottom ash",
    "Fly ash",
    "and 100+ other categories",
  ],
  permits: [
    "KLHK Recommendation Permits (2020, 2021, 2022, 2025, 2026 series)",
    "Special Goods Transport License for B3 Waste — Ministry of Transportation",
    "B3 Waste Transportation License — Ministry of Environment",
    "B3 Waste Collection License — Environmental Agency (DLH)",
    "B3 Waste Management Operations Insurance — BUMIDA",
    "Complete corporate legality: Deed, SIUP, TDP, NPWP, NIB",
  ],
};

export default function En() {
  return (
    <div data-testid="en-page">
      <SEO
        title="Company Profile — Hazardous Waste (B3) Transport & Collection, Tarakan"
        description="PT Kaltara Jaya Makmur (KJM) — licensed hazardous waste (B3) transporter and collector based in Tarakan, North Kalimantan, Indonesia. KLHK & Ministry of Transportation licensed, BUMIDA insured."
        path="/en"
      />
      <Helmet>
        <html lang="en" />
        <link rel="alternate" hrefLang="id" href={window.location.origin + "/"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en"} />
      </Helmet>

      {/* HERO */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-brand-950 grain-overlay" data-testid="en-hero">
        <div className="absolute inset-0">
          <img src="/images/hero-armada.webp" alt="KJM hazardous waste transport fleet" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,59,62,0.92) 0%, rgba(8,28,29,0.88) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {EN.heroBadges.map((b) => (
                <span key={b} className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/40 text-brand-500 text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> {b}
                </span>
              ))}
              <Link to="/" data-testid="en-back-id" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-100/60 hover:text-brand-500 border border-white/15 hover:border-brand-500 px-4 py-1.5 rounded-full transition-colors duration-300">
                Versi Indonesia →
              </Link>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl">
              {EN.heroTitle1}<br />
              <span className="text-brand-500">{EN.heroTitle2}</span><br />
              {EN.heroTitle3}
            </h1>
            <p className="mt-7 text-base lg:text-lg leading-relaxed text-brand-100/80 max-w-2xl">{EN.heroSub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hello PT Kaltara Jaya Makmur, I would like to inquire about your hazardous waste (B3) transport / collection services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="en-cta-whatsapp"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" /> Talk to Us on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {STATS.map((s) => (
                <div key={s.label} className="bg-brand-950/80 backdrop-blur px-6 py-5">
                  <p className="font-display text-3xl font-extrabold text-brand-500">{s.value}</p>
                  <p className="text-xs text-brand-100/60 mt-1 uppercase tracking-wider font-mono">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT + VISION MISSION */}
      <section className="py-24 lg:py-28" data-testid="en-about">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <SectionLabel>About Us</SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-8">{EN.aboutTitle}</h2>
            </Reveal>
            {EN.about.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-base leading-relaxed text-slate-700 mb-5">{p}</p>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal>
              <div className="bg-white border border-brand-100 rounded-2xl p-8 mb-6">
                <p className="font-mono text-sm text-brand-600 tracking-wider mb-3">VISION</p>
                <p className="font-display text-xl font-bold text-brand-950 leading-snug">“{EN.vision}”</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-white border border-brand-100 rounded-2xl p-8">
                <p className="font-mono text-sm text-brand-600 tracking-wider mb-4">MISSION</p>
                <ol className="space-y-4">
                  {EN.mission.map((m, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-sm text-brand-600 pt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm leading-relaxed text-slate-700">{m}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 lg:py-28 bg-white" data-testid="en-services">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-12 max-w-2xl">
              Licensed B3 Waste Transport & Collection
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            <Reveal>
              <div className="bg-brand-50 rounded-2xl p-8 h-full">
                <Truck className="w-8 h-8 text-brand-600" />
                <h3 className="mt-5 font-display text-lg font-bold text-brand-950">B3 Waste Transportation</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Scheduled pickup and transport of hazardous waste using our licensed fleet — every trip documented and GPS-tracked from your site to licensed downstream facilities.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-brand-50 rounded-2xl p-8 h-full">
                <Recycle className="w-8 h-8 text-brand-600" />
                <h3 className="mt-5 font-display text-lg font-bold text-brand-950">B3 Waste Collection</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Licensed collection and temporary storage at our TPS facility in Tarakan — with accurate weighing, labeling, and transparent documentation for your reporting.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <h3 className="font-display text-lg font-bold text-brand-950 mb-6">Waste Categories We Handle</h3>
            <div className="flex flex-wrap gap-3">
              {EN.wasteEn.map((w) => (
                <span key={w} className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-950/70 text-xs font-medium px-4 py-2 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" /> {w}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLEET */}
      <section className="py-24 lg:py-28" data-testid="en-fleet">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Our Fleet</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-4 max-w-2xl">
              7 Vehicles + 1 Forklift, Ready Every Working Day
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mb-12 leading-relaxed">{EN.fleetNote}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARMADA.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <div className="bg-white border border-brand-100 rounded-2xl p-7 h-full hover:border-brand-600 transition-colors duration-300" data-testid={`en-fleet-${a.id}`}>
                  <Truck className="w-7 h-7 text-brand-600" />
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-950">{a.nama}</h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-brand-600 mt-1">{a.jumlah} — {a.kapasitas}</p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{EN.fleetEn[a.id]?.cocok || a.cocok}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE + COMPLIANCE */}
      <section className="py-24 lg:py-28 bg-brand-950 grain-overlay relative" data-testid="en-coverage">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <SectionLabel>
                <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Coverage Area</span>
              </SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
                All Across North Kalimantan
              </h2>
            </Reveal>
            <div className="space-y-3">
              {WILAYAH.map((w) => (
                <Reveal key={w.pulau}>
                  <div className="flex items-baseline justify-between gap-4 bg-brand-900/50 border border-white/10 rounded-xl px-5 py-4">
                    <p className="font-semibold text-white text-sm">{w.pulau}</p>
                    <p className="text-xs text-brand-100/50 font-mono text-right">{w.status}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <SectionLabel>
                <span className="inline-flex items-center gap-2"><Award className="w-4 h-4" /> Compliance</span>
              </SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
                Fully Licensed & Insured
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {EN.permits.map((p) => (
                <Reveal key={p}>
                  <li className="flex gap-3 text-sm text-brand-100/80 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> {p}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.15}>
              <Link to="/legalitas" data-testid="en-legalitas-link" className="mt-8 inline-flex items-center gap-2 text-brand-500 font-semibold text-sm group">
                View Full Legality Page
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 lg:py-28 bg-white" data-testid="en-partners">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Trusted By</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-12 max-w-2xl">
              100+ Industrial & Healthcare Partners
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MITRA.map((m, i) => (
              <Reveal key={m} delay={(i % 4) * 0.05}>
                <div className="flex items-center gap-3 bg-brand-50 border border-brand-100 rounded-xl px-4 py-3.5 h-full" data-testid="en-partner-item">
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

      {/* CONTACT */}
      <section className="py-24 lg:py-28" data-testid="en-contact">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-950 mb-8">
              Let’s Talk About Your B3 Waste
            </h2>
            <ul className="space-y-5 text-sm text-slate-700">
              <li className="flex gap-3"><Building2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> <span><strong>Office:</strong> {COMPANY.address}</span></li>
              <li className="flex gap-3"><Building2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> <span><strong>Warehouse & TPS:</strong> {COMPANY.warehouse}</span></li>
              <li className="flex gap-3"><MessageCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> <span><strong>WhatsApp:</strong> +62 821-3645-5038</span></li>
              <li className="flex gap-3"><ArrowUpRight className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> <span><strong>Email:</strong> {COMPANY.email}</span></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hello PT Kaltara Jaya Makmur, I would like to inquire about your hazardous waste (B3) services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="en-contact-wa"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <Link
                to="/kontak"
                data-testid="en-contact-form-link"
                className="inline-flex items-center gap-2 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                Contact Form (ID)
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid gap-5">
              <a href="https://maps.app.goo.gl/qpg2hCdtpVSw4g2e6" target="_blank" rel="noopener noreferrer" data-testid="en-map-office" className="block bg-white border border-brand-100 rounded-2xl p-6 hover:border-brand-600 transition-colors duration-300 group">
                <p className="font-display font-bold text-brand-950 flex items-center gap-2">Office — Tarakan <ArrowUpRight className="w-4 h-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></p>
                <p className="mt-2 text-sm text-slate-600">{COMPANY.address}</p>
              </a>
              <a href="https://maps.app.goo.gl/tjZ6kGbjsXjV3meY9" target="_blank" rel="noopener noreferrer" data-testid="en-map-warehouse" className="block bg-white border border-brand-100 rounded-2xl p-6 hover:border-brand-600 transition-colors duration-300 group">
                <p className="font-display font-bold text-brand-950 flex items-center gap-2">Warehouse & TPS — Tarakan <ArrowUpRight className="w-4 h-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></p>
                <p className="mt-2 text-sm text-slate-600">{COMPANY.warehouse}</p>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
