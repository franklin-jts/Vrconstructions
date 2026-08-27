import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to all elements matching `selector`
 * inside the component. When an element enters the viewport it gets
 * the `revealed` class and a data-index attribute for stagger delays.
 */
export function useScrollReveal(selector = '.reveal') {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(selector);
    elements.forEach((el, i) => {
      (el as HTMLElement).dataset.index = String(i);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  return rootRef;
}
