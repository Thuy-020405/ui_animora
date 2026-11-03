import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';
import { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('animora_lang');
      return saved === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem('animora_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLanguage = () => setLangState((prev) => (prev === 'vi' ? 'en' : 'vi'));
  const setLanguage = (newLang: Language) => setLangState(newLang);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
