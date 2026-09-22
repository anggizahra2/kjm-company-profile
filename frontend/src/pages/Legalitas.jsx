import { FileBadge, ShieldCheck, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { COMPANY, LEGALITAS_PERUSAHAAN, LEGALITAS_TEKNIS } from "@/data/company";

export default function Legalitas() {
  return (
    <div data-testid="legalitas-page">
      <SEO
        title="Legalitas & Perizinan"
        description={`Dokumen legalitas ${COMPANY.name}: izin penyimpanan & pengumpulan limbah B3 dari KLHK, izin angkutan barang berbahaya Kemenhub, ISO 14001 & ISO 45001.`}
        path="/legalitas"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Legalitas</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              Berizin Lengkap. <span className="text-brand-500">Transparan.</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-brand-100/70 max-w-2xl leading-relaxed">
              Seluruh aktivitas pengangkutan dan pengelolaan limbah B3 kami didukung perizinan resmi yang dapat
              Anda verifikasi. Salinan dokumen tersedia atas permintaan melalui proses NDA.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {[
            { label: "Legalitas Perusahaan", items: LEGALITAS_PERUSAHAAN, testid: "legalitas-perusahaan" },
            { label: "Dokumen Teknis Operasional", items: LEGALITAS_TEKNIS, testid: "legalitas-teknis" },
          ].map((group) => (
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
                  <h2 className="mt-5 font-display text-lg font-bold text-brand-950 leading-snug">{item.nama}</h2>
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
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Butuh Salinan Dokumen Legalitas?</h2>
                <p className="mt-3 text-sm text-brand-100/70 max-w-lg leading-relaxed">
                  Untuk kebutuhan tender, audit, atau due diligence, tim kami siap menyiapkan salinan dokumen
                  legalitas yang dilegalisir.
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Halo, saya ingin meminta salinan dokumen legalitas " + COMPANY.name + ".")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="legalitas-wa-cta"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-3.5 rounded-full transition-colors duration-300 shrink-0"
              >
                <MessageCircle className="w-4 h-4" /> Minta via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
