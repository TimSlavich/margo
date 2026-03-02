import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';

const GalleryImage = ({ src, alt, className, delay }: { src: string; alt: string; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1, delay);
  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? 'visible' : ''} overflow-hidden ${className ?? ''}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
      />
    </div>
  );
};

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="bg-primary text-primary-foreground py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="luxury-label text-primary-foreground/80 mb-16 text-center">{t('gallery.label')}</p>

        <div className="hidden md:grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-3">
            <GalleryImage src={gallery1} alt="Styling session" className="h-[480px]" delay={0} />
            <GalleryImage src={gallery3} alt="Style detail" className="h-[320px]" delay={100} />
          </div>
          <div className="flex flex-col gap-3">
            <GalleryImage src={gallery2} alt="Wardrobe editorial" className="h-[800px]" delay={150} />
          </div>
          <div className="flex flex-col gap-3">
            <GalleryImage src={gallery4} alt="Street style" className="h-[420px]" delay={50} />
            <GalleryImage src={gallery5} alt="Margarita Slavich" className="h-[380px]" delay={250} />
          </div>
        </div>

        <div className="md:hidden grid grid-cols-2 gap-2">
          <GalleryImage src={gallery1} alt="Styling session" className="h-[240px]" delay={0} />
          <GalleryImage src={gallery4} alt="Street style" className="h-[240px]" delay={50} />
          <GalleryImage src={gallery2} alt="Wardrobe editorial" className="col-span-2 h-[300px]" delay={100} />
          <GalleryImage src={gallery3} alt="Style detail" className="h-[200px]" delay={150} />
          <GalleryImage src={gallery5} alt="Margarita Slavich" className="h-[200px]" delay={200} />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
