import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import Tentang from "@/pages/Tentang";
import Legalitas from "@/pages/Legalitas";
import Layanan from "@/pages/Layanan";
import Galeri from "@/pages/Galeri";
import Berita from "@/pages/Berita";
import BeritaDetail from "@/pages/BeritaDetail";
import Kontak from "@/pages/Kontak";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <ScrollManager />
              <Toaster position="top-center" richColors />
              <Routes>
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/tentang-kami" element={<PublicLayout><Tentang /></PublicLayout>} />
                <Route path="/legalitas" element={<PublicLayout><Legalitas /></PublicLayout>} />
                <Route path="/layanan" element={<PublicLayout><Layanan /></PublicLayout>} />
                <Route path="/galeri" element={<PublicLayout><Galeri /></PublicLayout>} />
                <Route path="/berita" element={<PublicLayout><Berita /></PublicLayout>} />
                <Route path="/berita/:slug" element={<PublicLayout><BeritaDetail /></PublicLayout>} />
                <Route path="/kontak" element={<PublicLayout><Kontak /></PublicLayout>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
