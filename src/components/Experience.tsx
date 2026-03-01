import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import experienceImage from '@/assets/experience.jpg';

const Experience = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2);

  const themes = ['experience.1', 'experience.2', 'experience.3', 'experience.4'];

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${experienceImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div
        ref={ref}
        className={`fade-up ${isVisible ? 'visible' : ''} relative z-10 max-w-2xl mx-auto px-6 text-center`}
      >
        <p className="luxury-label text-primary-foreground/70 mb-12">{t('experience.label')}</p>

        <div className="space-y-6">
          {themes.map((key, i) => (
            <p
              key={key}
              className="luxury-heading text-xl md:text-3xl text-primary-foreground"
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              {t(key)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
