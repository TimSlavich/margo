import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import EmailLink from '@/components/EmailLink';

interface ServiceDetails {
  for: string[];
  steps?: string[];
  online_steps?: string[];
  offline_steps?: string[];
  notes?: string;
}

interface ServiceModalProps {
  serviceKey: string;
  onClose: () => void;
  fromPrice?: boolean;
}

const DURATION = 320;

const ServiceModal = ({ serviceKey, onClose, fromPrice = false }: ServiceModalProps) => {
  const { t, formatPrice } = useLanguage();
  const { t: tRaw } = useTranslation();
  const [visible, setVisible] = useState(false);

  // Trigger enter animation after first paint
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, DURATION);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);

    // iOS Safari ignores overflow:hidden on body — use position:fixed trick
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    };
  }, [handleClose]);

  const rawDetails = tRaw(`services.${serviceKey}.details`, { returnObjects: true });
  const details: ServiceDetails | null =
    rawDetails && typeof rawDetails === 'object' && !Array.isArray(rawDetails)
      ? (rawDetails as ServiceDetails)
      : null;

  if (!details) return null;

  const hasOnlineOffline = !!(details.online_steps || details.offline_steps);

  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${DURATION}ms ease-out`,
        }}
      />

      {/* Modal — flex column so header+footer never scroll */}
      <div
        className="relative z-10 flex flex-col w-full max-w-2xl border border-border"
        style={{
          backgroundColor: 'var(--milk)',
          maxHeight: '90svh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: `opacity ${DURATION}ms ${easing}, transform ${DURATION}ms ${easing}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — never scrolls */}
        <div className="flex-shrink-0 border-b border-border px-8 py-6 flex items-start justify-between gap-4">
          <div>
            <p className="luxury-label text-black mb-1">{t('services.label')}</p>
            <h2 className="luxury-heading text-2xl md:text-3xl text-black">
              {t(`services.${serviceKey}.title`)}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-black hover:opacity-70 transition-opacity duration-300 shrink-0 mt-1 text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 overscroll-contain">
          {/* For whom */}
          {details.for && details.for.length > 0 && (
            <div>
              <p className="luxury-label text-black mb-4">
                {t('modal.for_whom')}
              </p>
              <ul className="space-y-3">
                {details.for.map((item, i) => (
                  <li key={i} className="luxury-body text-sm flex gap-3 text-black">
                    <span className="text-black shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps (single format) */}
          {details.steps && details.steps.length > 0 && (
            <div>
              <p className="luxury-label text-black mb-4">
                {t('modal.steps')}
              </p>
              <ol className="space-y-3">
                {details.steps.map((step, i) => (
                  <li key={i} className="luxury-body text-sm flex gap-3 text-black">
                    <span className="luxury-label text-primary shrink-0 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-black">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Online / Offline steps */}
          {hasOnlineOffline && (
            <div className="space-y-6">
              {details.online_steps && (
                <div>
                  <p className="luxury-label text-black mb-4">
                    {t('modal.online')}
                  </p>
                  <ol className="space-y-3">
                    {details.online_steps.map((step, i) => (
                      <li key={i} className="luxury-body text-sm flex gap-3 text-black">
                        <span className="luxury-label text-primary shrink-0 mt-0.5 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {details.offline_steps && (
                <div>
                  <p className="luxury-label text-black mb-4">
                    {t('modal.offline')}
                  </p>
                  <ol className="space-y-3">
                    {details.offline_steps.map((step, i) => (
                      <li key={i} className="luxury-body text-sm flex gap-3 text-black">
                        <span className="luxury-label text-primary shrink-0 mt-0.5 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Format + Duration */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-border">
            <div>
              <p className="luxury-label text-black mb-1">{t('services.format')}</p>
              <p className="luxury-body text-sm text-black">{t(`services.${serviceKey}.format`)}</p>
            </div>
            <div>
              <p className="luxury-label text-black mb-1">{t('services.duration')}</p>
              <p className="luxury-body text-sm text-black">{t(`services.${serviceKey}.duration`)}</p>
            </div>
          </div>

          {/* Notes */}
          {details.notes && (
            <div className="px-6 py-5" style={{ backgroundColor: 'var(--milk)', border: '2px solid #3a171a' }}>
              <p className="luxury-label text-black mb-2">
                {t('modal.important')}
              </p>
              <p className="luxury-body text-black text-sm leading-relaxed">
                {details.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer — never scrolls */}
        <div className="flex-shrink-0 border-t border-border px-8 py-6 flex items-center justify-between gap-4"
          style={{ paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))' }}
        >
          <p className="luxury-heading text-2xl text-black">
            {fromPrice && (
              <span className="luxury-label text-black mr-2 align-middle">
                {t('services.from')}
              </span>
            )}
            {formatPrice(Number(t(`services.${serviceKey}.price`)))}
          </p>
          <EmailLink
            className="luxury-label border border-primary text-black px-8 py-3 tracking-[0.15em] transition-all duration-500 hover:bg-primary hover:text-primary-foreground shrink-0"
            service={t(`services.${serviceKey}.title`)}
          >
            {t('services.inquire')}
          </EmailLink>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
