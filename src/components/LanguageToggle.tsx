import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 luxury-label">
      <button
        onClick={() => setLanguage('en')}
        className={`transition-opacity duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
      >
        EN
      </button>
      <span className="opacity-30">/</span>
      <button
        onClick={() => setLanguage('ua')}
        className={`transition-opacity duration-300 ${language === 'ua' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageToggle;
