import { FileBadge, ShieldCheck, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { useLang } from "@/context/LanguageContext";

export default function Legalitas() {
  const { lang, t, data } = useLang();
  const { COMPANY, LEGALITAS_PERUSAHAAN, LEGALITAS_TEKNIS } = data;

  const waMsg =
    lang === "en"
      ? `Hello, I would like to request certified copies of ${COMPANY.name}'s legal documents.`
      : `Halo, saya ingin meminta salinan dokumen legalitas ${COMPANY.name}.`;

  const groups = [
    { label: t("Legalitas Perusahaan", "Corporate Legality"), items: LEGALITAS_PERUSAHAAN, testid: "legalitas-perusahaan" },
    { label: t("Dokumen Teknis Operasional", "Operational Technical Documents"), items: LEGALITAS_TEKNIS, testid: "legalitas-teknis" },
  ];

  return (
    <div data-testid="legalitas-page">
      <SEO
        title={t("Legalitas & Perizinan", "Legality & Permits")}
        description={t(
          `Dokumen legalitas ${COMPANY.name}: izin rekomendasi KLHK, izin angkutan barang khusus Kemenhub, izin pengumpulan DLH, dan asuransi BUMIDA.`,
          `Legal documents of ${COMPANY.name}: KLHK recommendation permits, Ministry of Transportation special goods license, DLH collection license, and BUMIDA insurance.`
        )}
        path="/legalitas"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Legalitas", "Legality")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              {t("Berizin Lengkap.", "Fully Licensed.")} <span className="text-brand-500">{t("Transparan.", "Transparent.")}</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-brand-100/70 max-w-2xl leading-relaxed">
              {t(
                "Seluruh aktivitas pengangkutan dan pengelolaan limbah B3 kami didukung perizinan resmi yang dapat Anda verifikasi. Salinan dokumen tersedia atas permintaan melalui proses NDA.",
                "All of our B3 waste transport and management activities are backed by official permits that you can verify. Certified document copies are available on request through an NDA process."
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {groups.map((group) => (
            <div key={group.testid} className="mb-12" data-testid={group.testid}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-950 mb-6">{group.label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item, i) => (
                  <Reveal key={item.nomor} delay={i * 0.07}>
                    <div
                      className="group bg-white border border-brand-100 rounded-2xl p-7 h-full hover:border-brand-600 hover:shadow-xl hover:shadow-brand-950/5 transition-all duration-500"
                      data-testid={`legalitas-card-${i}`}
                    >
                      <div className="flex items-start justify-between">
                        <FileBadge className="w-8 h-8 text-brand-600" />
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-brand-100 text-brand-900 px-3 py-1 rounded-full">
                          {item.berlaku}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold text-brand-950 leading-snug">{item.nama}</h3>
                      <p className="mt-3 text-xs font-mono text-slate-500 break-all">{item.nomor}</p>
                      <p className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" /> {item.penerbit}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-14 bg-brand-950 grain-overlay relative rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{t("Butuh Salinan Dokumen Legalitas?", "Need Certified Copies of Our Permits?")}</h2>
                <p className="mt-3 text-sm text-brand-100/70 max-w-lg leading-relaxed">
                  {t(
                    "Untuk kebutuhan tender, audit, atau due diligence, tim kami siap menyiapkan salinan dokumen legalitas yang dilegalisir.",
                    "For tenders, audits, or due diligence, our team is ready to prepare certified copies of our legal documents."
                  )}
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="legalitas-wa-cta"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300 shrink-0"
              >
                <MessageCircle className="w-4 h-4" /> {t("Minta via WhatsApp", "Request via WhatsApp")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
