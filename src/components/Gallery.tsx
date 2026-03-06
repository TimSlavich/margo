import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import galleryTestimonial1 from '@/assets/gallery-testimonial-1.png';
import galleryTestimonial2 from '@/assets/gallery-testimonial-2.png';
import galleryTestimonial3 from '@/assets/gallery-testimonial-3.png';
import galleryTestimonial4 from '@/assets/gallery-testimonial-4.png';
import galleryTestimonial5 from '@/assets/gallery-testimonial-5.png';
import galleryTestimonial6 from '@/assets/gallery-testimonial-6.png';
import galleryTestimonial7 from '@/assets/gallery-testimonial-7.jpg';
import galleryTestimonial8 from '@/assets/gallery-testimonial-8.png';
import galleryTestimonial9 from '@/assets/gallery-testimonial-9.png';
import galleryTestimonial10 from '@/assets/gallery-testimonial-10.png';

const testimonials = [
  { src: galleryTestimonial1, alt: 'Client testimonial' },
  { src: galleryTestimonial2, alt: 'Client feedback' },
  { src: galleryTestimonial3, alt: 'Client testimonial' },
  { src: galleryTestimonial4, alt: 'Client testimonial' },
  { src: galleryTestimonial5, alt: 'Client testimonial' },
  { src: galleryTestimonial6, alt: 'Client testimonial' },
  { src: galleryTestimonial8, alt: 'Client testimonial' },
];

const capsules = [
  { src: galleryTestimonial7, alt: 'Capsule wardrobe — versatile outfits' },
  { src: galleryTestimonial9, alt: 'Capsule wardrobe — office mood' },
  { src: galleryTestimonial10, alt: 'Capsule wardrobe — curated essentials' },
];

const matrix3x3 = [
  [capsules[0], testimonials[0], testimonials[1]],
  [testimonials[2], capsules[1], testimonials[3]],
  [testimonials[6], testimonials[5], capsules[2]],
];

const allItems = [...matrix3x3.flat(), testimonials[4]];

const GalleryImage = ({ src, alt, className, delay }: { src: string; alt: string; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1, delay ?? 0);
  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? 'visible' : ''} overflow-hidden rounded-sm flex items-center justify-center p-2 sm:p-3 ${className ?? ''}`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
      />
    </div>
  );
};

const Gallery = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const n = allItems.length;

  const prevIndex = (activeIndex - 1 + n) % n;
  const nextIndex = (activeIndex + 1) % n;

  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + n) % n), [n]);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff < -40) goNext();
    else if (diff > 40) goPrev();
    setTouchStart(null);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 px-0 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: 'var(--milk)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="luxury-label text-black mb-10 sm:mb-12 md:mb-16 text-center px-4">{t('gallery.label')}</p>

        <div
          className="md:hidden relative flex items-center justify-center gap-2 sm:gap-3 px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-black/70 hover:text-black hover:bg-white/50 transition-colors"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex-shrink-0 w-[20%] sm:w-[22%] aspect-[3/4] rounded-sm overflow-hidden opacity-80">
            <GalleryImage
              src={allItems[prevIndex].src}
              alt={allItems[prevIndex].alt}
              className="h-full w-full"
              delay={0}
            />
          </div>
          <div className="flex-shrink-0 w-[52%] sm:w-[48%] aspect-[3/4] rounded-sm overflow-hidden shadow-lg">
            <GalleryImage
              src={allItems[activeIndex].src}
              alt={allItems[activeIndex].alt}
              className="h-full w-full"
              delay={0}
            />
          </div>
          <div className="flex-shrink-0 w-[20%] sm:w-[22%] aspect-[3/4] rounded-sm overflow-hidden opacity-80">
            <GalleryImage
              src={allItems[nextIndex].src}
              alt={allItems[nextIndex].alt}
              className="h-full w-full"
              delay={0}
            />
          </div>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-black/70 hover:text-black hover:bg-white/50 transition-colors"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {matrix3x3.map((row, ri) =>
              row.map((item, ci) => (
                <GalleryImage
                  key={`${ri}-${ci}`}
                  src={item.src}
                  alt={item.alt}
                  className="min-h-[220px] lg:min-h-[300px]"
                  delay={(ri * 3 + ci) * 50}
                />
              ))
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <GalleryImage
              src={testimonials[4].src}
              alt={testimonials[4].alt}
              className="min-h-[160px] lg:min-h-[180px] w-full max-w-md"
              delay={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
