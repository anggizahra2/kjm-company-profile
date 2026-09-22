import { useLang } from "@/context/LanguageContext";

export const Marquee = () => {
  const { data } = useLang();
  const items = [...data.MARQUEE_ITEMS, ...data.MARQUEE_ITEMS];
  return (
    <div className="bg-brand-950 py-4 overflow-hidden border-y border-brand-900" data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee gap-0">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-sm font-mono uppercase tracking-[0.18em] text-brand-100/70 whitespace-nowrap"
          >
            {item}
            <img src="/logo.png" alt="Logo KJM" className="h-4 w-4 object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
};
