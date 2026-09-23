import { Reveal, SectionLabel } from "@/components/Reveal";

// Hero halaman: tinggi ± setengah hero beranda, foto full-cover dengan overlay brand.
export const PageHero = ({ label, title, description, image, testid }) => (
  <section
    className="relative bg-brand-950 grain-overlay overflow-hidden min-h-[300px] sm:min-h-[360px] lg:h-[46vh] lg:min-h-[400px] flex items-center"
    data-testid={testid}
  >
    <img
      src={image}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover opacity-45"
    />
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(100deg, rgba(13,59,62,0.94) 0%, rgba(8,28,29,0.72) 55%, rgba(8,28,29,0.45) 100%)" }}
    />
    <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full py-12">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-base lg:text-lg text-brand-100/80 max-w-2xl leading-relaxed">{description}</p>
        )}
      </Reveal>
    </div>
  </section>
);
