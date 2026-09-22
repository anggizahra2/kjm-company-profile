import { Target, Compass, HeartHandshake } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { useLang } from "@/context/LanguageContext";

export default function Tentang() {
  const { t, data } = useLang();
  const { COMPANY, PROFIL, HERO_IMAGES } = data;

  return (
    <div data-testid="tentang-page">
      <SEO
        title={t("Tentang Kami", "About Us")}
        description={t(
          `Profil, visi, misi, dan nilai ${COMPANY.name} — perusahaan pengangkut dan pengumpul limbah B3 berizin di Tarakan, Kalimantan Utara.`,
          `Profile, vision, mission, and values of ${COMPANY.name} — a licensed B3 waste transporter and collector in Tarakan, North Kalimantan.`
        )}
        path="/tentang-kami"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Tentang Kami", "About Us")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              {t("Mengenal", "Get to Know")} <span className="text-brand-500">{COMPANY.shortName}</span> {t("Lebih Dekat", "Better")}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* PROFIL */}
      <section id="profil" className="py-24 lg:py-28 scroll-mt-24" data-testid="profil-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <Reveal>
              <SectionLabel>{t("Profil Perusahaan", "Company Profile")}</SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950 mb-8">
                {t("Melayani dengan Integritas Sejak 2015", "Serving with Integrity Since 2015")}
              </h2>
            </Reveal>
            {PROFIL.sejarah.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="text-base leading-relaxed text-slate-700 mb-5">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="relative lg:sticky lg:top-28">
              <div className="absolute -inset-4 bg-brand-100 rounded-[2rem] -rotate-2" />
              <img
                src={HERO_IMAGES.plant}
                alt={t("Fasilitas pengelolaan limbah B3 PT Kaltara Jaya Makmur", "PT Kaltara Jaya Makmur B3 waste facility")}
                className="relative rounded-[1.5rem] w-full aspect-[4/3] object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISI & MISI — numbered manifesto chapters */}
      <section id="visi-misi" className="py-24 lg:py-28 bg-white scroll-mt-24" data-testid="visi-misi-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Manifesto Kami", "Our Manifesto")}</SectionLabel>
          </Reveal>
          <div className="space-y-0">
            <Reveal>
              <div className="grid lg:grid-cols-12 gap-6 py-12 border-t border-brand-100">
                <div className="lg:col-span-3">
                  <p className="font-mono text-sm text-brand-600 tracking-wider">01</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-950 mt-2 flex items-center gap-3">
                    <Target className="w-7 h-7 text-brand-600" /> {t("Visi", "Vision")}
                  </h2>
                </div>
                <p className="lg:col-span-9 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-950 leading-snug max-w-3xl" data-testid="visi-text">
                  “{PROFIL.visi}”
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid lg:grid-cols-12 gap-6 py-12 border-t border-brand-100">
                <div className="lg:col-span-3">
                  <p className="font-mono text-sm text-brand-600 tracking-wider">02</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-950 mt-2 flex items-center gap-3">
                    <Compass className="w-7 h-7 text-brand-600" /> {t("Misi", "Mission")}
                  </h2>
                </div>
                <ol className="lg:col-span-9 space-y-5" data-testid="misi-list">
                  {PROFIL.misi.map((m, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-mono text-sm text-brand-600 pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-base leading-relaxed text-slate-700">{m}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NILAI */}
      <section id="nilai" className="py-24 lg:py-28 scroll-mt-24" data-testid="nilai-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <Reveal>
              <p className="font-mono text-sm text-brand-600 tracking-wider">03</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-950 mt-2 flex items-center gap-3">
                <HeartHandshake className="w-7 h-7 text-brand-600" /> {t("Nilai Perusahaan", "Company Values")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {t(
                  "Empat nilai yang menjadi kompas setiap keputusan operasional kami — dari pengemudi di lapangan hingga jajaran manajemen.",
                  "Four values that guide every operational decision we make — from drivers in the field to the management team."
                )}
              </p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROFIL.nilai.map((n, i) => (
              <Reveal key={n.kode} delay={i * 0.08}>
                <div className="bg-white border border-brand-100 rounded-2xl p-8 hover:border-brand-600 hover:shadow-xl hover:shadow-brand-950/5 transition-all duration-500 h-full" data-testid={`nilai-card-${i}`}>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-600">{n.kode}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-brand-950">{n.judul}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{n.deskripsi}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
