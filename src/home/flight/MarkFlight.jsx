import { useRef } from 'react';
import { MARK } from '../brand';
import useMarkFlight from './useMarkFlight';
import './flight.css';

// The hero's flower, carried down the page: it docks in a corner, and each step of the method
// pulls its own circle out of it. Purely visual, so hidden from assistive technology.
export default function MarkFlight() {
  const layer = useRef(null);
  useMarkFlight(layer);

  return (
    <div className="flight" ref={layer} aria-hidden="true">
      <span className="flight__disc" />
      <div className="flight__flower">
        {MARK.circles.map((circle) => (
          <span key={circle.key} className={`flight__petal orb orb--${circle.key}`} data-key={circle.key} />
        ))}
      </div>
      {MARK.circles.map((circle) => (
        <span key={circle.key} className={`flight__flyer orb orb--${circle.key}`} data-key={circle.key} />
      ))}
    </div>
  );
}
