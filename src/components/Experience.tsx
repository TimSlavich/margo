import experienceImage from '@/assets/experience.png';

const Experience = () => (
  <section className="relative py-40 md:py-60 lg:py-80 overflow-hidden">
    <div
      className="absolute inset-0 parallax-bg"
      style={{ backgroundImage: `url(${experienceImage})` }}
    >
      <div className="absolute inset-0 bg-foreground/50" />
    </div>
  </section>
);

export default Experience;
