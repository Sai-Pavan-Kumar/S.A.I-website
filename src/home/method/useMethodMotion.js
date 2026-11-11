import { useGSAP } from '@gsap/react';
import { gsap, FULL_MOTION, WIDE_FULL_MOTION } from '../motion';
import { formatCount } from './methodData';

// Each panel's small proof plays when its circle comes into view: ticks land, numbers race, days fill.
function playVisuals(panel, trigger) {
  const checks = panel.querySelectorAll('.method-check');
  if (checks.length) {
    gsap.from(checks, { scale: 0, rotate: -40, duration: 0.6, stagger: 0.18, ease: 'back.out(2.4)', scrollTrigger: trigger });
  }
  panel.querySelectorAll('[data-count-to]').forEach((element) => {
    const counter = { value: Number(element.dataset.countFrom) };
    gsap.to(counter, {
      value: Number(element.dataset.countTo),
      duration: 1.8,
      ease: 'expo.in',
      scrollTrigger: trigger,
      onStart: () => (element.textContent = formatCount(Number(element.dataset.countFrom))),
      onUpdate: () => (element.textContent = formatCount(Math.round(counter.value))),
    });
  });
  const days = panel.querySelectorAll('.method-rhythm__day');
  if (days.length) {
    gsap.from(days, { scale: 0, duration: 0.5, stagger: 0.035, ease: 'back.out(2)', scrollTrigger: trigger });
  }
  const boardLines = panel.querySelectorAll('.method-card--board p');
  if (boardLines.length) {
    gsap.from(boardLines, { clipPath: 'inset(0 100% 0 0)', duration: 0.9, stagger: 0.35, ease: 'power2.inOut', scrollTrigger: trigger });
  }
}

// Wide screens: the page stops and the four circles travel past sideways, each turning as it goes.
function sideways(scope) {
  const track = scope.querySelector('.method__track');
  const distance = () => track.scrollWidth - window.innerWidth;
  const travel = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: scope.querySelector('.method__pin'),
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
  scope.querySelectorAll('.method__panel').forEach((panel) => {
    gsap.fromTo(
      panel.querySelector('.method__orb'),
      { rotate: -24, scale: 0.84 },
      { rotate: 12, scale: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: travel, start: 'left right', end: 'right left', scrub: true } },
    );
    playVisuals(panel, { trigger: panel, containerAnimation: travel, start: 'left 55%', once: true });
  });
}

// Phones: the panels stack, and each circle swells in as it scrolls up.
function stacked(scope) {
  scope.querySelectorAll('.method__panel').forEach((panel) => {
    gsap.from(panel.querySelector('.method__orb'), {
      scale: 0.6,
      rotate: -24,
      ease: 'none',
      scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 30%', scrub: true },
    });
    playVisuals(panel, { trigger: panel, start: 'top 55%', once: true });
  });
}

export default function useMethodMotion(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: FULL_MOTION, wide: WIDE_FULL_MOTION }, (context) => {
        if (!context.conditions.motion) return;
        if (context.conditions.wide) sideways(scope.current);
        else stacked(scope.current);
      });
    },
    { scope },
  );
}
