import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFaq } from '@/contexts/FaqContext';
import { useTranslation } from 'react-i18next';

const DURATION = 320;

const FaqModal = () => {
  const { t } = useLanguage();
  const { t: tRaw } = useTranslation();
  const { isOpen, closeFaq } = useFaq();
  const [visible, setVisible] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      closeFaq();
      setOpenItems(new Set());
    }, DURATION);
  }, [closeFaq]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);

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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const rawQuestions = tRaw('faq.questions', { returnObjects: true });
  const questions = Array.isArray(rawQuestions) ? rawQuestions as { q: string; a: string }[] : [];

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={handleClose}>
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${DURATION}ms ease-out`,
        }}
      />

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
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border px-8 py-6 flex items-start justify-between gap-4">
          <h2 className="hero-name uppercase text-2xl md:text-3xl" style={{ color: '#3a171a' }}>
            {t('faq.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-black hover:opacity-70 transition-opacity duration-300 shrink-0 mt-1 text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {questions.map((item, i) => {
            const isItemOpen = openItems.has(i);
            return (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggleItem(i)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                >
                  <span className="luxury-body text-black uppercase pr-4">{item.q}</span>
                  <span
                    className="text-black text-xl transition-transform duration-300 shrink-0"
                    style={{ transform: isItemOpen ? 'rotate(45deg)' : 'rotate(0)' }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: isItemOpen ? '2400px' : '0', opacity: isItemOpen ? 1 : 0 }}
                >
                  <div className="px-8 pb-6">
                    <p className="luxury-body text-black text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqModal;
