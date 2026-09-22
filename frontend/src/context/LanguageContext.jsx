import { createContext, useContext, useEffect, useState } from "react";
import * as ID from "@/data/company";
import * as EN from "@/i18n/enData";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("kjm-lang") || "id");

  useEffect(() => {
    localStorage.setItem("kjm-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (id, en) => (lang === "en" ? en : id);
  const data = lang === "en" ? { ...ID, ...EN, COMPANY: { ...ID.COMPANY, ...EN.COMPANY } } : ID;

  return <LanguageContext.Provider value={{ lang, setLang, t, data }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
