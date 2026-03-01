import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import wardrobeImg from '@/assets/service-wardrobe.jpg';
import shoppingImg from '@/assets/service-shopping.jpg';
import shoppingOnlineImg from '@/assets/service-shopping-online.jpg';
import capsuleImg from '@/assets/service-capsule.jpg';
import capsuleTravelImg from '@/assets/service-capsule-travel.jpg';
import eventImg from '@/assets/service-event.jpg';

interface Service {
  key: string;
  image: string;
  fromPrice: boolean;
}

const services: Service[] = [
  { key: 'wardrobe', image: wardrobeImg, fromPrice: false },
  { key: 'shopping', image: shoppingImg, fromPrice: false },
  { key: 'shopping_online', image: shoppingOnlineImg, fromPrice: false },
  { key: 'capsule', image: capsuleImg, fromPrice: false },
  { key: 'capsule_travel', image: capsuleTravelImg, fromPrice: false },
  { key: 'event', image: eventImg, fromPrice: true },
];

const ServiceCard = ({
  service,
  isOpen,
  onToggle,
}: {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { t, formatPrice } = useLanguage();

  return (
    <div
      className="border border-border overflow-hidden cursor-pointer group"
      onClick={onToggle}
    >
      {/* Photo */}
      <div className="overflow-hidden h-52">
        <img
          src={service.image}
          alt={t(`services.${service.key}.title`)}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isOpen ? 'scale-[1.04]' : 'group-hover:scale-[1.02]'}`}
        />
      </div>

      {/* Header — always visible */}
      <div className="flex items-center justify-between px-6 py-4 min-h-[72px]">
        <h3 className="luxury-heading text-base md:text-lg leading-snug pr-3">
          {t(`services.${service.key}.title`)}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          <span className="luxury-label text-muted-foreground text-[0.6rem] whitespace-nowrap">
            {service.fromPrice && `${t('services.from')} `}
            {formatPrice(Number(t(`services.${service.key}.price`)))}
          </span>
          <span
            className="luxury-label text-muted-foreground text-base transition-transform duration-500"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
          >
            +
          </span>
        </div>
      </div>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-700 ease-out"
        style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-7 border-t border-border pt-5">
          <p className="luxury-body text-muted-foreground text-sm mb-6 leading-relaxed">
            {t(`services.${service.key}.desc`)}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="luxury-label text-muted-foreground mb-1">{t('services.format')}</p>
              <p className="luxury-body text-xs">{t(`services.${service.key}.format`)}</p>
            </div>
            <div>
              <p className="luxury-label text-muted-foreground mb-1">{t('services.duration')}</p>
              <p className="luxury-body text-xs">{t(`services.${service.key}.duration`)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="luxury-heading text-2xl">
              {service.fromPrice && (
                <span className="luxury-label text-muted-foreground mr-2 align-middle">
                  {t('services.from')}
                </span>
              )}
              {formatPrice(Number(t(`services.${service.key}.price`)))}
            </p>

            <a
              href="mailto:margarita@slavich.com"
              onClick={(e) => e.stopPropagation()}
              className="luxury-label border border-foreground/30 text-foreground px-6 py-2.5 tracking-[0.15em] transition-all duration-500 hover:bg-foreground hover:text-background"
            >
              {t('services.inquire')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesAndPricing = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <section className="py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-secondary/40">
      <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} max-w-6xl mx-auto`}>
        <p className="luxury-label text-muted-foreground mb-16 text-center">{t('services.label')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-start">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              service={service}
              isOpen={openKey === service.key}
              onToggle={() => toggle(service.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAndPricing;
