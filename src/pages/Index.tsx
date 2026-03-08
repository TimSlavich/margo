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
  return (
    <main style={{ overflowX: 'clip' }}>
      <BurgerMenu />
      <LanguageToggle />
      <Hero />
      <Philosophy />
      <ServicesAndPricing />
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
