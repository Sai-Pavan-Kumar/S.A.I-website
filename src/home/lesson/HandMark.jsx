// A hand-drawn loop or strike, the way a senior marks rows on the board. The loop never closes
// cleanly on purpose; a perfect ellipse reads as software, not a pen.
const LOOP = 'M6 22 C 4 9, 40 3, 70 5 C 92 6, 99 15, 96 26 C 92 37, 52 41, 22 37 C 8 35, 2 28, 9 18 C 13 13, 22 10, 31 9';
const STRIKE = 'M4 22 C 30 18, 62 25, 96 19';

export default function HandMark({ kind, delay }) {
  return (
    <svg className={`hand-mark hand-mark--${kind}`} viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
      <path d={kind === 'loop' ? LOOP : STRIKE} pathLength="1" style={{ animationDelay: `${delay}ms` }} />
    </svg>
  );
}
