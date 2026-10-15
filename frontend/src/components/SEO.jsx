-static="true"import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

// Domain utama (apex). Canonical selalu memakai ini, walau halaman dibuka lewat www / preview.
const SITE_URL = "https://kaltarajayamakmur.co.id";

export const SEO = ({ title, description, path = "/", type = "website", image }) => {
  // Hapus tag SEO statis dari index.html / middleware setelah React jalan.
  // Helmet memasang tag yang sama di bawah, jadi tidak ada tag ganda.
  useEffect(() => {
    document.head.querySelectorAll("[data-seo-static]").forEach((el) => el.remove());
  }, []);

  const url = `${SITE_URL}${path}`;
  const fullTitle = title
    ? `${title} | ${COMPANY.name}`
    : `${COMPANY.name} — Pengangkutan & Pengelolaan Limbah B3 Berizin KLHK`;
  const desc = description || COMPANY.description;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`
    : `${SITE_URL}/images/hero-armada.webp`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="id_ID" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};