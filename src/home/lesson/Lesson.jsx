import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../motion';
import { QUERIES } from '../../site/lesson/lessonData';
import LessonBoard from './LessonBoard';
import './lesson.css';

// lessonData keeps the old site's colour names; here each query wears one of the mark's circles.
const ORB_FOR_DISC = { 'var(--teal)': 'prove', 'var(--amber)': 'build', 'var(--coral)': 'placed', 'var(--night)': 'learn' };

function QueryPicker({ activeId, onSelect }) {
  return (
    <ul className="lesson__queries" aria-label="Pick a query">
      {QUERIES.map((query) => (
        <li key={query.id}>
          <button
            type="button"
            aria-pressed={query.id === activeId}
            onClick={() => onSelect(query.id)}
          >
            <span className={`lesson__orb orb orb--${ORB_FOR_DISC[query.disc]}`} aria-hidden="true" />
            <span className="lesson__query-text">
              <code>{query.label}</code>
              {query.note && <span className="lesson__note">{query.note}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// The pen marks wait until the board is actually in view; drawn on page load, nobody would see them.
function useSeenOnce(ref) {
  const [seen, setSeen] = useState(false);
  useGSAP(() => {
    ScrollTrigger.create({ trigger: ref.current, start: 'top 70%', once: true, onEnter: () => setSeen(true) });
  });
  return seen;
}

export default function Lesson() {
  const [activeId, setActiveId] = useState(QUERIES[1].id);
  const query = QUERIES.find((candidate) => candidate.id === activeId);
  const body = useRef(null);
  const seen = useSeenOnce(body);

  return (
    <section id="lesson" className="lesson" aria-labelledby="lesson-title">
      <div className="section-head lesson__head">
        <span className="kicker-orb orb orb--build" aria-hidden="true" />
        <h2 id="lesson-title" data-rise>
          Try one with me.
        </h2>
        <p>Five orders. One table. A trap that catches people in interviews. Pick a query.</p>
      </div>

      <div className="lesson__body" ref={body}>
        <LessonBoard query={query} marked={seen} />
        <div className="lesson__side">
          <QueryPicker activeId={activeId} onSelect={setActiveId} />
          <div className="lesson__explain" aria-live="polite">
            <p className={`lesson__result hand orb-ink--${ORB_FOR_DISC[query.disc]}`}>{query.result}</p>
            <p key={query.id} className="lesson__line">
              {query.line}
            </p>
            <p className="lesson__proof">Every answer here was run on SQLite 3.50.4.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
