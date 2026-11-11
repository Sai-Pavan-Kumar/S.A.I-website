import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import LogoMark from '../shared/LogoMark';
import { MARK } from '../brand';
import { gsap, FULL_MOTION } from '../motion';
import './story.css';

// Labels sit at the far side of each circle, away from the overlaps, where they stay readable.
const LABEL_REACH = 1.42;
// Each circle slides in level from a side edge, never from above or below: coming down from the
// top it crossed the lesson text above. Distance is in mark units, enough to start off-screen.
const ENTER_FROM = { learn: -110, prove: 110, build: 110, placed: -110 };

// Scrolling in, the four circles gather around the empty centre, the student, the names appear, then the board hand
// writes "you" and points at the empty middle.
function useStoryMotion(scope) {
  useGSAP(
    () => {
      gsap.matchMedia().add(FULL_MOTION, () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: '.story__figure', start: 'top 80%', end: 'center 45%', scrub: 0.8 },
        });
        MARK.circles.forEach((circle) => {
          timeline.from(`.mark__circle--${circle.key}`, { x: ENTER_FROM[circle.key], opacity: 0, ease: 'power3.out' }, 0);
        });
        timeline.from('.story__you-word', { autoAlpha: 0 }, 0.75)
          .from('.story__you-arrow', { strokeDashoffset: 1, ease: 'none' }, 0.8);
        // Names play once and finish, so a reader who stops scrolling never sees them half-faded.
        gsap.from('.story__label', {
          autoAlpha: 0,
          scale: 0.6,
          transformOrigin: 'center',
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.story__figure', start: 'top 55%', once: true },
        });
      });
    },
    { scope },
  );
}

function Annotation() {
  return (
    <svg className="story__annotation" viewBox="-48 -48 96 96" aria-hidden="true">
      {/* A soft dark halo behind each label, so white text reads on every colour, even the light yellow. */}
      <defs>
        <filter id="story-label-shade" x="-20%" y="-60%" width="140%" height="220%">
          <feDropShadow dx="0" dy="0.3" stdDeviation="0.9" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>
      {MARK.circles.map((circle) => (
        <text key={circle.key} className={`story__label story__label--${circle.key}`} x={circle.x * LABEL_REACH} y={circle.y * LABEL_REACH + 2} textAnchor="middle">
          {circle.name}
        </text>
      ))}
      <text className="story__you-word hand" x="31" y="-36">
        you
      </text>
      <path className="story__you-arrow" d="M30 -33 C 22 -26, 14 -16, 4.5 -4.5 M4.5 -4.5 L 5.2 -10 M4.5 -4.5 L 10 -5.6" pathLength="1" />
    </svg>
  );
}

export default function Story() {
  const scope = useRef(null);
  useStoryMotion(scope);

  return (
    <section id="story" className="story" ref={scope} aria-labelledby="story-title">
      <figure className="story__figure">
        <LogoMark className="story__mark" title="The SAI mark: Learn, Prove, Build and Get placed around an open centre" />
        <Annotation />
      </figure>

      <div className="story__text">
        <h2 id="story-title" data-rise>
          {/* Broken by meaning, not by width: a lone "you." on its own line reads as an accident. */}
          I&rsquo;m here
          <br />
          for you.
        </h2>
        <p className="story__lead">
          Learning tech alone is hard. Paused videos, copied notes, answers that never made sense.
        </p>
        <p>I&rsquo;ll sit with you, draw it out, and explain it again until it clicks.</p>
      </div>
    </section>
  );
}
