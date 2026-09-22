import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Truck } from "lucide-react";
import { ARMADA } from "@/data/company";

export const ArmadaTabs = () => {
  const [active, setActive] = useState(ARMADA[0].id);
  const current = ARMADA.find((a) => a.id === active);

  return (
    <div data-testid="armada-tabs">
      <div className="flex flex-wrap gap-3 mb-10">
        {ARMADA.map((a) => (
          <button
            key={a.id}
            onClick={() => setActive(a.id)}
            data-testid={`armada-tab-${a.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              active === a.id
                ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20"
                : "bg-white text-brand-950/60 border border-brand-100 hover:border-brand-600 hover:text-brand-600"
            }`}
          >
            {a.nama}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl border border-brand-100 p-8 lg:p-12"
          data-testid="armada-panel"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center">
                <Truck className="w-6 h-6 text-brand-900" />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-950">{current.nama}</h3>
                <p className="text-xs font-mono uppercase tracking-wider text-brand-600">
                  {current.jumlah} — Kapasitas {current.kapasitas}
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-slate-700 mb-6">{current.cocok}</p>
            <ul className="space-y-3">
              {current.fitur.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-100 rounded-[2rem] -rotate-2" />
            <div className="relative bg-brand-950 rounded-[1.5rem] p-8 grain-overlay overflow-hidden min-h-[280px] flex flex-col justify-end">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-500 mb-2">Spesifikasi Armada</p>
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-none">{current.jumlah}</p>
              <p className="font-display text-xl font-bold text-brand-500 mt-1">{current.nama}</p>
              <p className="text-sm text-brand-100/60 mt-3">Siap melayani penjemputan terjadwal maupun on-call di seluruh wilayah layanan.</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
