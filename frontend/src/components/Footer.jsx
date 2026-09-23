import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Facebook, Youtube, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer = () => {
  const { t, data } = useLang();
  const { COMPANY } = data;
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

  const SOCIALS = [
    { key: "instagram", label: "Instagram", Icon: Instagram },
    { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
    { key: "facebook", label: "Facebook", Icon: Facebook },
    { key: "youtube", label: "YouTube", Icon: Youtube },
    { key: "x", label: "X", Icon: XIcon },
  ];

  return (
    <footer className="bg-brand-950 text-brand-100/80" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt={`Logo ${COMPANY.name}`} className="w-11 h-11 object-contain" />
              <span className="font-display font-bold text-white text-lg leading-tight">{COMPANY.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">{COMPANY.tagline}.</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={COMPANY.socials[key] || "#"}
                  target={COMPANY.socials[key] ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={COMPANY.socials[key] ? label : `${label} — segera hadir`}
                  data-testid={`social-${key}`}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">{t("Menu", "Menu")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/tentang-kami" className="hover:text-brand-500 transition-colors" data-testid="footer-link-tentang">{t("Tentang Kami", "About Us")}</Link></li>
              <li><Link to="/legalitas" className="hover:text-brand-500 transition-colors" data-testid="footer-link-legalitas">{t("Legalitas & Perizinan", "Legality & Permits")}</Link></li>
              <li><Link to="/layanan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-layanan">{t("Armada & Layanan", "Fleet & Services")}</Link></li>
              <li><Link to="/galeri" className="hover:text-brand-500 transition-colors" data-testid="footer-link-galeri">{t("Galeri", "Gallery")}</Link></li>
              <li><Link to="/berita" className="hover:text-brand-500 transition-colors" data-testid="footer-link-berita">{t("Berita", "News")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">{t("Layanan", "Services")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/layanan#pengangkutan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-pengangkutan">{t("Pengangkutan Limbah B3", "B3 Waste Transport")}</Link></li>
              <li><Link to="/layanan#pengelolaan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-pengelolaan">{t("Pengelolaan Limbah B3", "B3 Waste Management")}</Link></li>
              <li><Link to="/layanan#armada" className="hover:text-brand-500 transition-colors" data-testid="footer-link-armada">{t("Armada Transportasi", "Transport Fleet")}</Link></li>
              <li><Link to="/layanan#wilayah" className="hover:text-brand-500 transition-colors" data-testid="footer-link-wilayah">{t("Wilayah Layanan", "Coverage Area")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">{t("Hubungi Kami", "Contact Us")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span data-testid="footer-address"><span className="text-white/90 font-medium">{t("Office:", "Office:")}</span> {COMPANY.address}</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span data-testid="footer-warehouse"><span className="text-white/90 font-medium">{t("Warehouse & TPS:", "Warehouse & TPS:")}</span> {COMPANY.warehouse}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-brand-500 transition-colors" data-testid="footer-phone">{COMPANY.phone}</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-500 transition-colors" data-testid="footer-email">{COMPANY.email}</a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-cta"
              className="mt-6 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              {t("Chat WhatsApp", "Chat on WhatsApp")}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-100/50">
          <p>© {new Date().getFullYear()} {COMPANY.name}. {t("Seluruh hak cipta dilindungi.", "All rights reserved.")}</p>
          <p className="font-mono uppercase tracking-wider">{t("Transporter & Pengelola Limbah B3 Berizin KLHK", "Licensed B3 Waste Transporter & Manager")}</p>
        </div>
      </div>
    </footer>
  );
};
