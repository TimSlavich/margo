import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [1, 2, 3, 4, 5] as const;

const ProcessStep = ({ step }: { step: number }) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.2, step * 150);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? 'visible' : ''} grid grid-cols-12 gap-4 md:gap-8 py-10 border-t`}
      style={{ borderColor: 'rgba(242, 227, 208, 0.3)' }}
    >
      <div className="col-span-2 md:col-span-1">
        <span className="luxury-label" style={{ color: 'var(--milk)', opacity: 0.7 }}>0{step}</span>
      </div>
      <div className="col-span-10 md:col-span-4">
        <h3 className="luxury-heading text-xl md:text-2xl" style={{ color: 'var(--milk)' }}>{t(`process.${step}.title`)}</h3>
      </div>
      <div className="col-span-10 col-start-3 md:col-span-5 md:col-start-7">
        <p className="luxury-body text-sm" style={{ color: 'var(--milk)', opacity: 0.9 }}>{t(`process.${step}.desc`)}</p>
      </div>
    </div>
  );
};

const Process = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" className="py-24 md:py-40 px-6 md:px-16 lg:px-24" style={{ backgroundColor: '#3a171a' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''}`}>
          <p className="luxury-label mb-16 text-center" style={{ color: 'var(--milk)', opacity: 0.8 }}>{t('process.label')}</p>
        </div>
        {steps.map((step) => (
          <ProcessStep key={step} step={step} />
        ))}
        <div style={{ borderTop: '1px solid rgba(242, 227, 208, 0.3)' }} />
      </div>
    </section>
  );
};

export default Process;
