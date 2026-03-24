import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface FaqState {
  isOpen: boolean;
  openFaq: () => void;
  closeFaq: () => void;
}

const FaqContext = createContext<FaqState | null>(null);

export const FaqProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFaq = useCallback(() => setIsOpen(true), []);
  const closeFaq = useCallback(() => setIsOpen(false), []);

  return (
    <FaqContext.Provider value={{ isOpen, openFaq, closeFaq }}>
      {children}
    </FaqContext.Provider>
  );
};

export const useFaq = () => {
  const ctx = useContext(FaqContext);
  if (!ctx) throw new Error('useFaq must be used within FaqProvider');
  return ctx;
};
