import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (CSS.supports('animation-timeline: view()') && CSS.supports('animation-range: entry 0% exit 100%')) return;
    if (!('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const sections = document.querySelectorAll('[data-scroll-reveal]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute('data-scroll-visible', entry.isIntersecting);
      }
    });

    sections.forEach((section) => observer.observe(section));
    root.setAttribute('data-scroll-fallback', '');

    return () => {
      observer.disconnect();
      root.removeAttribute('data-scroll-fallback');
      sections.forEach((section) => section.removeAttribute('data-scroll-visible'));
    };
  }, []);
}
