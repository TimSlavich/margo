import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

type Language = 'en' | 'ua';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currency: string;
  currencySymbol: string;
  formatPrice: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const language = (i18n.language as Language) || 'en';

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem('margo-lang', lang);
    } catch {}
  };

  const currencySymbol = language === 'en' ? 'S$' : '$';
  const currency = language === 'en' ? 'SGD' : 'USD';

  const formatPrice = (amount: number): string =>
    language === 'en' ? `S$ ${amount}` : `$${amount}`;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency, currencySymbol, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
