import { useEffect, useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { api, imgUrl } from "@/lib/api";

const FILTERS = ["Semua", "Armada", "Fasilitas", "Operasional", "CSR & Safety"];

export default function Galeri() {
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

  const filtered = useMemo(
    () => (filter === "Semua" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  return (
    <div data-testid="galeri-page">
      <SEO
        title="Galeri"
        description="Dokumentasi armada, fasilitas penyimpanan limbah B3, dan kegiatan operasional PT Nusa Enviro Lestari."
        path="/galeri"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Galeri</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              Armada & Fasilitas <span className="text-brand-500">Dalam Bingkai</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-12" data-testid="gallery-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`gallery-filter-${f.toLowerCase().replace(/[^a-z]/g, "-")}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20"
                    : "bg-white text-brand-950/60 border border-brand-100 hover:border-brand-600 hover:text-brand-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-slate-500" data-testid="gallery-loading">Memuat galeri…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500" data-testid="gallery-empty">Belum ada foto pada kategori ini.</p>
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
