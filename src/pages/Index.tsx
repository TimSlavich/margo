import { useState } from 'react';
import LanguageToggle from '@/components/LanguageToggle';
import BurgerMenu from '@/components/BurgerMenu';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import ServicesAndPricing from '@/components/ServicesAndPricing';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import Gallery from '@/components/Gallery';
import FinalCTA from '@/components/FinalCTA';

const Index = () => {
  const [modalKey, setModalKey] = useState<string | null>(null);

  return (
    <main style={{ overflowX: 'clip' }}>
      <BurgerMenu isModalOpen={!!modalKey} />
      <LanguageToggle />
      <Hero />
      <Philosophy />
      <ServicesAndPricing modalKey={modalKey} setModalKey={setModalKey} />
      <Process />
      <Experience />
      <Gallery />
      <FinalCTA />

      <footer className="py-4 text-center" style={{ backgroundColor: '#3a171a' }}>
        <p className="luxury-body text-sm sm:text-base" style={{ color: 'var(--milk)', letterSpacing: '0.06em', textTransform: 'lowercase' }}>
          © 2025 Margarita Slavich. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Index;
