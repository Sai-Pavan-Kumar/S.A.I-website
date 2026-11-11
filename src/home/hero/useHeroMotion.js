import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, FULL_MOTION, WIDE_FULL_MOTION } from '../motion';
import { createOrbField, supportsWebGL } from './orbField';
import { markState } from '../flight/markState';

// Starts the live mark and keeps it drawing only while the hero is on screen.
function startField(stage, scope) {
  const field = createOrbField(stage);
  stage.classList.add('is-live');
  const tick = (time) => field.render(time);
  const visibility = ScrollTrigger.create({
    trigger: scope,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
  });
  gsap.ticker.add(tick);

  const onMove = (event) => field.setPointer(event.clientX, event.clientY);
  window.addEventListener('pointermove', onMove);
  document.documentElement.addEventListener('pointerleave', field.releasePointer);
  const observer = new ResizeObserver(field.resize);
  observer.observe(stage);

  const stop = () => {
    visibility.kill();
    gsap.ticker.remove(tick);
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', field.releasePointer);
    observer.disconnect();
    field.destroy();
    stage.classList.remove('is-live');
  };
  return { field, stop };
}

// Any circle can be pulled and flicked. Touch keeps vertical scrolling (touch-action: pan-y), so a
// sideways pull plays with the mark and an up-down swipe still scrolls the page.
function makeGrabbable(field, grab) {
  let holding = false;
  const onDown = (event) => {
    if (!field.grabAt(event.clientX, event.clientY)) return;
    holding = true;
    grab.classList.add('is-dragging');
    // Capture keeps the drag alive when the pointer leaves the mark; if a browser refuses it, the drag still works inside.
    try {
      grab.setPointerCapture(event.pointerId);
    } catch {
      /* capture is a nicety, not a requirement */
    }
  };
  const onMove = (event) => holding && field.dragTo(event.clientX, event.clientY);
  const onUp = () => {
    if (!holding) return;
    holding = false;
    field.release();
    grab.classList.remove('is-dragging');
  };
  grab.addEventListener('pointerdown', onDown);
  grab.addEventListener('pointermove', onMove);
  grab.addEventListener('pointerup', onUp);
  grab.addEventListener('pointercancel', onUp);
  return () => {
    grab.removeEventListener('pointerdown', onDown);
    grab.removeEventListener('pointermove', onMove);
    grab.removeEventListener('pointerup', onUp);
    grab.removeEventListener('pointercancel', onUp);
  };
}

// The mark grows circle by circle, the way the logo was built, and the words rise in after it.
function arrive(field) {
  field.state.grow.forEach((_, index) => {
    gsap.to(field.state.grow, { [index]: 1, duration: 1.6, delay: 0.15 + index * 0.14, ease: 'elastic.out(1, 0.72)' });
  });
  gsap.from('.hero__line > span', { yPercent: 115, duration: 1.2, delay: 0.35, stagger: 0.08, ease: 'power4.out' });
  gsap.from('.hero__after > *', { autoAlpha: 0, y: 24, duration: 1, delay: 1.4, stagger: 0.1, ease: 'power3.out' });
}

// Scrolling on, the circles part and the hollow centre opens, as if the mark makes room for you.
// The pin is short and the circles stay drawn, so the next section follows without an empty screen.
function partOnScroll(field, scope, pin) {
  gsap
    .timeline({ scrollTrigger: { trigger: scope, start: 'top top', end: pin ? '+=50%' : 'bottom top', scrub: 1, pin } })
    // A quarter turn: each circle rolls into its neighbour's place, the mark never changes size.
    .to(field.state, { spin: Math.PI / 2, ease: 'power1.inOut', onUpdate: () => (markState.spin = field.state.spin) }, 0);
}

export default function useHeroMotion(scope, stageRef) {
  useGSAP(
    () => {
      if (!supportsWebGL()) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: FULL_MOTION, wide: WIDE_FULL_MOTION }, (context) => {
        if (!context.conditions.motion) return undefined;
        const { field, stop } = startField(stageRef.current, scope.current);
        const letGo = makeGrabbable(field, scope.current.querySelector('.hero__grab'));
        arrive(field);
        partOnScroll(field, scope.current, context.conditions.wide);
        return () => {
          letGo();
          stop();
        };
      });
    },
    { scope },
  );
}
