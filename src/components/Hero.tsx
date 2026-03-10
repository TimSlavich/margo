import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero.png';
import EmailLink from '@/components/EmailLink';
import { useParallax } from '@/hooks/useParallax';

const Hero = () => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1140;
  const bgRef = useParallax(isMobile ? 0 : 0.2);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPhilosophy = () => {
    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#1a0a0b', height: '100vh', minHeight: '-webkit-fill-available' }}>
      <div
        ref={bgRef}
        className={isMobile ? undefined : 'parallax-bg'}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...(isMobile ? {} : { top: '-320px', bottom: '-500px' }),
        }}
      >
        <div className="absolute inset-0 bg-foreground/35" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center w-full px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* spacer above name */}
        <div className="flex-[3] w-full" />

        {/* NAME block */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center w-full"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
          }}
        >
          <h1 className="hero-name text-primary-foreground flex flex-col items-center gap-0 leading-tight w-full text-center">
            <span className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl block w-full text-center">{t('hero.surname')}</span>
            <span className="relative inline-block text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
              {t('hero.firstName')}
              <span className="luxury-label-cascadia absolute -bottom-4 right-0 text-primary-foreground/80 text-[0.6rem] sm:text-[0.6rem] md:text-xs whitespace-nowrap">
                {t('hero.title')}
              </span>
            </span>
          </h1>
        </div>

        {/* spacer between name and tagline */}
        <div className="flex-[0.6] w-full" />

        {/* TAGLINE block — centered between name and buttons */}
        <p
          className="flex-shrink-0 luxury-label-cascadia text-primary-foreground/80 text-[0.65rem] sm:text-sm md:text-xl lg:text-2xl max-w-[280px] sm:max-w-full text-center px-4 tracking-[0.04em] sm:tracking-normal sm:whitespace-nowrap"
          style={{
            wordSpacing: '-0.01em',
            lineHeight: 1.5,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.5s ease-out',
          }}
        >
          {t('hero.tagline')}
        </p>

        {/* spacer between tagline and buttons */}
        <div className="flex-[1.45] w-full" />

        {/* BUTTONS block */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5 sm:gap-10 pb-8 sm:pb-20">
          <EmailLink
            className="luxury-label-cascadia w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 tracking-[0.2em] transition-all duration-500 border hover:bg-[#3a171a] text-center"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            {t('hero.cta')}
          </EmailLink>
          <button
            onClick={scrollToPhilosophy}
            className="luxury-label-cascadia text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-500 flex items-center gap-2"
          >
            {t('hero.explore')} <span className="text-lg">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
