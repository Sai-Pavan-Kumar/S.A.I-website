import { useId } from 'react';
import { letterFrame } from './boardScript';
import { GLYPH_W, GLYPH_H } from './penWriting';

// A thick pen path grows inside a mask and uncovers the real letter, so the finished glyph is the
// font's own shape, pixel for pixel (the board engine's PenMask, driven by scroll instead of time).
function PenLetter({ id, letter }) {
  const { scale, left, top } = letterFrame(letter);
  return (
    <g>
      <mask id={id} maskUnits="userSpaceOnUse" x={left} y={top} width={GLYPH_W * scale} height={GLYPH_H * scale}>
        {letter.glyph ? (
          <g transform={`translate(${left} ${top}) scale(${scale})`}>
            {letter.strokes.map((stroke, index) => (
              <path
                key={index}
                data-start={stroke.start}
                data-length={stroke.length}
                d={stroke.d}
                pathLength="1"
                fill="none"
                stroke="#fff"
                strokeWidth={letter.glyph.penRadius * 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        ) : (
          <rect
            data-start={letter.strokes[0].start}
            data-length={letter.strokes[0].length}
            data-wipe={letter.width}
            x={letter.x}
            y={letter.y - letter.size}
            width={letter.width}
            height={letter.size * 1.4}
            fill="#fff"
          />
        )}
      </mask>
      <text className="hand" x={letter.x} y={letter.y} fontSize={letter.size} fill={letter.ink} mask={`url(#${id})`}>
        {letter.char}
      </text>
    </g>
  );
}

export default function BoardInk({ plan, label }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className="board__ink" viewBox={`0 0 ${plan.width} ${plan.height}`} role="img" aria-label={label}>
      {plan.marks.map((mark, index) =>
        mark.kind === 'letter' ? (
          <PenLetter key={index} id={`${id}-pen-${index}`} letter={mark} />
        ) : (
          <path
            key={index}
            data-start={mark.start}
            data-length={mark.length}
            d={mark.d}
            pathLength="1"
            fill="none"
            stroke={mark.colour}
            strokeWidth={mark.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      )}
    </svg>
  );
}
