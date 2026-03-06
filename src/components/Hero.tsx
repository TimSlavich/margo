import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero.png';

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
          <h1 className="luxury-heading text-primary-foreground mb-6 flex flex-col items-center gap-0 leading-tight">
            <span className="text-3xl md:text-5xl lg:text-6xl">{t('hero.surname')}</span>
            <span className="text-4xl md:text-8xl lg:text-9xl">{t('hero.firstName')}</span>
          </h1>
          <p className="luxury-body text-primary-foreground/80 text-sm md:text-base max-w-md mx-auto mb-12">
            {t('hero.tagline')}
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="mailto:marharyta.slavych@gmail.com"
              className="luxury-label px-8 py-3 tracking-[0.2em] transition-all duration-500 border hover:bg-[#3a171a]"
              style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
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
