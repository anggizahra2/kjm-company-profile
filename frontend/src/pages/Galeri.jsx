import { useEffect, useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { api, imgUrl } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

export default function Galeri() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/gallery")
      .then(({ data }) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filters = [t("Semua", "All"), "Armada", "Fasilitas", "Operasional", "CSR & Safety"];
  const allLabel = t("Semua", "All");

  const filtered = useMemo(
    () => (filter === allLabel || filter === "Semua" ? items : items.filter((i) => i.category === filter)),
    [items, filter, allLabel]
  );

  return (
    <div data-testid="galeri-page">
      <SEO
        title={t("Galeri", "Gallery")}
        description={t(
          "Dokumentasi armada, fasilitas TPS limbah B3, dan kegiatan operasional PT Kaltara Jaya Makmur.",
          "Documentation of the fleet, B3 waste TPS facilities, and operations of PT Kaltara Jaya Makmur."
        )}
        path="/galeri"
      />

      <PageHero
        label={t("Galeri", "Gallery")}
        title={<>{t("Armada & Fasilitas", "Fleet & Facilities")} <span className="text-brand-500">{t("Dalam Bingkai", "Framed")}</span></>}
        image="/images/page-galeri.webp"
        testid="hero-galeri"
      />

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-12" data-testid="gallery-filters">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`gallery-filter-${f.toLowerCase().replace(/[^a-z]/g, "-")}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  (filter === f || (f === allLabel && filter === "Semua"))
                    ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20"
                    : "bg-white text-brand-950/60 border border-brand-100 hover:border-brand-600 hover:text-brand-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-slate-500" data-testid="gallery-loading">{t("Memuat galeri…", "Loading gallery…")}</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500" data-testid="gallery-empty">{t("Belum ada foto pada kategori ini.", "No photos in this category yet.")}</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5" data-testid="gallery-grid">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.07} className="break-inside-avoid mb-5">
                  <div className="group relative rounded-2xl overflow-hidden bg-brand-100" data-testid={`gallery-item-${item.id}`}>
                    <img
                      src={imgUrl(item.image)}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-brand-500">{item.category}</p>
                        <p className="text-white text-sm font-semibold mt-1">{item.title}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
