import { ReactNode } from 'react';

const EMAIL = 'slavich.margarita@gmail.com';

interface EmailLinkProps {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  service?: string;
}

const buildMailto = (service?: string) => {
  const subject = service
    ? `Inquiry — ${service}`
    : 'Style Consultation Inquiry';

  const body = service
    ? [
        `Hello, Margo!`,
        ``,
        `I am interested in your "${service}" service.`,
        ``,
        `My name: `,
        `Whatsapp / Telegram: `,
        ``,
        `Details / questions:`,
        ``,
        ``,
        `Best regards,`,
      ].join('\n')
    : [
        `Hello, Margo!`,
        ``,
        `My name: `,
        `Whatsapp / Telegram: `,
        ``,
        `I'd like to discuss:`,
        ``,
        ``,
        `Best regards,`,
      ].join('\n');

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const EmailLink = ({ className, style, children, service }: EmailLinkProps) => {
  const handleClick = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
  };

  return (
    <a
      href={buildMailto(service)}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export default EmailLink;
