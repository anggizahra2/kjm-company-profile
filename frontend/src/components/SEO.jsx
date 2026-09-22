import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

export const SEO = ({ title, description, path = "/", type = "website", image }) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}${path}`;
  const fullTitle = title
    ? `${title} | ${COMPANY.name}`
    : `${COMPANY.name} — Pengangkutan & Pengelolaan Limbah B3 Berizin KLHK`;
  const desc = description || COMPANY.description;
  const ogImage =
    image ||
    "https://images.unsplash.com/photo-1700891271072-03bef644f435?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

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
