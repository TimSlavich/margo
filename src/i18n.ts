import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ua from './locales/ua.json';

const STORAGE_KEY = 'margo-lang';

const stored = (() => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'ua' || v === 'en' ? v : null;
  } catch {
    return null;
  }
})();

i18n
  .use(initReactI18next)
  .init({
    showSupportNotice: false,
    resources: {
      en: { translation: en },
      ua: { translation: ua },
    },
    lng: stored ?? 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: false,
    missingKeyHandler: false,
  });

export default i18n;
