import { useEffect, useState } from 'react';

/**
 * Returns scroll progress as a value between 0 and 1.
 * Used for the construction progress bar that fills as you scroll.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
          setProgress(Math.min(Math.max(scrollPercent, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
