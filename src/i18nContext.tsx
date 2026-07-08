import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from './i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('smilebook_language');
    if (saved === 'ar' || saved === 'en') return saved;
    // Check browser preference
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'ar' ? 'ar' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('smilebook_language', lang);
  };

  useEffect(() => {
    // Dynamic RTL/LTR layout toggle
    const html = document.documentElement;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    html.lang = language;
    
    // Add RTL class for tailwind styling support if needed
    if (language === 'ar') {
      html.classList.add('rtl-layout');
    } else {
      html.classList.remove('rtl-layout');
    }
  }, [language]);

  const t = (key: keyof typeof TRANSLATIONS['en']): any => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    const val = dict[key];
    if (val === undefined) {
      // Fallback
      return TRANSLATIONS['en'][key] || String(key);
    }
    return val;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
