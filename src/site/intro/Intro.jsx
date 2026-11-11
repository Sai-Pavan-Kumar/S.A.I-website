import './intro.css';

export default function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro__board">
        <div className="intro__tile intro__tile--slogan" data-reveal style={{ '--reveal-index': 0 }}>
          <h2 id="intro-title">Mind goes blank.</h2>
        </div>
        <div className="intro__tile intro__tile--word" data-reveal style={{ '--reveal-index': 1 }}>
          <p aria-hidden="true">NULL</p>
        </div>
        <figure className="intro__tile intro__tile--clip" data-reveal style={{ '--reveal-index': 2 }}>
          <video
            src="/media/board-day0-crop.mp4"
            poster="/media/board-day0-crop-poster.webp"
            width="850"
            height="606"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-label="Sai's handwriting being written on the SAI whiteboard"
          />
        </figure>
      </div>

      <div className="intro__story">
        <img
          className="intro__hand"
          src="/media/handwriting-alphabet.webp"
          width="1620"
          height="520"
          loading="lazy"
          alt="The alphabet and digits written by hand on Sai's whiteboard"
          data-reveal
        />
        <p data-reveal style={{ '--reveal-index': 1 }}>
          You sat through four years of lectures. You know what SELECT does. Then an interviewer asks why{' '}
          <code>COUNT(tip_amount)</code> says 3 when the table has 5 rows, and your mind goes blank. You are not weak.
          Nobody sat next to you and drew it out on rough paper, the way a good senior does in the hostel at night.
          Videos explain and move on. Most AI tools hand you the answer, and it is gone by morning. Sai Anna is the
          senior we are building: he explains in the Telugu-English you think in, draws every step, asks what breaks
          before you write code, and checks your answer by running it, never by guessing.
        </p>
      </div>
    </section>
  );
}
