import { useLayoutEffect, useRef } from 'react';
import BoardInk from '../board/BoardInk';
import { buildNotePlan } from '../board/boardScript';
import { inkTo } from '../board/inkTo';
import { useHandPlan } from '../board/useBoardScrub';
import { gsap, REDUCED_MOTION } from '../motion';

const NOTE = "I've got you.";
// Raster size of the note; the SVG is then scaled by CSS to sit with the headline.
const NOTE_SIZE = 160;
const makeNotePlan = () => buildNotePlan(NOTE, NOTE_SIZE, '#0636d9');

// The reassurance is handwritten by SAI in blue pen, with the same strokes the board uses,
// so the first thing a visitor sees is a senior writing to them.
export default function HeroNote() {
  const holder = useRef(null);
  const { plan, failed } = useHandPlan(makeNotePlan);

  useLayoutEffect(() => {
    const svg = holder.current?.querySelector('svg');
    if (!svg || !plan) return undefined;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      inkTo(svg, plan, 1);
      return undefined;
    }
    const pen = { progress: 0 };
    inkTo(svg, plan, 0);
    const tween = gsap.to(pen, {
      progress: 1,
      duration: 2.2,
      delay: 0.9,
      ease: 'power1.inOut',
      onUpdate: () => inkTo(svg, plan, pen.progress),
    });
    return () => tween.kill();
  }, [plan]);

  return (
    <span className="hero__note">
      <span className="visually-hidden">{NOTE}</span>
      <span className="hero__note-ink" ref={holder} aria-hidden="true">
        {plan && <BoardInk plan={plan} label={NOTE} />}
        {failed && <span className="hand">{NOTE}</span>}
      </span>
    </span>
  );
}
