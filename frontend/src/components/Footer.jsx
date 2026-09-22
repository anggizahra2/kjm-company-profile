import { Link } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail, Clock, Instagram, Linkedin, Facebook, Youtube, MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/company";

const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

export const Footer = () => (
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
            {COMPANY.socials.instagram && (
              <a href={COMPANY.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="social-instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {COMPANY.socials.linkedin && (
              <a href={COMPANY.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="social-linkedin" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {COMPANY.socials.facebook && (
              <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-testid="social-facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {COMPANY.socials.youtube && (
              <a href={COMPANY.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-testid="social-youtube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">Menu</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/tentang-kami" className="hover:text-brand-500 transition-colors" data-testid="footer-link-tentang">Tentang Kami</Link></li>
            <li><Link to="/legalitas" className="hover:text-brand-500 transition-colors" data-testid="footer-link-legalitas">Legalitas & Perizinan</Link></li>
            <li><Link to="/layanan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-layanan">Armada & Layanan</Link></li>
            <li><Link to="/galeri" className="hover:text-brand-500 transition-colors" data-testid="footer-link-galeri">Galeri</Link></li>
            <li><Link to="/berita" className="hover:text-brand-500 transition-colors" data-testid="footer-link-berita">Berita</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">Layanan</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/layanan#pengangkutan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-pengangkutan">Pengangkutan Limbah B3</Link></li>
            <li><Link to="/layanan#pengelolaan" className="hover:text-brand-500 transition-colors" data-testid="footer-link-pengelolaan">Pengelolaan Limbah B3</Link></li>
            <li><Link to="/layanan#armada" className="hover:text-brand-500 transition-colors" data-testid="footer-link-armada">Armada Transportasi</Link></li>
            <li><Link to="/layanan#wilayah" className="hover:text-brand-500 transition-colors" data-testid="footer-link-wilayah">Wilayah Layanan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span data-testid="footer-address"><span className="text-white/90 font-medium">Office:</span> {COMPANY.address}</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span data-testid="footer-warehouse"><span className="text-white/90 font-medium">Warehouse & TPS:</span> {COMPANY.warehouse}</span>
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
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-100/50">
        <p>© {new Date().getFullYear()} {COMPANY.name}. Seluruh hak cipta dilindungi.</p>
        <p className="font-mono uppercase tracking-wider">Transporter & Pengelola Limbah B3 Berizin KLHK</p>
      </div>
    </div>
  </footer>
);
