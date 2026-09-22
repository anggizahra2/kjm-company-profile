import { MapPin, Truck, Recycle, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ArmadaTabs } from "@/components/ArmadaTabs";
import { WILAYAH, JENIS_LIMBAH, ALUR_PENGANGKUTAN, PENGELOLAAN, HERO_IMAGES } from "@/data/company";

export default function Layanan() {
  return (
    <div data-testid="layanan-page">
      <SEO
        title="Armada & Layanan"
        description="Armada pengangkut limbah B3 berizin Kemenhub (wingbox, tangki, arm roll, ISO tank), wilayah layanan Jawa-Sumatra-Kalimantan-Sulawesi, serta layanan pengangkutan dan pengelolaan limbah B3 terpadu."
        path="/layanan"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Armada & Layanan</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              Armada Siap Jalan, <span className="text-brand-500">Layanan Tanpa Batas</span>
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
              <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" /> Armada</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-12 max-w-2xl">
              7 Unit Armada + 1 Forklift, Siap Setiap Hari Kerja
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
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Wilayah Layanan</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-4 max-w-2xl">
              Melayani Seluruh Wilayah Kalimantan Utara
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mb-12 leading-relaxed">
              Proses pengangkutan limbah B3 oleh PT Kaltara Jaya Makmur dilaksanakan di seluruh wilayah Provinsi
              Kalimantan Utara — dari hub office & TPS kami di Kota Tarakan.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {WILAYAH.map((w, i) => (
              <Reveal key={w.pulau} delay={i * 0.08}>
                <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 h-full hover:border-brand-600 transition-colors duration-300" data-testid={`wilayah-card-${i}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-bold text-brand-950">{w.pulau}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-brand-900 text-brand-500 px-3 py-1 rounded-full">{w.status}</span>
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
              <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" /> Pengangkutan Limbah B3</span>
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 max-w-2xl">
              Lima Langkah, Nol Kebocoran, Seratus Persen Terdokumentasi
            </h2>
            <p className="text-base text-brand-100/70 max-w-2xl mb-14 leading-relaxed">
              Setiap pengangkutan mengikuti prosedur baku yang diaudit — dari identifikasi karakteristik limbah
              hingga pelaporan akhir manifest Festronik.
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
              <h3 className="font-display text-lg font-bold text-white mb-6">Jenis Limbah B3 yang Kami Angkut</h3>
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
                <span className="inline-flex items-center gap-2"><Recycle className="w-4 h-4" /> Pengelolaan Limbah B3</span>
              </SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-10">
                Dari Penyimpanan Hingga Pengolahan Akhir
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
                alt="Laboratorium uji karakteristik limbah B3"
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
