import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ServiceModal from './ServiceModal';
import wardrobeImg from '@/assets/service-wardrobe.png';
import shoppingImg from '@/assets/service-shopping.png';
import capsuleImg from '@/assets/service-capsule.png';
import eventImg from '@/assets/service-event.png';
import mentoringImg from '@/assets/service-mentoring.png';

interface Service {
  key: string;
  image: string;
  fromPrice: boolean;
}

const services: Service[] = [
  { key: 'wardrobe', image: wardrobeImg, fromPrice: false },
  { key: 'shopping', image: shoppingImg, fromPrice: false },
  { key: 'capsule', image: capsuleImg, fromPrice: false },
  { key: 'event', image: eventImg, fromPrice: true },
  { key: 'mentoring', image: mentoringImg, fromPrice: true },
];

const ServiceCard = ({
  service,
  isOpen,
  onToggle,
  onDetails,
}: {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
  onDetails: () => void;
}) => {
  const { t, formatPrice } = useLanguage();

  return (
    <div
      className="border overflow-hidden cursor-pointer group h-full min-h-[19rem] flex flex-col"
      style={{ backgroundColor: '#FFF8E7', borderColor: '#3a171a' }}
      onClick={onToggle}
    >
      {/* Photo */}
      <div className="overflow-hidden h-52 p-2 md:p-3">
        <img
          src={service.image}
          alt={t(`services.${service.key}.title`)}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isOpen ? 'scale-[1.04]' : 'group-hover:scale-[1.02]'}`}
          style={
            service.key === 'shopping'
              ? { objectPosition: '50% 30%' }
              : service.key === 'mentoring'
                ? { objectPosition: '50% 25%' }
                : undefined
          }
        />
      </div>

      {/* Header — always visible */}
      <div className="flex items-center justify-between px-6 py-4 min-h-[6rem]">
        <h3 className="luxury-body text-base md:text-lg leading-snug pr-3 text-black uppercase">
          {t(`services.${service.key}.title`)}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          <span className="luxury-body text-black text-base md:text-lg whitespace-nowrap">
            {service.fromPrice && `${t('services.from')} `}
            {formatPrice(Number(t(`services.${service.key}.price`)))}
          </span>
          <span
            className="luxury-body text-black text-base transition-transform duration-500"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
          >
            +
          </span>
        </div>
      </div>

      {/* Expandable content */}
      <div
        className="overflow-y-auto overflow-x-hidden transition-all duration-700 ease-out"
        style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-7 border-t pt-5" style={{ borderColor: '#3a171a' }}>
          <p className="luxury-body text-black text-sm mb-6 leading-relaxed">
            {t(`services.${service.key}.desc`)}
          </p>

          <div className="flex items-center justify-between">
            <p className="luxury-body text-2xl text-black">
              {service.fromPrice && (
                <span className="luxury-body text-black mr-2 align-middle">
                  {t('services.from')}
                </span>
              )}
              {formatPrice(Number(t(`services.${service.key}.price`)))}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDetails();
              }}
              className="luxury-body border text-primary px-6 py-2.5 tracking-[0.15em] transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
              style={{ borderColor: '#3a171a' }}
            >
              {t('services.details')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesAndPricing = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const [modalKey, setModalKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const activeService = services.find((s) => s.key === modalKey);

  return (
    <section className="pt-16 pb-24 md:pt-20 md:pb-40 px-6 md:px-16 lg:px-24" style={{ backgroundColor: 'var(--milk)' }}>
      <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} max-w-6xl mx-auto`}>
        <p className="hero-name uppercase text-5xl sm:text-6xl md:text-8xl leading-tight text-center mb-16" style={{ color: '#3a171a', letterSpacing: '0.02em', transform: 'scaleY(1.15)', transformOrigin: 'center' }}>
          {t('services.label')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 items-start">
          {services.map((service, index) => (
            <div
              key={service.key}
              className={[
                'lg:col-span-2',
                index === 3 ? 'lg:col-start-2' : '',
              ].join(' ').trim()}
            >
              <ServiceCard
                service={service}
                isOpen={openKeys.has(service.key)}
                onToggle={() => toggle(service.key)}
                onDetails={() => setModalKey(service.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {modalKey && activeService && (
        <ServiceModal
          serviceKey={modalKey}
          fromPrice={activeService.fromPrice}
          onClose={() => setModalKey(null)}
        />
      )}
    </section>
  );
};

export default ServicesAndPricing;
