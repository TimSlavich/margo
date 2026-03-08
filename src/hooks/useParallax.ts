import { useEffect, useRef } from 'react';

export const useParallax = (speed = 0.2, yOffset = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed + yOffset;
      el.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [speed]);

  return ref;
};
