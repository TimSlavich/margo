import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ctaImage from '@/assets/cta.jpg';

const FinalCTA = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${ctaImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div
        ref={ref}
        className={`fade-up ${isVisible ? 'visible' : ''} relative z-10 max-w-2xl mx-auto px-6 text-center`}
      >
        <h2 className="luxury-heading text-3xl md:text-5xl text-primary-foreground mb-14">
          {t('cta.heading')}
        </h2>

        <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
          <a
            href="mailto:marharyta.slavych@gmail.com"
            className="luxury-label border border-secondary/60 text-primary-foreground px-10 py-3.5 tracking-[0.2em] transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground w-full text-center"
          >
            {t('cta.email')}
          </a>

          <a
            href="https://t.me/MSlavych"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-label border border-secondary/60 text-primary-foreground px-10 py-3.5 tracking-[0.2em] transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground w-full text-center"
          >
            {t('cta.telegram')} @MSlavych
          </a>

          <a
            href="https://instagram.com/margarita.slavich"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-label border border-secondary/60 text-primary-foreground px-10 py-3.5 tracking-[0.2em] transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground w-full text-center"
          >
            {t('cta.instagram')} @margarita.slavich
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
