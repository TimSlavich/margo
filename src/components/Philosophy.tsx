import { useLanguage } from '@/contexts/LanguageContext';
import philosophyImage from '@/assets/philosophy.png';

const Philosophy = () => {
  const { t } = useLanguage();

  const desktopParagraphs = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p className="luxury-body text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
        {t('philosophy.p1')}
      </p>
      <p className="luxury-body text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
        {t('philosophy.p2')}
      </p>
      <p className="luxury-body text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
        {t('philosophy.p3')}
      </p>
      <p className="luxury-body text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
        {t('philosophy.p4')}
      </p>
      <p className="luxury-body text-base text-justify" style={{ color: 'var(--milk)', lineHeight: 1.8 }}>
        {t('philosophy.p5')}
      </p>
    </div>
  );

  const desktopQuote = (
    <blockquote className="hero-name quote-sentence-case text-center" style={{ color: 'var(--milk)', opacity: 0.9, marginTop: 'auto', paddingTop: '6rem', width: '100%', marginInline: 'auto', fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)' }}>
          <span className="hidden desk:inline whitespace-nowrap">"{t('philosophy.quote')}"</span>
          <span className="desk:hidden">
        "{t('philosophy.quote').split('. ').map((part, i) => (
          <span key={i}>{i > 0 && <br />}{part}{i === 0 ? '.' : ''}</span>
        ))}"
      </span>
    </blockquote>
  );

  const desktopContent = (
    <div style={{ width: '100%', maxWidth: '36rem', alignSelf: 'center', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {desktopParagraphs}
      {desktopQuote}
    </div>
  );

  const mobileText = (
    <>
      <div style={{ width: '100%', maxWidth: 'min(38rem, 90%)', margin: '0 auto' }}>
        {[t('philosophy.p1'), t('philosophy.p2'), t('philosophy.p3'), t('philosophy.p4')].map((p, i) => (
          <p key={i} className="luxury-body text-justify" style={{ color: 'var(--milk)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.8, marginBottom: '1.1rem' }}>
            {p}
          </p>
        ))}
        <p className="luxury-body text-justify" style={{ color: 'var(--milk)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          {t('philosophy.p5')}
        </p>
      </div>
      <blockquote className="hero-name quote-sentence-case text-center" style={{ color: 'var(--milk)', opacity: 0.9, fontSize: 'clamp(0.62rem, 1.8vw, 0.78rem)', marginTop: '4rem', paddingBottom: '0.5rem', width: '100%' }}>
        "{t('philosophy.quote').split('. ').map((part, i) => (
          <span key={i}>{i > 0 && <br />}{part}{i === 0 ? '.' : ''}</span>
        ))}"
      </blockquote>
    </>
  );

  const imageBlock = (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <img
        src={philosophyImage}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '75% center', display: 'block' }}
        loading="eager"
      />
    </div>
  );

  return (
    <section id="philosophy" style={{ backgroundColor: '#3a171a', overflowX: 'hidden' }}>

      {/* ── DESKTOP ── */}
      <div className="hidden desk:grid" style={{ gridTemplateColumns: '1fr 1fr', minHeight: 'var(--real-100vh, 100svh)', width: '100%' }}>
        <div style={{ position: 'sticky', top: 0, height: 'var(--real-100vh, 100svh)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', padding: '3rem 3rem 4rem', overflow: 'hidden', minWidth: 0 }}>
          <p className="luxury-body text-center text-8xl uppercase leading-tight whitespace-nowrap px-1" style={{ color: 'var(--milk)', opacity: 0.7, letterSpacing: '0.02em', transform: 'scaleY(1.2)', transformOrigin: 'center', marginBottom: '2rem', flexShrink: 0 }}>
            {t('philosophy.label')}
          </p>
          {desktopContent}
        </div>
        <div style={{ position: 'sticky', top: 0, height: 'var(--real-100vh, 100svh)', width: '100%', overflow: 'hidden', minWidth: 0, backgroundColor: '#3a171a' }}>
          {imageBlock}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="desk:hidden">
        <div
          className="pt-[max(env(safe-area-inset-top),3.5rem)] px-4 pb-10"
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <p className="luxury-body text-center text-5xl sm:text-6xl md:text-7xl uppercase leading-tight" style={{ color: 'var(--milk)', opacity: 0.7, letterSpacing: '0.02em', transform: 'scaleY(1.15)', transformOrigin: 'center' }}>
            {t('philosophy.label')}
          </p>
        </div>
        <div
          style={{
            padding: '0 1.5rem 3rem',
          }}
        >
          {mobileText}
        </div>
        <div style={{ position: 'relative', marginTop: '-1px', paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(to bottom, #3a171a 0%, rgba(58,23,26,0.6) 40%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <img
            src={philosophyImage}
            alt=""
            style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: '75% center', minHeight: 'calc(var(--real-100vh, 100svh) * 0.5)' }}
            loading="lazy"
          />
        </div>
      </div>

    </section>
  );
};

export default Philosophy;
