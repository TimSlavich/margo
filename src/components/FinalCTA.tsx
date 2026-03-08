import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import ctaImage from '@/assets/cta.jpeg';
import EmailLink from '@/components/EmailLink';

const FinalCTA = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2);
  const bgRef = useParallax(0.2, -320);

  return (
    <section id="contact" className="relative pt-20 pb-20 sm:pt-20 sm:py-28 md:py-32 lg:py-48 overflow-hidden" style={{ backgroundColor: '#3a171a' }}>
      <div
        ref={bgRef}
        className="parallax-bg"
        style={{ backgroundImage: `url(${ctaImage})` }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(58, 23, 26, 0.5)' }} />
      </div>

      <div
        ref={ref}
        className={`fade-up ${isVisible ? 'visible' : ''} relative z-10 max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center`}
      >
        <h2 className="luxury-label-cascadia uppercase mb-10 sm:mb-14 lg:-mt-28 text-center flex flex-col gap-0 leading-tight text-base sm:text-lg md:text-xl lg:text-2xl" style={{ color: 'var(--milk)' }}>
          {t('cta.heading').split(' | ').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>

        <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-xs mx-auto mt-8 sm:mt-12">
          <EmailLink
            className="luxury-label-cascadia w-full px-6 py-3 tracking-[0.2em] transition-all duration-500 border text-center hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            {t('cta.email')}
          </EmailLink>

          <a
            href="https://t.me/MSlavych"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-label-cascadia w-full px-6 py-3 tracking-[0.2em] transition-all duration-500 border text-center hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            {t('cta.telegram')} @MSlavych
          </a>

          <a
            href="https://instagram.com/margarita.slavich"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-label-cascadia w-full px-6 py-3 tracking-[0.2em] transition-all duration-500 border text-center hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            {t('cta.instagram')} @margarita.slavich
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
