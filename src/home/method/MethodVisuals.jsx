import { EDGE_CASES, SCALE, RHYTHM_DAYS, formatCount } from './methodData';

const ORB_ORDER = ['learn', 'prove', 'build', 'placed'];

function LearnVisual() {
  return (
    <div className="method-card method-card--board hand">
      <p>COUNT(*) counts every row</p>
      <p>COUNT(tip) skips the empty ones</p>
      <p className="method-card__accent">empty = NULL</p>
    </div>
  );
}

function ProveVisual() {
  return (
    <ul className="method-card method-card--checks" aria-label="Edge cases to test">
      {EDGE_CASES.map((edgeCase) => (
        <li key={edgeCase}>
          <span className="method-check" aria-hidden="true">
            <svg viewBox="0 0 20 20">
              <path d="M5 10.5l3.2 3.2L15 6.5" />
            </svg>
          </span>
          {edgeCase}
        </li>
      ))}
    </ul>
  );
}

function BuildVisual() {
  return (
    <div className="method-card method-card--scale">
      <p className="method-scale__row">
        <span className="method-scale__label">Rows in your table</span>
        <span className="method-scale__value" data-count-from={SCALE.from} data-count-to={SCALE.to}>
          {formatCount(SCALE.to)}
        </span>
      </p>
      <p className="method-scale__row">
        <span className="method-scale__label">Your query</span>
        <span className="method-scale__note">Same one line. Still right.</span>
      </p>
    </div>
  );
}

function PlacedVisual() {
  return (
    <div className="method-card method-card--rhythm">
      <div className="method-rhythm" aria-hidden="true">
        {Array.from({ length: RHYTHM_DAYS }, (_, day) => (
          <span key={day} className={`method-rhythm__day orb orb--${ORB_ORDER[day % ORB_ORDER.length]}`} />
        ))}
      </div>
      <p className="method-rhythm__note">A little every day beats a lot the night before.</p>
    </div>
  );
}

const VISUALS = {
  learn: LearnVisual,
  prove: ProveVisual,
  build: BuildVisual,
  placed: PlacedVisual,
};

export default function StepVisual({ stepKey }) {
  const Visual = VISUALS[stepKey];
  return <Visual />;
}
