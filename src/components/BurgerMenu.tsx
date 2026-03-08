import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const rectsIntersect = (a: DOMRect, b: DOMRect) =>
  !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

const BurgerMenu = ({ isModalOpen = false }: { isModalOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isModalOpen) setIsOpen(false);
  }, [isModalOpen]);

  useEffect(() => {
    const btn = ref.current;
    const lightSections = ['services', 'gallery'].map((id) => document.getElementById(id)).filter(Boolean);
    if (!btn || lightSections.length === 0) return;

    let rafId: number | null = null;
    const check = () => {
      const tr = btn.getBoundingClientRect();
      const overLight = lightSections.some((el) => el && rectsIntersect(tr, el.getBoundingClientRect()));
      setIsLightBg(overLight);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        check();
        rafId = null;
      });
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const navItems = [
    { label: t('philosophy.label'), id: 'philosophy' },
    { label: t('services.label'), id: 'services' },
    { label: t('process.label'), id: 'process' },
    { label: t('gallery.label'), id: 'gallery' },
    { label: t('cta.label'), id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (isModalOpen) return null;

  return (
    <>
      {/* Burger button */}
      <button
        ref={ref}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="fixed top-6 left-6 z-[60] flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full"
        style={{
          backgroundColor: isLightBg ? 'rgba(255,248,231,0.5)' : 'rgba(58,23,26,0.5)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        }}
      >
        <span
          className="block h-px w-5 transition-all duration-300 origin-center"
          style={{
            backgroundColor: isLightBg ? '#3a171a' : 'var(--milk)',
            transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block h-px w-5 transition-all duration-300"
          style={{
            backgroundColor: isLightBg ? '#3a171a' : 'var(--milk)',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'none',
          }}
        />
        <span
          className="block h-px w-5 transition-all duration-300 origin-center"
          style={{
            backgroundColor: isLightBg ? '#3a171a' : 'var(--milk)',
            transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full z-50 flex flex-col justify-between py-16 px-8 sm:px-10"
        style={{
          width: 'min(320px, 82vw)',
          backgroundColor: '#3a171a',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          boxShadow: isOpen ? '8px 0 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Nav links */}
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex items-baseline gap-4 w-full text-left group py-3 border-b"
              style={{
                borderColor: 'rgba(242,227,208,0.1)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-16px)',
                transition: `opacity 0.35s ease ${0.12 + i * 0.07}s, transform 0.35s ease ${0.12 + i * 0.07}s`,
              }}
            >
              <span
                className="luxury-label-cascadia text-[10px] tabular-nums shrink-0 w-5"
                style={{ color: 'rgba(242,227,208,0.3)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="hero-name lowercase text-2xl sm:text-3xl leading-tight transition-opacity duration-300 group-hover:opacity-50"
                style={{ color: 'var(--milk)' }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom: signature */}
        <p
          className="luxury-label-cascadia text-[10px]"
          style={{
            color: 'rgba(242,227,208,0.25)',
            opacity: isOpen ? 1 : 0,
            transition: `opacity 0.35s ease 0.5s`,
          }}
        >
          margarita slavich
        </p>
      </div>
    </>
  );
};

export default BurgerMenu;
