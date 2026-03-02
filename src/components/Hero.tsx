import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero.jpg';

const Hero = () => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPhilosophy = () => {
    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/35" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className="transition-all duration-1500 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="luxury-label mb-6 text-primary-foreground/80">{t('hero.title')}</p>
          <h1 className="luxury-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6">
            {t('hero.name')}
          </h1>
          <p className="luxury-body text-primary-foreground/80 text-sm md:text-base max-w-md mx-auto mb-12">
            {t('hero.tagline')}
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="mailto:marharyta.slavych@gmail.com"
              className="luxury-label border border-secondary/60 text-primary-foreground px-8 py-3 tracking-[0.2em] transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground"
            >
              {t('hero.cta')}
            </a>
            <button
              onClick={scrollToPhilosophy}
              className="luxury-label text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-500 flex items-center gap-2"
            >
              {t('hero.explore')} <span className="text-lg">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
