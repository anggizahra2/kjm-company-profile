// frontend/middleware.js  (taruh di folder frontend, sejajar dengan package.json & vercel.json)
//
// Tag yang disisipkan diberi data-seo-static; komponen <SEO> menghapusnya setelah React jalan
// (lalu Helmet memasang tag yang sama), supaya tidak ada tag ganda.
//
// Fungsi: untuk /berita/<slug>, ganti tag SEO milik beranda di HTML mentah
// dengan tag milik artikel (title, description, canonical, og:*, twitter:*).
// Jika apa pun gagal (backend lambat/mati, artikel tidak ketemu), halaman tetap
// disajikan seperti biasa (index.html apa adanya), jadi paling buruk = kondisi sekarang.

export const config = { matcher: '/berita/:slug' };

// ====== SESUAIKAN BAGIAN INI ======
const SITE = 'https://kaltarajayamakmur.co.id';
const API_BASE = 'https://kjm-backend-sxhg.onrender.com';
const articleApiPath = (slug) => `/api/news/${encodeURIComponent(slug)}`; // sama dengan api.get(`/news/${slug}`) di BeritaDetail.jsx
// Nama field di JSON artikel (dicoba berurutan, yang pertama terisi dipakai)
const FIELD = {
  title: ['title'],
  summary: ['excerpt', 'content'],
  image: ['image'],
};
// ==================================

const SITE_NAME = 'PT Kaltara Jaya Makmur';
const DEFAULT_IMAGE = `${SITE}/images/hero-armada.webp`;
const TIMEOUT_MS = 3500;

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pick = (obj, keys) => {
  for (const k of keys) {
    const v = obj && obj[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};
const stripHtml = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
// Ubah nilai field gambar menjadi URL absolut (sesuaikan bila hasil og:image di view-source masih salah)
const imageUrl = (u) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return SITE + u;
  return `${SITE}/api/files/${u}`;
};

function buildTags({ slug, title, description, image }) {
  const url = `${SITE}/berita/${slug}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const t = (name, content) => `<meta data-seo-static="true" name="${name}" content="${esc(content)}" />`;
  const p = (prop, content) => `<meta data-seo-static="true" property="${prop}" content="${esc(content)}" />`;
  return [
    `<title data-seo-static="true">${esc(fullTitle)}</title>`,
    t('description', description),
    `<link data-seo-static="true" rel="canonical" href="${esc(url)}" />`,
    p('og:type', 'article'),
    p('og:title', fullTitle),
    p('og:description', description),
    p('og:url', url),
    p('og:image', image),
    t('twitter:title', fullTitle),
    t('twitter:description', description),
    t('twitter:image', image),
  ].join('');
}

export function transformHtml(html, tagsHtml) {
  const stripped = html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*\bname="description"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*\bproperty="og:(?:type|title|description|url|image)"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*\bname="twitter:(?:title|description|image)"[^>]*>/gi, '');
  return stripped.replace(/<\/head>/i, `${tagsHtml}</head>`);
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, headers: { accept: 'application/json' } });
  } finally {
    clearTimeout(timer);
  }
}

const passThrough = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const htmlResponse = (html) =>
  new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate' },
  });

export default async function middleware(request) {
  const url = new URL(request.url);
  let slug = '';
  try {
    slug = decodeURIComponent(url.pathname.replace(/^\/berita\//, '').replace(/\/+$/, ''));
  } catch (e) {
    return passThrough();
  }
  if (!slug) return passThrough();

  try {
    const shellRes = await fetch(new URL('/index.html', url.origin));
    if (!shellRes.ok) return passThrough();
    const shell = await shellRes.text();

    let tags = null;
    try {
      const apiRes = await fetchWithTimeout(API_BASE + articleApiPath(slug), TIMEOUT_MS);
      if (apiRes.ok) {
        const json = await apiRes.json();
        const a = (json && (json.data || json.berita || json.article)) || json;
        const title = pick(a, FIELD.title);
        if (title) {
          const summary = stripHtml(pick(a, FIELD.summary));
          tags = buildTags({
            slug,
            title,
            description: clip(summary || title, 155),
            image: imageUrl(pick(a, FIELD.image)) || DEFAULT_IMAGE,
          });
        }
      }
    } catch (e) {
      tags = null; // backend lambat/gagal: sajikan shell apa adanya
    }

    return htmlResponse(tags ? transformHtml(shell, tags) : shell);
  } catch (e) {
    return passThrough();
  }
}