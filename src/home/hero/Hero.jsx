import { useRef } from 'react';
import LogoMark from '../shared/LogoMark';
import { MARK } from '../brand';
import HeroNote from './HeroNote';
import useHeroMotion from './useHeroMotion';
import './hero.css';

export default function Hero() {
  const scope = useRef(null);
  const stage = useRef(null);
  useHeroMotion(scope, stage);

  return (
    <header id="top" className="hero" ref={scope}>
      <div className="hero__stage" ref={stage}>
        <LogoMark className="hero__fallback" title={`SAI mark: ${MARK.circles.map((circle) => circle.name).join(', ')}`} />
      </div>
      <div className="hero__grab" aria-hidden="true" />

      <div className="hero__copy">
        <h1 className="hero__title">
          <span className="hero__line">
            <span>Don&rsquo;t worry.</span>
          </span>
          <HeroNote />
        </h1>
        <div className="hero__after">
          <p className="hero__lead">I&rsquo;m SAI, your tech senior. I&rsquo;ll take you from confused to interview-ready.</p>
          <a className="button" href="#join">
            <span className="button__orb orb orb--learn" aria-hidden="true" />
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
