import { useState } from 'react';
import { QUERIES } from './lessonData';
import OrdersBoard from './OrdersBoard';
import './lesson.css';

function QueryList({ activeId, onSelect }) {
  return (
    <ul className="lesson__queries" aria-label="Pick a query">
      {QUERIES.map((query) => (
        <li key={query.id}>
          <button
            type="button"
            aria-pressed={query.id === activeId}
            onClick={() => onSelect(query.id)}
            onMouseEnter={() => onSelect(query.id)}
            onFocus={() => onSelect(query.id)}
          >
            <code>{query.label}</code>
            {query.note && <span className="lesson__note"> {query.note}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Lesson() {
  const [activeId, setActiveId] = useState(QUERIES[1].id);
  const query = QUERIES.find((candidate) => candidate.id === activeId);

  return (
    <section id="lesson" className="lesson" aria-labelledby="lesson-title">
      <div className="lesson__stage">
        <div className="lesson__disc" style={{ background: query.disc }} aria-hidden="true" />
        <OrdersBoard query={query} />
      </div>

      <div className="lesson__index">
        <h2 id="lesson-title" data-reveal>Try one lesson</h2>
        <p className="lesson__how" data-reveal style={{ '--reveal-index': 1 }}>
          Five rows, one table, the trap from lesson one. Pick a query.
        </p>
        <QueryList activeId={activeId} onSelect={setActiveId} />
      </div>

      <div className="lesson__fact" aria-live="polite">
        <p className="lesson__answer">{query.result}</p>
        <blockquote key={query.id}>
          <p>“{query.line}”</p>
        </blockquote>
        <p className="lesson__proof">Sai Anna, in lesson one. Every answer was run on SQLite 3.50.4.</p>
      </div>
    </section>
  );
}
