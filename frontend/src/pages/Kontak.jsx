import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api, formatApiErrorDetail } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

export default function Kontak() {
  const { t, data } = useLang();
  const { COMPANY } = data;
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", form);
      toast.success(t("Pesan terkirim! Tim kami akan segera menghubungi Anda.", "Message sent! Our team will contact you shortly."));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setSending(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div data-testid="kontak-page">
      <SEO
        title={t("Hubungi Kami", "Contact Us")}
        description={t(
          `Hubungi ${COMPANY.name} untuk konsultasi pengangkutan dan pengumpulan limbah B3. WhatsApp, telepon, email, atau formulir kontak.`,
          `Contact ${COMPANY.name} for B3 waste transport and collection inquiries. WhatsApp, phone, email, or contact form.`
        )}
        path="/kontak"
      />

      <section className="bg-brand-950 grain-overlay relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Hubungi Kami", "Contact Us")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
              {t("Mari Bicara Tentang", "Let's Talk About")} <span className="text-brand-500">{t("Limbah B3 Anda", "Your B3 Waste")}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Reveal>
              <div className="bg-white border border-brand-100 rounded-2xl p-6" data-testid="kontak-info-alamat">
                <MapPin className="w-6 h-6 text-brand-600 mb-3" />
                <h2 className="font-display font-bold text-brand-950">{t("Kantor & Fasilitas", "Office & Facility")}</h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-brand-950">{t("Office:", "Office:")}</span> {COMPANY.address}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-brand-950">{t("Warehouse & TPS:", "Warehouse & TPS:")}</span> {COMPANY.warehouse}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-white border border-brand-100 rounded-2xl p-6" data-testid="kontak-info-telepon">
                <Phone className="w-6 h-6 text-brand-600 mb-3" />
                <h2 className="font-display font-bold text-brand-950">{t("Telepon", "Phone")}</h2>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-slate-600 hover:text-brand-600">{COMPANY.phone}</a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-white border border-brand-100 rounded-2xl p-6" data-testid="kontak-info-email">
                <Mail className="w-6 h-6 text-brand-600 mb-3" />
                <h2 className="font-display font-bold text-brand-950">Email</h2>
                <a href={`mailto:${COMPANY.email}`} className="mt-2 block text-sm text-slate-600 hover:text-brand-600">{COMPANY.email}</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-white border border-brand-100 rounded-2xl p-6" data-testid="kontak-info-jam">
                <Clock className="w-6 h-6 text-brand-600 mb-3" />
                <h2 className="font-display font-bold text-brand-950">{t("Jam Operasional", "Working Hours")}</h2>
                <p className="mt-2 text-sm text-slate-600">{COMPANY.hours}</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="kontak-wa-cta"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-4 rounded-2xl transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" /> {t("Chat WhatsApp — Respon Cepat", "WhatsApp — Fast Response")}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-brand-100 rounded-3xl p-8 lg:p-10" data-testid="contact-form">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-950 mb-2">{t("Kirim Pesan", "Send a Message")}</h2>
              <p className="text-sm text-slate-600 mb-8">{t("Isi formulir di bawah, pesan Anda langsung terkirim ke email tim kami.", "Fill in the form below — your message goes straight to our team's inbox.")}</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("Nama Lengkap *", "Full Name *")}</Label>
                  <Input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={set("name")} placeholder={t("Nama Anda", "Your name")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="email@company.com" />
                </div>
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="contact-phone">{t("No. Telepon / WA", "Phone / WhatsApp")}</Label>
                <Input id="contact-phone" data-testid="contact-phone-input" value={form.phone} onChange={set("phone")} placeholder="08xx-xxxx-xxxx" />
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="contact-message">{t("Pesan *", "Message *")}</Label>
                <Textarea id="contact-message" data-testid="contact-message-input" required rows={5} value={form.message} onChange={set("message")} placeholder={t("Ceritakan kebutuhan pengangkutan / pengelolaan limbah B3 Anda…", "Tell us about your B3 waste transport / management needs…")} />
              </div>
              <Button
                type="submit"
                disabled={sending}
                data-testid="contact-submit-button"
                className="mt-7 bg-brand-600 hover:bg-brand-900 text-white font-semibold px-8 py-6 rounded-full transition-colors duration-300"
              >
                {sending ? t("Mengirim…", "Sending…") : t("Kirim Pesan", "Send Message")} <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="pb-24" data-testid="kontak-maps">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <SectionLabel>{t("Lokasi Kami", "Our Locations")}</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-950 mb-10">{t("Kunjungi Office & Warehouse Kami", "Visit Our Office & Warehouse")}</h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { nama: "Office", alamat: COMPANY.address, share: "https://maps.app.goo.gl/qpg2hCdtpVSw4g2e6", q: "Jl. Perumnas RT. 02 No. 56, Kampung Empat, Tarakan, Kalimantan Utara", testid: "map-office" },
              { nama: "Warehouse & TPS", alamat: COMPANY.warehouse, share: "https://maps.app.goo.gl/tjZ6kGbjsXjV3meY9", q: "Jl. Amal Baru RT. 05, Pantai Amal, Tarakan, Kalimantan Utara", testid: "map-warehouse" },
            ].map((loc) => (
              <Reveal key={loc.testid}>
                <div className="bg-white border border-brand-100 rounded-2xl overflow-hidden h-full" data-testid={loc.testid}>
                  <iframe
                    title={`Peta ${loc.nama} PT Kaltara Jaya Makmur`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.q)}&output=embed`}
                    className="w-full h-72 border-0"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="font-display font-bold text-brand-950">{loc.nama}</h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{loc.alamat}</p>
                    <a href={loc.share} target="_blank" rel="noopener noreferrer" data-testid={`${loc.testid}-link`} className="mt-4 inline-flex items-center gap-2 text-brand-600 text-sm font-semibold group">
                      {t("Buka di Google Maps", "Open in Google Maps")} <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
