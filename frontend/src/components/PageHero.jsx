import { Reveal, SectionLabel } from "@/components/Reveal";

// Hero halaman dengan foto asli: desktop tampil utuh mengikuti lebar (tanpa crop),
// mobile memakai cover agar teks tetap terbaca.
export const PageHero = ({ label, title, description, image, testid }) => (
  <section className="relative bg-brand-950 grain-overlay overflow-hidden" data-testid={testid}>
    <img src={image} alt="" aria-hidden="true" className="sm:hidden absolute inset-0 w-full h-full object-cover opacity-40" />
    <img src={image} alt="" aria-hidden="true" className="hidden sm:block w-full h-auto opacity-40" />
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(100deg, rgba(13,59,62,0.95) 0%, rgba(8,28,29,0.78) 55%, rgba(8,28,29,0.5) 100%)" }}
    />
    <div className="relative sm:absolute sm:inset-0 flex items-center">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full py-16 sm:py-10">
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
    </div>
  </section>
);
