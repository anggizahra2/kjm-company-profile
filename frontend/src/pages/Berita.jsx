import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { api, imgUrl } from "@/lib/api";

export default function Berita() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/news")
      .then(({ data }) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ["Semua", ...new Set(items.map((i) => i.category))], [items]);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchCat = category === "Semua" || i.category === category;
        const q = query.toLowerCase();
        const matchQ = !q || i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q);
        return matchCat && matchQ;
      }),
    [items, query, category]
  );

  return (
    <div data-testid="berita-page">
      <SEO
        title="Berita"
        description="Berita, kegiatan, dan perkembangan terbaru PT Nusa Enviro Lestari — pengelola dan pengangkut limbah B3 berizin KLHK."
        path="/berita"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>Berita</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              Kabar & Kegiatan <span className="text-brand-500">Terbaru</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berita…"
                data-testid="news-search-input"
                className="w-full bg-white border border-brand-100 rounded-full pl-11 pr-5 py-3 text-sm outline-none focus:border-brand-600 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2" data-testid="news-categories">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  data-testid={`news-category-${c.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    category === c
                      ? "bg-brand-900 text-white"
                      : "bg-white text-brand-950/60 border border-brand-100 hover:border-brand-600 hover:text-brand-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500" data-testid="news-loading">Memuat berita…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500" data-testid="news-empty">Tidak ada berita yang cocok.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="news-grid">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.08}>
                  <Link
                    to={`/berita/${item.slug}`}
                    data-testid={`news-card-${item.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-brand-100 hover:shadow-xl hover:shadow-brand-950/10 transition-shadow duration-500 h-full"
                  >
                    <div className="overflow-hidden bg-brand-100">
                      <img src={imgUrl(item.image)} alt={item.title} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-600">
                        {item.category} — {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <h2 className="mt-2 font-display text-lg font-bold text-brand-950 leading-snug group-hover:text-brand-600 transition-colors duration-300">{item.title}</h2>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
