import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import philosophyImage from '@/assets/philosophy.png';
import philosophy1 from '@/assets/philosophy-1.png';
import philosophy2 from '@/assets/philosophy-2.png';

const IMAGES = [philosophyImage, philosophy1, philosophy2];

const Philosophy = () => {
  const { t } = useLanguage();
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const setActive = (index: number) => {
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === index ? '1' : '0';
      });
    };

    const observers = panelRefs.current.map((panel, i) =>  {
      if (!panel) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4 }
      );
      obs.observe(panel);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const panels = [
    <div key={0}>
      <p className="luxury-label mb-5 text-center" style={{ color: 'var(--milk)', opacity: 0.7 }}>
        {t('philosophy.label')}
      </p>
      <h2 className="luxury-heading text-2xl md:text-4xl mb-8 text-center" style={{ color: 'var(--milk)' }}>
        {t('philosophy.heading')}
      </h2>
      <p className="luxury-body text-justify mb-5" style={{ color: 'var(--milk)' }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-justify" style={{ color: 'var(--milk)' }}>
        {t('philosophy.p2')}
      </p>
    </div>,
    <div key={1}>
      <p className="luxury-body text-justify" style={{ color: 'var(--milk)' }}>
        {t('philosophy.p2')}
      </p>
    </div>,
    <div key={2}>
      <blockquote className="luxury-heading text-2xl md:text-4xl italic text-center" style={{ color: 'var(--milk)' }}>
        "{t('philosophy.quote')}"
      </blockquote>
    </div>,
  ];

  return (
    <section id="philosophy" style={{ backgroundColor: '#3a171a' }}>

      {/* ── DESKTOP: sticky right image, scrolling left text ── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

        {/* Left: text panels, each min-h-screen */}
        <div>
          {panels.map((panel, i) => (
            <div
              key={i}
              ref={el => { panelRefs.current[i] = el; }}
              style={{
                minHeight: 'var(--real-100vh, 100svh)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 3rem',
              }}
            >
              <div style={{ maxWidth: '26rem', width: '100%' }}>
                {panel}
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky image container */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: 'var(--real-100vh, 100svh)',
              overflow: 'hidden',
            }}
          >
            {IMAGES.map((src, i) => (
              <div
                key={i}
                ref={el => { imageRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: i === 0 ? 1 : 0,
                  transition: 'opacity 0.7s ease',
                  willChange: 'opacity',
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
        </div>
      </div>

      {/* ── MOBILE: full-screen panels with image background ── */}
      <div className="md:hidden">
        {IMAGES.map((src, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              height: 'var(--real-100vh, 100svh)',
              overflow: 'hidden',
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(58,23,26,0.1) 25%, rgba(58,23,26,0.92) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '0 1.5rem max(2.5rem, env(safe-area-inset-bottom))',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{ maxWidth: '28rem', width: '100%' }}>
                {panels[i]}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Philosophy;
