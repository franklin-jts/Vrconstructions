import { useEffect, useRef, useCallback } from 'react';

/**
 * Cinematic scroll reveal system:
 * - IntersectionObserver reveals elements as they enter viewport
 * - Parallax scrolling on [data-parallax] elements
 * - Counter animation on [data-count] elements
 * - Staggered delays for grouped elements
 */
export function useScrollReveal(selector = '.reveal') {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Assign stagger indices per group
    const groups = new Map<string, number>();
    elements.forEach((el) => {
      const group = (el as HTMLElement).dataset.revealGroup || 'default';
      const idx = groups.get(group) || 0;
      groups.set(group, idx + 1);
      (el as HTMLElement).dataset.staggerIndex = String(idx);
    });

    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Immediately reveal visible elements
    elements.forEach((el) => {
      if (isInViewport(el)) {
        const delay = parseInt((el as HTMLElement).dataset.staggerIndex || '0', 10);
        setTimeout(() => el.classList.add('revealed'), delay * 100);
      }
    });

    // Observer for scroll-triggered reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(
              (entry.target as HTMLElement).dataset.staggerIndex || '0',
              10,
            );
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });

    // Fallback
    const fallback = setTimeout(() => {
      elements.forEach((el) => el.classList.add('revealed'));
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [selector]);

  // Parallax + counter scroll handler
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const parallaxEls = root.querySelectorAll<HTMLElement>('[data-parallax]');
    const counterEls = root.querySelectorAll<HTMLElement>('[data-count]');

    // Counter animation state
    const counterAnimated = new WeakSet<Element>();

    const animateCounter = (el: HTMLElement) => {
      if (counterAnimated.has(el)) return;
      counterAnimated.add(el);

      const target = parseInt(el.dataset.count || '0', 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    // Observe counters
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    counterEls.forEach((el) => counterObserver.observe(el));

    // Parallax scroll handler
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax || '0.3');
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
            el.style.transform = `translate3d(0, ${-offset}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      counterObserver.disconnect();
    };
  }, []);

  return rootRef;
}
