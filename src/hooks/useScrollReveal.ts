import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to all elements matching `selector`
 * inside the component. When an element enters the viewport it gets
 * the `revealed` class. Also handles elements already visible on mount.
 */
export function useScrollReveal(selector = '.reveal') {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Assign stagger indices
    elements.forEach((el, i) => {
      (el as HTMLElement).dataset.index = String(i);
    });

    // Check if element is already in viewport
    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    };

    // Immediately reveal elements already in viewport
    elements.forEach((el) => {
      if (isInViewport(el)) {
        // Small delay for stagger effect
        const index = parseInt((el as HTMLElement).dataset.index || '0', 10);
        setTimeout(() => {
          el.classList.add('revealed');
        }, index * 80);
      }
    });

    // Set up observer for elements that scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              (entry.target as HTMLElement).dataset.index || '0',
              10,
            );
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
    );

    elements.forEach((el) => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });

    // Fallback: reveal all elements after 2 seconds in case observer fails
    const fallbackTimer = setTimeout(() => {
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [selector]);

  return rootRef;
}
