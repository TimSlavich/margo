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
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const rafId = useRef<number>(0);
  const rafActive = useRef(false);
  const isTouch = useRef('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Обновляем высоту секции при ресайзе (--real-100vh устанавливается глобально в index.html)
  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        sectionRef.current.style.height = `${window.innerHeight * PANELS}px`;
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', () => setTimeout(updateHeight, 100));
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const startRaf = () => {
      if (rafActive.current) return;
      rafActive.current = true;

      const animate = () => {
        if (!rafActive.current) return;
        const track = imageTrackRef.current;
        if (track) {
          const diff = targetOffset.current - currentOffset.current;
          if (Math.abs(diff) > 0.5) {
            currentOffset.current += diff * 0.15;
            track.style.transform = `translate3d(0, -${currentOffset.current}px, 0)`;
            rafId.current = requestAnimationFrame(animate);
          } else if (diff !== 0) {
            currentOffset.current = targetOffset.current;
            track.style.transform = `translate3d(0, -${currentOffset.current}px, 0)`;
            rafActive.current = false;
          } else {
            rafActive.current = false;
          }
        } else {
          rafActive.current = false;
        }
      };
      rafId.current = requestAnimationFrame(animate);
    };

    const applyImageOffset = (offset: number) => {
      const track = imageTrackRef.current;
      if (!track) return;
      // На touch-устройствах snap сразу — нет lag от lerp
      if (isTouch.current) {
        currentOffset.current = offset;
        track.style.transform = `translate3d(0, -${offset}px, 0)`;
      } else {
        targetOffset.current = offset;
        startRaf();
      }
    };

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const totalScroll = Math.max(1, rect.height - vh);
      const progress = Math.min(1, scrolled / totalScroll);

      const imageIndex = Math.min(PANELS - 1, Math.floor(progress * PANELS));
      const textIndex = imageIndex < 2 ? 0 : 1;

      applyImageOffset(imageIndex * vh);

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
      rafActive.current = false;
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

  const imageSlotStyle: React.CSSProperties = {
    width: '100%',
    height: 'var(--real-100vh, 100vh)',
    flexShrink: 0,
  };

  const imageTrack = (
    <div
      ref={imageTrackRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
        WebkitTransform: 'translate3d(0, 0, 0)',
      }}
    >
      {IMAGES.map((src, i) => (
        <div key={i} style={imageSlotStyle}>
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

  const stickyHeight: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    height: 'var(--real-100vh, 100vh)',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'auto',
  };

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{ backgroundColor: '#3a171a', height: `${PANELS * 100}vh` }}
    >
      {isMobile ? (
        <div style={stickyHeight}>
          {imageTrack}

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(58,23,26,0.1) 25%, rgba(58,23,26,0.95) 100%)',
              pointerEvents: 'none',
            }}
          />

          {textContents.map((content, i) => (
            <div
              key={i}
              ref={el => { textPanelRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                bottom: 'env(safe-area-inset-bottom, 0px)',
                left: 0,
                right: 0,
                padding: '0 1.5rem 3rem',
                display: 'flex',
                justifyContent: 'center',
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
      ) : (
        <div
          style={{
            ...stickyHeight,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div
            style={{
              height: 'var(--real-100vh, 100vh)',
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

          <div style={{ height: 'var(--real-100vh, 100vh)', overflow: 'hidden', position: 'relative' }}>
            {imageTrack}
          </div>
        </div>
      )}
    </section>
  );
};

export default Philosophy;
