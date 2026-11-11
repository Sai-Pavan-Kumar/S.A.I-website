import './mindsets.css';

// Same four colours and order as the logo petals: the tile grows as the student does.
const STAGES = [
  {
    name: 'Learn',
    colour: 'var(--blue)',
    text: 'Explains with an everyday analogy and draws every step before any code.',
  },
  {
    name: 'Prove',
    colour: 'var(--teal)',
    text: 'Asks what breaks: empty tables, NULLs, duplicates. You find the trap first.',
  },
  {
    name: 'Build',
    colour: 'var(--amber)',
    text: 'Shows what changes when your five rows become five million in a real company.',
  },
  {
    name: 'Get placed',
    colour: 'var(--coral)',
    text: 'Keeps your daily streak and your plan honest. Scolds like a brother, never shames.',
  },
];

export default function Mindsets() {
  return (
    <section id="mindsets" className="mindsets" aria-labelledby="mindsets-title">
      <div className="mindsets__intro">
        <h2 id="mindsets-title" data-reveal>One Anna, four mindsets</h2>
        <p data-reveal style={{ '--reveal-index': 1 }}>
          In the first version, one Sai Anna moves between these four as you go through a lesson. Later, each
          mindset becomes its own senior. The logo is the same four circles, with you in the middle.
        </p>
      </div>

      <ol className="mindsets__stages">
        {STAGES.map((stage, index) => (
          <li key={stage.name} className="mindsets__stage" data-reveal style={{ '--reveal-index': index }}>
            <div className="mindsets__tile" aria-hidden="true">
              <span className="mindsets__petal" style={{ background: stage.colour }} />
            </div>
            <h3>{stage.name}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
