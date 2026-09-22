import { MapPin, Truck, Recycle, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ArmadaTabs } from "@/components/ArmadaTabs";
import { useLang } from "@/context/LanguageContext";

export default function Layanan() {
  const { t, data } = useLang();
  const { WILAYAH, JENIS_LIMBAH, ALUR_PENGANGKUTAN, PENGELOLAAN, HERO_IMAGES } = data;

  return (
    <div data-testid="layanan-page">
      <SEO
        title={t("Armada & Layanan", "Fleet & Services")}
        description={t(
          "Armada pengangkut limbah B3 berizin Kemenhub, wilayah layanan seluruh Kalimantan Utara, serta layanan pengangkutan dan pengumpulan limbah B3 terpadu.",
          "Ministry-licensed B3 waste transport fleet, coverage across North Kalimantan, and integrated B3 waste transport and collection services."
        )}
        path="/layanan"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Armada & Layanan", "Fleet & Services")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              {t("Armada Siap Jalan,", "Fleet Ready to Roll,")} <span className="text-brand-500">{t("Layanan Tanpa Batas", "Service Without Limits")}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ARMADA */}
      <section id="armada" className="py-24 lg:py-28 scroll-mt-24" data-testid="armada-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>
              <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" /> {t("Armada", "Fleet")}</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-12 max-w-2xl">
              {t("7 Unit Armada + 1 Forklift, Siap Setiap Hari Kerja", "7 Fleet Units + 1 Forklift, Ready Every Working Day")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ArmadaTabs />
          </Reveal>
        </div>
      </section>

      {/* WILAYAH */}
      <section id="wilayah" className="py-24 lg:py-28 bg-white scroll-mt-24" data-testid="wilayah-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> {t("Wilayah Layanan", "Coverage Area")}</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-4 max-w-2xl">
              {t("Melayani Seluruh Wilayah Kalimantan Utara", "Serving All of North Kalimantan")}
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mb-12 leading-relaxed">
              {t(
                "Proses pengangkutan limbah B3 oleh PT Kaltara Jaya Makmur dilaksanakan di seluruh wilayah Provinsi Kalimantan Utara — dari hub office & TPS kami di Kota Tarakan.",
                "B3 waste transport by PT Kaltara Jaya Makmur is carried out across the entire North Kalimantan Province — from our office & TPS hub in Tarakan City."
              )}
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {WILAYAH.map((w, i) => (
              <Reveal key={w.pulau} delay={i * 0.08}>
                <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 h-full hover:border-brand-600 transition-colors duration-300" data-testid={`wilayah-card-${i}`}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-display text-xl font-bold text-brand-950">{w.pulau}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-brand-900 text-brand-500 px-3 py-1 rounded-full shrink-0">{w.status}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.kota}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PENGANGKUTAN */}
      <section id="pengangkutan" className="py-24 lg:py-28 bg-brand-950 grain-overlay relative scroll-mt-24" data-testid="pengangkutan-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>
              <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" /> {t("Pengangkutan Limbah B3", "B3 Waste Transport")}</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 max-w-2xl">
              {t("Lima Langkah, Nol Kebocoran, Seratus Persen Terdokumentasi", "Five Steps, Zero Leaks, One Hundred Percent Documented")}
            </h2>
            <p className="text-base text-brand-100/70 max-w-2xl mb-14 leading-relaxed">
              {t(
                "Setiap pengangkutan mengikuti prosedur baku yang diaudit — dari identifikasi karakteristik limbah hingga pelaporan akhir.",
                "Every transport follows audited standard procedures — from waste characteristic identification to final reporting."
              )}
            </p>
          </Reveal>
          <div className="space-y-0">
            {ALUR_PENGANGKUTAN.map((s, i) => (
              <Reveal key={s.langkah} delay={i * 0.06}>
                <div className="grid lg:grid-cols-12 gap-4 py-8 border-t border-white/10 items-baseline" data-testid={`alur-step-${i}`}>
                  <p className="lg:col-span-2 font-mono text-brand-500 text-sm tracking-wider">{s.langkah}</p>
                  <h3 className="lg:col-span-4 font-display text-xl font-bold text-white">{s.judul}</h3>
                  <p className="lg:col-span-6 text-sm text-brand-100/70 leading-relaxed">{s.deskripsi}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14">
              <h3 className="font-display text-lg font-bold text-white mb-6">{t("Jenis Limbah B3 yang Kami Angkut", "B3 Waste Categories We Handle")}</h3>
              <div className="flex flex-wrap gap-3">
                {JENIS_LIMBAH.map((j) => (
                  <span key={j} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-brand-100/80 text-xs font-medium px-4 py-2 rounded-full" data-testid="limbah-chip">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" /> {j}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PENGELOLAAN */}
      <section id="pengelolaan" className="py-24 lg:py-28 scroll-mt-24" data-testid="pengelolaan-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <Reveal>
              <SectionLabel>
                <span className="inline-flex items-center gap-2"><Recycle className="w-4 h-4" /> {t("Pengelolaan Limbah B3", "B3 Waste Management")}</span>
              </SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-10">
                {t("Dari Pengumpulan Hingga Penyimpanan yang Aman", "From Collection to Safe Storage")}
              </h2>
            </Reveal>
            <div className="space-y-5">
              {PENGELOLAAN.map((p, i) => (
                <Reveal key={p.judul} delay={i * 0.08}>
                  <div className="bg-white border border-brand-100 rounded-2xl p-6 hover:border-brand-600 transition-colors duration-300" data-testid={`pengelolaan-card-${i}`}>
                    <p className="font-mono text-xs text-brand-600 tracking-wider">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-brand-950">{p.judul}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.deskripsi}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2}>
            <div className="relative lg:sticky lg:top-28">
              <div className="absolute -inset-4 bg-brand-100 rounded-[2rem] rotate-2" />
              <img
                src={HERO_IMAGES.lab}
                alt={t("Operasional pengelolaan limbah B3", "B3 waste management operations")}
                className="relative rounded-[1.5rem] w-full aspect-[4/5] object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
