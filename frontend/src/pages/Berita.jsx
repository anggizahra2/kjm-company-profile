import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { api, imgUrl } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

export default function Berita() {
  const { lang, t } = useLang();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const allLabel = t("Semua", "All");

  useEffect(() => {
    api
      .get("/news")
      .then(({ data }) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => [allLabel, ...new Set(items.map((i) => i.category))], [items, allLabel]);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchCat = !category || category === allLabel || i.category === category;
        const q = query.toLowerCase();
        const matchQ = !q || i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q);
        return matchCat && matchQ;
      }),
    [items, query, category, allLabel]
  );

  return (
    <div data-testid="berita-page">
      <SEO
        title={t("Berita", "News")}
        description={t(
          "Berita, kegiatan, dan perkembangan terbaru PT Kaltara Jaya Makmur — pengangkut dan pengumpul limbah B3 berizin di Kalimantan Utara.",
          "News, activities, and updates from PT Kaltara Jaya Makmur — a licensed B3 waste transporter and collector in North Kalimantan."
        )}
        path="/berita"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Berita", "News")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              {t("Kabar & Kegiatan", "Latest News &")} <span className="text-brand-500">{t("Terbaru", "Activities")}</span>
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
                placeholder={t("Cari berita…", "Search news…")}
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
                    (category || allLabel) === c
                      ? "bg-brand-900 text-white"
                      : "bg-white text-brand-950/60 border border-brand-100 hover:border-brand-600 hover:text-brand-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {lang === "en" && (
            <p className="mb-8 text-xs text-brand-950/50 font-mono uppercase tracking-wider" data-testid="news-lang-note">
              * News articles are published in Bahasa Indonesia
            </p>
          )}

          {loading ? (
            <p className="text-sm text-slate-500" data-testid="news-loading">{t("Memuat berita…", "Loading news…")}</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500" data-testid="news-empty">{t("Tidak ada berita yang cocok.", "No matching news found.")}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start" data-testid="news-grid">
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
                        {item.category} — {new Date(item.created_at).toLocaleDateString(lang === "en" ? "en-US" : "id-ID", { day: "numeric", month: "long", year: "numeric" })}
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
