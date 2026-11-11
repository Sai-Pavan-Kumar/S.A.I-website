import { useRef } from 'react';
import BoardInk from './BoardInk';
import { useBoardPlan, useBoardScrub } from './useBoardScrub';
import './board.css';

const LESSON_TEXT =
  'Find 1 name in 1,000,000. Check the middle, drop half: 1,000,000, then 500,000, then 250,000, and so on. About 20 checks, because 2 to the power 20 is 1,048,576.';

// What the board says, in plain type, when the handwriting cannot be traced.
function BoardFallback() {
  return (
    <div className="board__fallback hand">
      <p>Find 1 name in 1,000,000</p>
      <p>check the middle, drop half</p>
      <p className="board__soft">1,000,000 → 500,000 → 250,000 → ...</p>
      <p className="board__accent">about 20 checks</p>
    </div>
  );
}

export default function Board() {
  const scope = useRef(null);
  const { plan, failed } = useBoardPlan();
  useBoardScrub(scope, plan);

  return (
    <section id="board" className="board" ref={scope} aria-labelledby="board-title">
      <div className="section-head board__head">
        <span className="kicker-orb orb orb--prove" aria-hidden="true" />
        <h2 id="board-title" data-rise>
          Watch me think.
        </h2>
        <p>I teach with a pen, one stroke at a time. Scroll, and I&rsquo;ll show you how to find one name in a million.</p>
      </div>

      <div className="board__stage">
        <figure className="board__frame">
          <div className="board__paper">
            {plan && <BoardInk plan={plan} label={LESSON_TEXT} />}
            {failed && <BoardFallback />}
          </div>
          <figcaption className="board__caption">
            <span className="board__caption-orb orb orb--build" aria-hidden="true" />
            Written live, in my own handwriting. Cut the list in half each time, and a million names take about 20
            checks.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
