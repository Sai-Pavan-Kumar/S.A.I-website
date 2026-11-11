import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
// Base styles first, so every section's own rules can override the shared ones.
import './home.css';
import Nav from './nav/Nav';
import Hero from './hero/Hero';
import Method from './method/Method';
import Board from './board/Board';
import Lesson from './lesson/Lesson';
import Story from './story/Story';
import Letter from './letter/Letter';
import Faq from './faq/Faq';
import Join from './join/Join';
import Footer from './footer/Footer';
import MarkFlight from './flight/MarkFlight';
import { gsap, useSmoothScroll, riseOnEnter, FULL_MOTION } from './motion';

export default function Home() {
  const scope = useRef(null);
  useSmoothScroll();
  useGSAP(
    () => {
      gsap.matchMedia().add(FULL_MOTION, () => {
        const splits = gsap.utils.toArray('[data-rise]').map((heading) => riseOnEnter(heading));
        return () => splits.forEach((split) => split.revert());
      });
    },
    { scope },
  );

  return (
    <div className="home" ref={scope}>
      <div className="home__texture" aria-hidden="true" />
      <Nav />
      <Hero />
      <main>
        <Method />
        <Board />
        <Lesson />
        <Story />
        <Letter />
        <Faq />
        <Join />
      </main>
      <Footer />
      {/* Last, so its scroll trigger is measured after every section's pin is in place. */}
      <MarkFlight />
    </div>
  );
}
