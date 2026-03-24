import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import ctaImage from '@/assets/cta.jpeg';
import { useContactForm } from '@/contexts/ContactFormContext';
import { useFaq } from '@/contexts/FaqContext';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 1 0 24 12.056A12.014 12.014 0 0 0 11.944 0Zm5.654 8.22l-1.636 7.706c-.119.536-.44.664-.89.414l-2.462-1.814-1.186 1.14a.617.617 0 0 1-.494.242l.177-2.506 4.558-4.118c.197-.177-.044-.276-.308-.1l-5.637 3.55-2.425-.756c-.528-.164-.538-.528.11-.783l9.478-3.652c.44-.16.824.107.682.783Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const FinalCTA = () => {
  const { t } = useLanguage();
  const { openForm } = useContactForm();
  const { openFaq } = useFaq();
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
        className={`fade-up ${isVisible ? 'visible' : ''} relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center`}
      >
        <h2 className="luxury-label-cascadia uppercase mb-10 sm:mb-14 lg:-mt-28 text-center flex flex-col gap-0 leading-tight text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" style={{ color: 'var(--milk)' }}>
          {t('cta.heading').split(' | ').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>

        <div className="flex flex-col items-center gap-6 sm:gap-8 mt-8 sm:mt-12 w-full max-w-xs">
          <button
            onClick={() => openForm()}
            className="w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-3 luxury-label-cascadia text-[0.65rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-500 border hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase whitespace-nowrap"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            <MailIcon />
            {t('cta.contactMe')}
          </button>

          <div className="flex items-center justify-center gap-8 sm:gap-10" style={{ color: 'var(--milk)' }}>
            <a
              href="https://t.me/MSlavych"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity duration-300"
              aria-label="Telegram"
            >
              <TelegramIcon />
            </a>

            <a
              href="https://instagram.com/margaritaslavich"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://wa.me/6598929093"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity duration-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>

          <button
            onClick={openFaq}
            className="w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-3 luxury-label-cascadia text-[0.65rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-500 border hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase whitespace-nowrap"
            style={{ color: 'var(--milk)', borderColor: '#3a171a' }}
          >
            {t('faq.label')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
