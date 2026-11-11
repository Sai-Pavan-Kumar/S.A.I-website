import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, FULL_MOTION } from '../motion';
import WaitlistForm from './WaitlistForm';
import './join.css';

// Each circle drifts at its own depth, so the four of them seem to gather round the form.
// The top circles only ever drift upward from below their place, so they never ride up into the FAQ.
const DRIFT = { learn: 220, prove: 140, build: -120, placed: 200 };

export default function Join() {
  const scope = useRef(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(FULL_MOTION, () => {
        Object.entries(DRIFT).forEach(([key, distance]) => {
          gsap.fromTo(
            `.signup__orb--${key}`,
            { y: distance, rotate: -20 },
            { y: -distance * 0.4, rotate: 15, ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });
      });
    },
    { scope },
  );

  return (
    <section id="join" className="signup" ref={scope} aria-labelledby="signup-title">
      {Object.keys(DRIFT).map((key) => (
        <span key={key} className={`signup__orb signup__orb--${key} orb orb--${key}`} aria-hidden="true" />
      ))}
      <div className="signup__content">
        <h2 id="signup-title" data-rise>
          Save your seat.
        </h2>
        <p className="signup__lead">I&rsquo;m not live yet. Leave your email and I&rsquo;ll write once, when I&rsquo;m ready for you. It&rsquo;s free.</p>
        <WaitlistForm />
      </div>
    </section>
  );
}
