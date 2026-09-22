import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/company";

const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

export const WhatsAppFloat = () => (
  <a
    href={waLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hubungi kami via WhatsApp"
    data-testid="whatsapp-float"
    className="fixed bottom-6 right-6 z-50 group"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
    <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-110">
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </span>
  </a>
);
