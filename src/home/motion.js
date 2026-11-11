import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const FULL_MOTION = '(prefers-reduced-motion: no-preference)';
export const WIDE_FULL_MOTION = '(prefers-reduced-motion: no-preference) and (min-width: 900px)';

// Lenis gives the page its weighted, unhurried scroll; GSAP's ticker drives it so
// ScrollTrigger and the smooth scroll always agree about where the page is.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return undefined;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      const target = link && document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

// Headings rise line by line out of a mask as they enter. SplitText re-splits on resize,
// and keeps the original text for screen readers.
export function riseOnEnter(element, { delay = 0, start = 'top 90%' } = {}) {
  return SplitText.create(element, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.1,
        delay,
        ease: 'power4.out',
        stagger: 0.09,
        scrollTrigger: { trigger: element, start, once: true },
      }),
  });
}

export { gsap, ScrollTrigger, SplitText };
