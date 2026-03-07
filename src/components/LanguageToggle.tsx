import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const rectsIntersect = (a: DOMRect, b: DOMRect) =>
  !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isLightBg, setIsLightBg] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggle = ref.current;
    const lightSections = ['services', 'gallery', 'philosophy'].map((id) => document.getElementById(id)).filter(Boolean);
    if (!toggle || lightSections.length === 0) return;

    const check = () => {
      const tr = toggle.getBoundingClientRect();
      const overLight = lightSections.some((el) => el && rectsIntersect(tr, el.getBoundingClientRect()));
      setIsLightBg(overLight);
    };

    check();
    const obs = new ResizeObserver(check);
    lightSections.forEach((el) => el && obs.observe(el));
    window.addEventListener('scroll', check, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 luxury-label-cascadia transition-colors duration-300 ${
        isLightBg ? 'text-foreground' : 'text-primary-foreground'
      }`}
    >
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
