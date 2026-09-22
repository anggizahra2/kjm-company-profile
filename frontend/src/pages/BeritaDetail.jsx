import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { api, imgUrl } from "@/lib/api";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/news/${slug}`)
      .then(({ data }) => setItem(data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="py-32 text-center" data-testid="news-notfound">
        <h1 className="font-display text-2xl font-bold text-brand-950">Berita tidak ditemukan</h1>
        <Link to="/berita" className="mt-4 inline-block text-brand-600 text-sm font-semibold" data-testid="news-back-link">
          ← Kembali ke Berita
        </Link>
      </div>
    );
  }

  if (!item) {
    return <div className="py-32 text-center text-sm text-slate-500" data-testid="news-detail-loading">Memuat berita…</div>;
  }

  return (
    <div data-testid="berita-detail-page">
      <SEO title={item.title} description={item.excerpt} path={`/berita/${item.slug}`} type="article" image={imgUrl(item.image)} />

      <article className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Reveal>
            <Link to="/berita" className="inline-flex items-center gap-2 text-brand-600 text-sm font-semibold mb-8 group" data-testid="news-detail-back">
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> Semua Berita
            </Link>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-600">
              {item.category} — {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-brand-950" data-testid="news-detail-title">
              {item.title}
            </h1>
          </Reveal>

          {item.image && (
            <Reveal delay={0.15}>
              <img
                src={imgUrl(item.image)}
                alt={item.title}
                className="mt-10 w-full h-auto rounded-2xl shadow-xl"
                data-testid="news-detail-image"
              />
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <div className="mt-10 space-y-6" data-testid="news-detail-content">
              {item.content.split(/\n+/).filter(Boolean).map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-700">{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
