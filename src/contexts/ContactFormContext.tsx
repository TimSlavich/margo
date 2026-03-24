import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ContactFormState {
  isOpen: boolean;
  preselectedService?: string;
  openForm: (service?: string) => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormState | null>(null);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();

  const openForm = useCallback((service?: string) => {
    setPreselectedService(service);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    setPreselectedService(undefined);
  }, []);

  return (
    <ContactFormContext.Provider value={{ isOpen, preselectedService, openForm, closeForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const ctx = useContext(ContactFormContext);
  if (!ctx) throw new Error('useContactForm must be used within ContactFormProvider');
  return ctx;
};
