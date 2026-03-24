import { useEffect, useState, useCallback, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactForm } from '@/contexts/ContactFormContext';

const WEB3FORMS_KEY = 'e7347692-2656-46b0-87a4-6ae9bf36e877';

const SERVICE_KEYS = [
  'ultimateTransformation',
  'wardrobeAudit',
  'shoppingCuration',
  'capsuleWardrobe',
  'eventLook',
  'monthlyMentoring',
  'brandCollaboration',
] as const;

const HOW_HEARD_KEYS = ['google', 'instagram', 'wordOfMouth', 'other'] as const;
const BUDGET_KEYS = ['5kBelow', '10k', '10_20k', 'noLimit'] as const;

const SERVICE_MAP: Record<string, string> = {
  wardrobe: 'wardrobeAudit',
  shopping: 'shoppingCuration',
  capsule: 'capsuleWardrobe',
  event: 'eventLook',
  transformation: 'ultimateTransformation',
};

const DURATION = 320;

const ContactFormModal = () => {
  const { t } = useLanguage();
  const { isOpen, preselectedService, closeForm } = useContactForm();
  const [visible, setVisible] = useState(false);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<'success' | 'error' | null>(null);

  /* pre-fill service when opened from a specific service page */
  useEffect(() => {
    if (isOpen && preselectedService) {
      setService(SERVICE_MAP[preselectedService] ?? '');
    }
  }, [isOpen, preselectedService]);

  /* enter animation */
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  /* lock scroll + escape key */
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
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      closeForm();
      /* reset form */
      setFirstName('');
      setLastName('');
      setEmail('');
      setHowHeard('');
      setService('');
      setDetails('');
      setBudget('');
      setConfirmed(false);
      setErrors({});
      setSubmitted(false);
      setSending(false);
      setSendResult(null);
    }, DURATION);
  }, [closeForm]);

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!firstName.trim()) errs.firstName = true;
    if (!lastName.trim()) errs.lastName = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = true;
    if (!howHeard) errs.howHeard = true;
    if (!service) errs.service = true;
    if (!details.trim()) errs.details = true;
    if (!budget) errs.budget = true;
    if (!confirmed) errs.confirmed = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    const serviceLabel = t(`contactForm.serviceOptions.${service}`);
    const howHeardLabel = t(`contactForm.howHeardOptions.${howHeard}`);
    const budgetLabel = t(`contactForm.budgetOptions.${budget}`);

    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Inquiry — ${serviceLabel}`,
          from_name: `${firstName} ${lastName}`,
          email,
          'How heard about me': howHeardLabel,
          'Service': serviceLabel,
          'Details': details,
          'Budget': budgetLabel,
        }),
      });

      if (res.ok) {
        setSendResult('success');
        setTimeout(handleClose, 2000);
      } else {
        setSendResult('error');
      }
    } catch {
      setSendResult('error');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const inputClass =
    'w-full px-4 py-3 bg-transparent border text-sm luxury-body text-black focus:outline-none transition-colors duration-300';
  const labelClass = 'luxury-body text-black text-sm uppercase mb-2 block';
  const errorBorder = 'border-red-400';
  const normalBorder = 'border-[#3a171a]/30 focus:border-[#3a171a]';

  const radioGroupClass = 'flex flex-col gap-2';

  const RadioOption = ({
    name,
    value,
    checked,
    onChange,
    label,
  }: {
    name: string;
    value: string;
    checked: boolean;
    onChange: (v: string) => void;
    label: string;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
          checked ? 'border-[#3a171a] bg-[#3a171a]' : 'border-[#3a171a]/40 group-hover:border-[#3a171a]'
        }`}
      >
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-[var(--milk)]" />}
      </span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="luxury-body text-sm text-black">{label}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={handleClose}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${DURATION}ms ease-out`,
        }}
      />

      {/* Modal */}
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
          <h2 className="hero-name uppercase text-2xl md:text-3xl text-black">
            {t('contactForm.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-black hover:opacity-70 transition-opacity duration-300 shrink-0 mt-1 text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-8 space-y-6 overscroll-contain">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                {t('contactForm.firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${inputClass} ${submitted && errors.firstName ? errorBorder : normalBorder}`}
              />
            </div>
            <div>
              <label className={labelClass}>
                {t('contactForm.lastName')}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${inputClass} ${submitted && errors.lastName ? errorBorder : normalBorder}`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              {t('contactForm.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} ${submitted && errors.email ? errorBorder : normalBorder}`}
            />
            {submitted && errors.email && email.trim() && (
              <p className="text-red-400 text-xs mt-1 luxury-body">{t('contactForm.invalidEmail')}</p>
            )}
          </div>

          {/* How heard */}
          <div>
            <label className={labelClass}>
              {t('contactForm.howHeard')}
            </label>
            <div className={radioGroupClass}>
              {HOW_HEARD_KEYS.map((key) => (
                <RadioOption
                  key={key}
                  name="howHeard"
                  value={key}
                  checked={howHeard === key}
                  onChange={setHowHeard}
                  label={t(`contactForm.howHeardOptions.${key}`)}
                />
              ))}
            </div>
            {submitted && errors.howHeard && (
              <p className="text-red-400 text-xs mt-1 luxury-body">{t('contactForm.required')}</p>
            )}
          </div>

          {/* Service */}
          <div>
            <label className={labelClass}>
              {t('contactForm.service')}
            </label>
            <div className={radioGroupClass}>
              {SERVICE_KEYS.map((key) => (
                <RadioOption
                  key={key}
                  name="service"
                  value={key}
                  checked={service === key}
                  onChange={setService}
                  label={t(`contactForm.serviceOptions.${key}`)}
                />
              ))}
            </div>
            {submitted && errors.service && (
              <p className="text-red-400 text-xs mt-1 luxury-body">{t('contactForm.required')}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className={labelClass}>
              {t('contactForm.details')}
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none ${submitted && errors.details ? errorBorder : normalBorder}`}
            />
          </div>

          {/* Budget */}
          <div>
            <label className={labelClass}>
              {t('contactForm.budget')}
            </label>
            <div className={radioGroupClass}>
              {BUDGET_KEYS.map((key) => (
                <RadioOption
                  key={key}
                  name="budget"
                  value={key}
                  checked={budget === key}
                  onChange={setBudget}
                  label={t(`contactForm.budgetOptions.${key}`)}
                />
              ))}
            </div>
            {submitted && errors.budget && (
              <p className="text-red-400 text-xs mt-1 luxury-body">{t('contactForm.required')}</p>
            )}
          </div>

          {/* Services note */}
          <p className="luxury-body text-black/70 text-xs leading-relaxed">
            {t('contactForm.servicesNote')}
          </p>

          {/* Confirm checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <span
              className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                confirmed
                  ? 'border-[#3a171a] bg-[#3a171a]'
                  : submitted && errors.confirmed
                  ? 'border-red-400'
                  : 'border-[#3a171a]/40 group-hover:border-[#3a171a]'
              }`}
            >
              {confirmed && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="text-[var(--milk)]">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="sr-only"
            />
            <span className="luxury-body text-sm text-black">
              {t('contactForm.confirmLabel')}
            </span>
          </label>
          {submitted && errors.confirmed && (
            <p className="text-red-400 text-xs luxury-body -mt-4">{t('contactForm.confirmRequired')}</p>
          )}
        </form>

        {/* Footer */}
        <div
          className="flex-shrink-0 border-t border-border px-8 py-6 flex items-center justify-between gap-4"
          style={{ paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))' }}
        >
          {sendResult === 'success' && (
            <p className="luxury-body text-sm text-green-700">{t('contactForm.success')}</p>
          )}
          {sendResult === 'error' && (
            <p className="luxury-body text-sm text-red-400">{t('contactForm.error')}</p>
          )}
          {!sendResult && <span />}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={sending}
            className="luxury-label-cascadia border border-[#3a171a] text-black px-10 py-3 tracking-[0.2em] transition-all duration-500 hover:bg-[#3a171a] hover:text-[var(--milk)] uppercase disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {sending ? t('contactForm.sending') : t('contactForm.submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
