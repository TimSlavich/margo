import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
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
        className="relative z-10 flex flex-col w-full max-w-2xl bg-background border border-border"
        style={{
          maxHeight: '90vh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: `opacity ${DURATION}ms ${easing}, transform ${DURATION}ms ${easing}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — never scrolls */}
        <div className="flex-shrink-0 border-b border-border px-8 py-6 flex items-start justify-between gap-4">
          <div>
            <p className="luxury-label text-muted-foreground mb-1">{t('services.label')}</p>
            <h2 className="luxury-heading text-2xl md:text-3xl">
              {t(`services.${serviceKey}.title`)}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 shrink-0 mt-1 text-2xl leading-none w-8 h-8 flex items-center justify-center"
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
              <p className="luxury-label text-muted-foreground mb-4">
                {t('modal.for_whom')}
              </p>
              <ul className="space-y-3">
                {details.for.map((item, i) => (
                  <li key={i} className="luxury-body text-sm flex gap-3">
                    <span className="text-muted-foreground shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps (single format) */}
          {details.steps && details.steps.length > 0 && (
            <div>
              <p className="luxury-label text-muted-foreground mb-4">
                {t('modal.steps')}
              </p>
              <ol className="space-y-3">
                {details.steps.map((step, i) => (
                  <li key={i} className="luxury-body text-sm flex gap-3">
                    <span className="luxury-label text-primary shrink-0 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
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
                  <p className="luxury-label text-secondary-foreground mb-4">
                    {t('modal.online')}
                  </p>
                  <ol className="space-y-3">
                    {details.online_steps.map((step, i) => (
                      <li key={i} className="luxury-body text-sm flex gap-3">
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
                  <p className="luxury-label text-secondary-foreground mb-4">
                    {t('modal.offline')}
                  </p>
                  <ol className="space-y-3">
                    {details.offline_steps.map((step, i) => (
                      <li key={i} className="luxury-body text-sm flex gap-3">
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
              <p className="luxury-label text-muted-foreground mb-1">{t('services.format')}</p>
              <p className="luxury-body text-sm">{t(`services.${serviceKey}.format`)}</p>
            </div>
            <div>
              <p className="luxury-label text-muted-foreground mb-1">{t('services.duration')}</p>
              <p className="luxury-body text-sm">{t(`services.${serviceKey}.duration`)}</p>
            </div>
          </div>

          {/* Notes */}
          {details.notes && (
            <div className="bg-secondary/20 border border-border px-6 py-5">
              <p className="luxury-label text-muted-foreground mb-2">
                {t('modal.important')}
              </p>
              <p className="luxury-body text-muted-foreground text-sm leading-relaxed">
                {details.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer — never scrolls */}
        <div className="flex-shrink-0 border-t border-border px-8 py-6 flex items-center justify-between gap-4">
          <p className="luxury-heading text-2xl text-primary">
            {fromPrice && (
              <span className="luxury-label text-muted-foreground mr-2 align-middle">
                {t('services.from')}
              </span>
            )}
            {formatPrice(Number(t(`services.${serviceKey}.price`)))}
          </p>
          <a
            href="mailto:marharyta.slavych@gmail.com"
            className="luxury-label border border-secondary/60 text-foreground px-8 py-3 tracking-[0.15em] transition-all duration-500 hover:bg-secondary hover:text-secondary-foreground shrink-0"
          >
            {t('services.inquire')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
