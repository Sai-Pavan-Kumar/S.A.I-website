import './founder.css';

function Mark({ tone, children }) {
  return <mark className={`founder__mark founder__mark--${tone}`}>{children}</mark>;
}

export default function Founder() {
  return (
    <section id="founder" className="founder" aria-labelledby="founder-title">
      <h2 id="founder-title" data-reveal>Who's building SAI</h2>
      <div className="founder__story" data-reveal style={{ '--reveal-index': 1 }}>
        <p>
          <strong>P. Sai Pavan Kumar</strong> runs <Mark tone="blue">The SurfBoard</Mark>, where{' '}
          <Mark tone="paper">105K followers</Mark> learn tech in Telugu-English. Students keep writing to him with the
          same story: four years of college, and the interview still feels like a wall. A video helps for a day. What
          they want is a senior who sits with them until it clicks. So Sai is building one, with co-founder{' '}
          <Mark tone="teal">Ch. Sai Laxman</Mark>, a data analyst. We are starting small and honest:{' '}
          <Mark tone="coral">SQL first</Mark>, one module at a time, every answer checked by a real database. Before we
          build the app, we are teaching these lessons on <Mark tone="paper">YouTube</Mark> to see if the method truly
          works. Nothing is live yet, and we will not pretend it is.{' '}
          <a className="founder__mark founder__mark--ink" href="#join">
            Join the waitlist and try it first.
          </a>
        </p>
      </div>
      <figure className="founder__signature" data-reveal style={{ '--reveal-index': 2 }}>
        <img
          src="/media/handwriting-digits-ink.webp"
          alt="The digits zero to nine in Sai's handwriting, from a board recording"
          width="640"
          height="150"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
