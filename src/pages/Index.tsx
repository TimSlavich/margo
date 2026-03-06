import LanguageToggle from '@/components/LanguageToggle';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import ServicesAndPricing from '@/components/ServicesAndPricing';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import Gallery from '@/components/Gallery';
import FinalCTA from '@/components/FinalCTA';

const Index = () => {
  return (
    <main>
      <LanguageToggle />
      <Hero />
      <Philosophy />
      <ServicesAndPricing />
      <Process />
      <Experience />
      <Gallery />
      <FinalCTA />

      <footer className="py-12 text-center" style={{ backgroundColor: '#3a171a' }}>
        <p className="luxury-label" style={{ color: 'var(--milk)', opacity: 0.9 }}>
          © 2025 Margarita Slavich. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Index;
