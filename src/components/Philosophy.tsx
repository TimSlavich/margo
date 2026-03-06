import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import philosophyImage from '@/assets/philosophy.png';
import philosophy1 from '@/assets/philosophy-1.png';
import philosophy2 from '@/assets/philosophy-2.png';

const IMAGES = [philosophyImage, philosophy1, philosophy2];
const PANELS = 3;

const Philosophy = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const textPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastTextIndex = useRef(-1);
  const targetImageOffset = useRef(0);
  const currentImageOffset = useRef(0);
  const rafId = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const animate = () => {
      const track = imageTrackRef.current;
      if (track) {
        const diff = targetImageOffset.current - currentImageOffset.current;
        if (Math.abs(diff) > 0.01) {
          currentImageOffset.current += diff * 0.12;
          track.style.transform = `translate3d(0, -${currentImageOffset.current}vh, 0)`;
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalScroll = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, scrolled / totalScroll);

      const imageIndex = Math.min(PANELS - 1, Math.floor(progress * PANELS));
      const textIndex = imageIndex < 2 ? 0 : 1;

      targetImageOffset.current = imageIndex * 100;

      if (textIndex !== lastTextIndex.current) {
        lastTextIndex.current = textIndex;
        textPanelRefs.current.forEach((el, i) => {
          if (!el) return;
          const active = i === textIndex;
          el.style.opacity = active ? '1' : '0';
          el.style.transform = active ? 'translateY(0)' : 'translateY(16px)';
          el.style.pointerEvents = active ? 'auto' : 'none';
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const textContents = [
    <div key={0} className="max-w-md w-full">
      <p className="luxury-label mb-4 md:mb-6 text-center" style={{ color: 'var(--milk)', opacity: 0.7 }}>
        {t('philosophy.label')}
      </p>
      <h2 className="luxury-heading text-2xl md:text-4xl mb-6 md:mb-8 text-center" style={{ color: 'var(--milk)' }}>
        {t('philosophy.heading')}
      </h2>
      <p className="luxury-body text-justify mb-4 md:mb-6" style={{ color: 'var(--milk)' }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-justify" style={{ color: 'var(--milk)' }}>
        {t('philosophy.p2')}
      </p>
    </div>,
    <div key={1} className="max-w-md w-full">
      <blockquote
        className="luxury-heading text-xl md:text-4xl italic text-center"
        style={{ color: 'var(--milk)' }}
      >
        "{t('philosophy.quote')}"
      </blockquote>
    </div>,
  ];

  const imageTrack = (
    <div
      ref={imageTrackRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
      }}
    >
      {IMAGES.map((src, i) => (
        <div key={i} style={{ width: '100%', height: '100vh', flexShrink: 0 }}>
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
    <section
      ref={sectionRef}
      id="philosophy"
      style={{ backgroundColor: '#3a171a', height: `${PANELS * 100}vh` }}
    >
      {isMobile ? (
        /* Mobile: full-screen image with text overlay */
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {imageTrack}

          {/* gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(58,23,26,0.15) 30%, rgba(58,23,26,0.92) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* text panels */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem 1.5rem 3rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {textContents.map((content, i) => (
              <div
                key={i}
                ref={el => { textPanelRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  bottom: '3rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  pointerEvents: i === 0 ? 'auto' : 'none',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {content}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: side-by-side grid */
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            overflow: 'hidden',
          }}
        >
          {/* Left: text */}
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 3rem',
              position: 'relative',
            }}
          >
            {textContents.map((content, i) => (
              <div
                key={i}
                ref={el => { textPanelRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  pointerEvents: i === 0 ? 'auto' : 'none',
                  padding: '2rem 3rem',
                }}
              >
                {content}
              </div>
            ))}
          </div>

          {/* Right: images */}
          <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {imageTrack}
          </div>
        </div>
      )}
    </section>
  );
};

export default Philosophy;
