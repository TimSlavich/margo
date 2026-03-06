import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import philosophyImage from '@/assets/philosophy.png';
import philosophy1 from '@/assets/philosophy-1.png';
import philosophy2 from '@/assets/philosophy-2.png';

const IMAGES = [philosophyImage, philosophy1, philosophy2];
const PANELS = 3;
const SCROLL_UNITS = 4;

const Philosophy = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef(0);

  useEffect(() => {
    const applyIndex = (index: number) => {
      [desktopRefs, mobileRefs].forEach(group => {
        group.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = i <= index ? 'translateY(0)' : 'translateY(100%)';
        });
      });
    };

    // Устанавливаем начальное состояние
    applyIndex(0);

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const scrolled = -top;
      if (scrolled < 0 || scrolled > height) return;

      const index = Math.min(PANELS - 1, Math.floor(scrolled / (height / SCROLL_UNITS)));
      if (index === currentIndex.current) return;
      currentIndex.current = index;
      applyIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopText = (
    <div style={{ width: '100%', maxWidth: '26rem' }}>
      <p className="luxury-label mb-5 text-center" style={{ color: 'var(--milk)', opacity: 0.7 }}>
        {t('philosophy.label')}
      </p>
      <h2 className="luxury-heading text-4xl mb-8 text-center" style={{ color: 'var(--milk)' }}>
        {t('philosophy.heading')}
      </h2>
      <p className="luxury-body text-base text-justify mb-5" style={{ color: 'var(--milk)', lineHeight: 1.8 }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-base text-justify mb-10" style={{ color: 'var(--milk)', lineHeight: 1.8 }}>
        {t('philosophy.p2')}
      </p>
      <blockquote className="luxury-heading text-3xl italic text-center" style={{ color: 'var(--milk)', opacity: 0.9 }}>
        "{t('philosophy.quote')}"
      </blockquote>
    </div>
  );

  const mobileText = (
    <div style={{ width: '100%' }}>
      <p className="luxury-label text-center" style={{ color: 'var(--milk)', opacity: 0.7, fontSize: '0.7rem', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
        {t('philosophy.label')}
      </p>
      <h2 className="luxury-heading text-center" style={{ color: 'var(--milk)', fontSize: 'clamp(1.5rem, 6vw, 2rem)', marginBottom: '1rem' }}>
        {t('philosophy.heading')}
      </h2>
      <p className="luxury-body text-justify" style={{ color: 'var(--milk)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-justify" style={{ color: 'var(--milk)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
        {t('philosophy.p2')}
      </p>
      <blockquote className="luxury-heading italic text-center" style={{ color: 'var(--milk)', opacity: 0.9, fontSize: 'clamp(1.1rem, 5vw, 1.4rem)' }}>
        "{t('philosophy.quote')}"
      </blockquote>
    </div>
  );

  const imageStack = (refs: React.MutableRefObject<(HTMLDivElement | null)[]>) => (
    <div style={{ position: 'absolute', inset: 0 }}>
      {IMAGES.map((src, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          style={{
            position: 'absolute', inset: 0,
            transform: i === 0 ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
            willChange: 'transform',
            zIndex: i + 1,
          }}
        >
          <img
            src={src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} id="philosophy" style={{ backgroundColor: '#3a171a' }}>

      {/* ── DESKTOP ── */}
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: '1fr 1fr', minHeight: `calc(${SCROLL_UNITS} * 100svh)` }}
      >
        {/* Left: sticky static text */}
        <div style={{ position: 'sticky', top: 0, height: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem' }}>
          {desktopText}
        </div>

        {/* Right: sticky stacked images */}
        <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
          {imageStack(desktopRefs)}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div
        className="md:hidden"
        style={{ minHeight: `calc(${SCROLL_UNITS} * 100svh)`, position: 'relative' }}
      >
        {/* Sticky wrapper */}
        <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
          {imageStack(mobileRefs)}

          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            zIndex: PANELS + 1,
            background: 'rgba(58,23,26,0.55)',
          }} />

          {/* Centered text — no inner scroll */}
          <div style={{
            position: 'absolute', inset: 0,
            zIndex: PANELS + 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: `max(env(safe-area-inset-top), 2.5rem) 1.75rem max(env(safe-area-inset-bottom), 2.5rem)`,
          }}>
            {mobileText}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Philosophy;
