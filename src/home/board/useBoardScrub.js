import { useEffect, useState } from 'react';
import { gsap, ScrollTrigger, FULL_MOTION, REDUCED_MOTION, WIDE_FULL_MOTION } from '../motion';
import { buildBoardPlan } from './boardScript';
import { HAND_FONT } from './penWriting';
import { inkTo } from './inkTo';

const WIDE_QUERY = '(min-width: 900px)';

function planForScreen() {
  return buildBoardPlan(window.matchMedia(WIDE_QUERY).matches ? 'wide' : 'narrow');
}

// Letters can only be traced once Gaegu itself is loaded; a fallback font would be traced instead.
// makePlan must be stable (defined outside the component), or the plan is rebuilt every render.
export function useHandPlan(makePlan) {
  const [plan, setPlan] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    document.fonts
      .load(HAND_FONT)
      .then(() => {
        if (cancelled) return;
        if (!document.fonts.check(HAND_FONT)) throw new Error('Gaegu did not load');
        setPlan(makePlan());
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [makePlan]);
  return { plan, failed };
}

export function useBoardPlan() {
  return useHandPlan(planForScreen);
}

// Scroll is the pen: the lesson is written as the reader moves through it, and unwritten when they
// scroll back. Wide screens pin the board; phones write it as it passes, which keeps scrolling honest.
export function useBoardScrub(scopeRef, plan) {
  useEffect(() => {
    const scope = scopeRef.current;
    const svg = scope?.querySelector('.board__ink');
    if (!svg || !plan) return undefined;
    const write = (progress) => inkTo(svg, plan, progress);
    const media = gsap.matchMedia();
    media.add(REDUCED_MOTION, () => write(1));
    media.add(WIDE_FULL_MOTION, () => {
      write(0);
      ScrollTrigger.create({
        trigger: scope.querySelector('.board__stage'),
        start: 'center center',
        end: '+=190%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => write(self.progress),
      });
    });
    media.add(`${FULL_MOTION} and (max-width: 899px)`, () => {
      write(0);
      ScrollTrigger.create({
        trigger: svg,
        start: 'top 85%',
        end: 'bottom 35%',
        scrub: 0.5,
        onUpdate: (self) => write(self.progress),
      });
    });
    // The plan arrives after the font, so this trigger is born after the ones below it on the page.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => media.revert();
  }, [scopeRef, plan]);
}
