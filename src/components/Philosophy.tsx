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
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const desktopTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndex = useRef(-1);

  useEffect(() => {
    const setActive = (imageIndex: number) => {
      if (imageIndex === currentIndex.current) return;
      currentIndex.current = imageIndex;

      [desktopTrackRef, mobileTrackRef].forEach(ref => {
        if (ref.current) ref.current.style.transform = `translateY(-${imageIndex * 100}svh)`;
      });

      const textIndex = imageIndex < 2 ? 0 : 1;
      [desktopTextRefs, mobileTextRefs].forEach(refsArr => {
        refsArr.current.forEach((el, i) => {
          if (!el) return;
          const active = i === textIndex;
          el.style.opacity = active ? '1' : '0';
          el.style.transform = active ? 'translateY(0)' : 'translateY(16px)';
          el.style.pointerEvents = active ? 'auto' : 'none';
        });
      });
    };

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const scrolled = -top;
      if (scrolled < 0 || scrolled > height) return;
      const index = Math.min(PANELS - 1, Math.floor(scrolled / (height / SCROLL_UNITS)));
      setActive(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textContents = [
    <div key={0} style={{ width: '100%' }}>
      <p className="luxury-label mb-4 text-center" style={{ color: 'var(--milk)', opacity: 0.7 }}>
        {t('philosophy.label')}
      </p>
      <h2 className="luxury-heading text-2xl md:text-4xl mb-6 md:mb-8 text-center" style={{ color: 'var(--milk)' }}>
        {t('philosophy.heading')}
      </h2>
      <p className="luxury-body text-sm md:text-base text-justify mb-4" style={{ color: 'var(--milk)', lineHeight: 1.75 }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-sm md:text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.75 }}>
        {t('philosophy.p2')}
      </p>
    </div>,
    <div key={1} style={{ width: '100%' }}>
      <blockquote className="luxury-heading text-2xl md:text-4xl italic text-center" style={{ color: 'var(--milk)' }}>
        "{t('philosophy.quote')}"
      </blockquote>
    </div>,
  ];

  const stickyHeight: React.CSSProperties = { position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' };
  const scrollSpace: React.CSSProperties = { minHeight: `calc(${SCROLL_UNITS} * 100svh)`, position: 'relative' };
  const trackStyle: React.CSSProperties = { willChange: 'transform', transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)' };

  return (
    <section ref={sectionRef} id="philosophy" style={{ backgroundColor: '#3a171a' }}>

      {/* ── DESKTOP ── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: scroll space + sticky text */}
        <div style={scrollSpace}>
          <div style={{ ...stickyHeight, overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem' }}>
            {textContents.map((content, i) => (
              <div
                key={i}
                ref={el => { desktopTextRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  maxWidth: '26rem',
                  padding: '0 1rem',
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  pointerEvents: i === 0 ? 'auto' : 'none',
                }}
              >
                {content}
              </div>
            ))}
          </div>
        </div>

        {/* Right: sticky sliding image track */}
        <div style={{ position: 'relative' }}>
          <div style={stickyHeight}>
            <div ref={desktopTrackRef} style={trackStyle}>
              {IMAGES.map((src, i) => (
                <div key={i} style={{ height: '100svh' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: sticky image + static text overlay ── */}
      <div className="md:hidden" style={scrollSpace}>
        <div style={stickyHeight}>
          {/* Image track */}
          <div ref={mobileTrackRef} style={{ ...trackStyle, position: 'absolute', inset: 0 }}>
            {IMAGES.map((src, i) => (
              <div key={i} style={{ height: '100svh' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(58,23,26,0.05) 20%, rgba(58,23,26,0.75) 60%, rgba(58,23,26,0.96) 100%)',
          }} />

          {/* Text panels */}
          {textContents.map((content, i) => (
            <div
              key={i}
              ref={el => { mobileTextRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: `0 1.75rem max(2.5rem, env(safe-area-inset-bottom))`,
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents: i === 0 ? 'auto' : 'none',
              }}
            >
              {content}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Philosophy;
