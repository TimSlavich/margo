import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import philosophyImage from '@/assets/philosophy.jpg';

const Philosophy = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation(0.3, 300);

  return (
    <section id="philosophy" className="py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-primary">
      <div
        ref={sectionRef}
        className={`fade-up ${isVisible ? 'visible' : ''} grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center max-w-7xl mx-auto`}
      >
        <div className="md:col-span-5">
          <img
            src={philosophyImage}
            alt="Luxury fashion styling"
            className="w-full h-[400px] md:h-[600px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="luxury-label text-primary-foreground/60 mb-8">{t('philosophy.label')}</p>
          <h2 className="luxury-heading text-3xl md:text-4xl mb-10 text-primary-foreground">{t('philosophy.heading')}</h2>
          <p className="luxury-body text-primary-foreground/75 mb-6">{t('philosophy.p1')}</p>
          <p className="luxury-body text-primary-foreground/75">{t('philosophy.p2')}</p>
        </div>
      </div>

      <div
        ref={quoteRef}
        className={`fade-up ${quoteVisible ? 'visible' : ''} max-w-3xl mx-auto text-center mt-24 md:mt-32`}
      >
        <blockquote className="luxury-heading text-3xl md:text-5xl italic text-primary-foreground">
          "{t('philosophy.quote')}"
        </blockquote>
      </div>
    </section>
  );
};

export default Philosophy;
