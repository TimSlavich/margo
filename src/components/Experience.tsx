import experienceImage from '@/assets/experience.png';
import { useParallax } from '@/hooks/useParallax';

const Experience = () => {
  const bgRef = useParallax(0.2);

  return (
    <section id="experience" className="relative py-40 md:py-60 lg:py-80 overflow-hidden" style={{ backgroundColor: '#1a0a0b' }}>
      <div
        ref={bgRef}
        className="parallax-bg"
        style={{ backgroundImage: `url(${experienceImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>
    </section>
  );
};

export default Experience;
