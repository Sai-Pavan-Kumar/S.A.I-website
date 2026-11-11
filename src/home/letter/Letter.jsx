import { useRef, useState } from 'react';
import './letter.css';

// The one place the page stops being SAI and becomes the person who built it, writing to juniors
// the way an elder brother would. No name on purpose: the site never names its founders.
const PARAGRAPHS = [
  'We all have big dreams. A good job. A better life for our family. Something to be proud of.',
  'But dreams alone don’t take us there. We need discipline, and we need someone to hold our hand until we reach the goal. With a senior beside you, you can do so much more.',
  'I didn’t have that. During my studies there was no senior to guide me. I struggled a lot, alone, often not knowing what to learn next or why I was stuck.',
  'I don’t want you to go through that. You are my younger brother, my younger sister. So I built SAI: your Senior, powered by Artificial Intelligence. It explains things simply, helps you stay on track, and stays with you until you reach your goal.',
  'You bring the dream. I’ll be the hand that keeps you going.',
];

function Envelope({ isOpen, onOpen, sealRef }) {
  return (
    <div className="envelope" aria-hidden={isOpen}>
      <div className="envelope__back" />
      <div className="envelope__peek" />
      <div className="envelope__front" />
      <div className="envelope__flap" />
      <button ref={sealRef} type="button" className="envelope__seal" onClick={onOpen} aria-expanded={isOpen} aria-controls="letter-sheet" disabled={isOpen}>
        <span className="envelope__seal-orb orb orb--placed" aria-hidden="true" />
        <span className="envelope__seal-text">{isOpen ? 'Opened' : 'Open the letter'}</span>
      </button>
    </div>
  );
}

export default function Letter() {
  // Opened only by the reader's own hand: a letter that opens itself is not a letter.
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const sealRef = useRef(null);
  const open = () => setIsOpen(true);
  // Folding it back from the bottom of a long letter would leave the reader in empty space:
  // bring them back up to the envelope, and hand focus back to the seal.
  const close = () => {
    setIsOpen(false);
    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(() => sealRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section ref={sectionRef} id="letter" className={`letter${isOpen ? ' is-open' : ''}`} aria-labelledby="letter-title">
      <h2 id="letter-title" className="letter__kicker">
        A letter from your senior brother
      </h2>
      <div className="letter__envelope-slot">
        <Envelope isOpen={isOpen} onOpen={open} sealRef={sealRef} />
      </div>
      <div className="letter__reveal">
        <div className="letter__reveal-inner">
          <article className="letter__sheet" id="letter-sheet" inert={!isOpen}>
            <p className="letter__greeting hand">Dear junior,</p>
            {PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className="letter__sign hand">Your senior brother</p>
            <button type="button" className="letter__close" onClick={close}>
              Fold the letter back
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
