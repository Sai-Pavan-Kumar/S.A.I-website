import { useRef } from 'react';
import { STEPS } from './methodData';
import StepVisual from './MethodVisuals';
import useMethodMotion from './useMethodMotion';
import './method.css';

function StepPanel({ step }) {
  return (
    <article className={`method__panel method__panel--${step.key}`} aria-labelledby={`step-${step.key}`}>
      <div className="method__art">
        <span className={`method__orb orb orb--${step.key}`} aria-hidden="true" />
        <span className="method__number hand" aria-hidden="true">
          {step.number}
        </span>
        <div className="method__visual">
          <StepVisual stepKey={step.key} />
        </div>
      </div>
      <div className="method__text">
        <p className="method__name">{step.name}</p>
        <h3 id={`step-${step.key}`}>{step.title}</h3>
        <p className="method__body">{step.body}</p>
      </div>
    </article>
  );
}

export default function Method() {
  const scope = useRef(null);
  useMethodMotion(scope);

  return (
    <section id="method" className="method" ref={scope} aria-labelledby="method-title">
      <div className="method__pin">
        <div className="method__track">
          <div className="method__intro section-head">
            <span className="kicker-orb orb orb--learn" aria-hidden="true" />
            <h2 id="method-title" data-rise>
              How I teach you.
            </h2>
            <p>Every topic, four simple steps.</p>
          </div>
          {STEPS.map((step) => (
            <StepPanel key={step.key} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
