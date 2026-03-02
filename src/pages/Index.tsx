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
    <main className="overflow-x-hidden">
      <LanguageToggle />
      <Hero />
      <Philosophy />
      <ServicesAndPricing />
      <Process />
      <Experience />
      <Gallery />
      <FinalCTA />

      <footer className="py-12 text-center bg-foreground">
        <p className="luxury-label text-primary-foreground/60">
          © 2025 Margarita Slavich. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Index;
