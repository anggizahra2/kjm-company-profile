import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ChevronDown, Menu, X, Phone } from "lucide-react";
import { COMPANY } from "@/data/company";

const NAV = [
  { label: "Beranda", to: "/", id: "nav-beranda" },
  {
    label: "Tentang Kami",
    to: "/tentang-kami",
    id: "nav-tentang",
    children: [
      { label: "Profil Perusahaan", to: "/tentang-kami#profil", id: "nav-tentang-profil" },
      { label: "Visi & Misi", to: "/tentang-kami#visi-misi", id: "nav-tentang-visi" },
      { label: "Nilai Perusahaan", to: "/tentang-kami#nilai", id: "nav-tentang-nilai" },
    ],
  },
  { label: "Legalitas", to: "/legalitas", id: "nav-legalitas" },
  {
    label: "Armada & Layanan",
    to: "/layanan",
    id: "nav-layanan",
    children: [
      { label: "Armada", to: "/layanan#armada", id: "nav-layanan-armada" },
      { label: "Wilayah Layanan", to: "/layanan#wilayah", id: "nav-layanan-wilayah" },
      { label: "Pengangkutan Limbah B3", to: "/layanan#pengangkutan", id: "nav-layanan-pengangkutan" },
      { label: "Pengelolaan Limbah B3", to: "/layanan#pengelolaan", id: "nav-layanan-pengelolaan" },
    ],
  },
  { label: "Galeri", to: "/galeri", id: "nav-galeri" },
  { label: "Berita", to: "/berita", id: "nav-berita" },
];

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-300 ${
    isActive ? "text-brand-600" : "text-brand-950/70 hover:text-brand-600"
  }`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-brand-100"
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
            <img src="/logo.png" alt={`Logo ${COMPANY.name}`} className="h-11 w-11 object-contain transition-transform duration-500 group-hover:rotate-6" />
            <span className="leading-tight">
              <span className="block font-display font-bold text-brand-950 text-base">{COMPANY.name}</span>
              <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-brand-600">
                Pengelolaan Limbah B3
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.id} className="relative group" data-testid={item.id}>
                  <NavLink to={item.to} className={navLinkClass} end={false}>
                    <span className="flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </span>
                  </NavLink>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white rounded-xl shadow-xl shadow-brand-950/10 border border-brand-100 py-2 w-60">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.to}
                          data-testid={child.id}
                          className="block px-4 py-2.5 text-sm text-brand-950/70 hover:text-brand-600 hover:bg-brand-50 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={item.id} to={item.to} className={navLinkClass} data-testid={item.id} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/en"
              data-testid="nav-en"
              className="text-xs font-mono font-semibold tracking-wider text-brand-950/60 hover:text-brand-600 border border-brand-100 hover:border-brand-600 rounded-full px-3 py-1.5 transition-colors duration-300"
            >
              EN
            </Link>
            <Link
              to="/kontak"
              data-testid="header-contact-cta"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </Link>
          </div>

          <button
            className="lg:hidden text-brand-950 p-2"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Buka menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-brand-100 overflow-hidden"
            data-testid="mobile-nav"
          >
            <div className="px-5 py-4 space-y-1">
              {NAV.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm font-semibold text-brand-950"
                    data-testid={`mobile-${item.id}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 text-sm text-brand-950/60"
                          data-testid={`mobile-${child.id}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/en"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-en"
                className="block py-2.5 text-sm font-mono font-semibold tracking-wider text-brand-600"
              >
                EN — English Version
              </Link>
              <Link
                to="/kontak"
                onClick={() => setOpen(false)}
                data-testid="mobile-contact-cta"
                className="mt-2 flex items-center justify-center gap-2 bg-brand-600 text-white text-sm font-semibold px-5 py-3 rounded-full"
              >
                <Phone className="w-4 h-4" />
                Hubungi Kami
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
