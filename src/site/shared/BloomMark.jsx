import './bloom-mark.css';

// Flat version of the logo for small sizes; the gradient + grain file only holds up from ~48px.
const PETALS = [
  { key: 'learn', cx: 0, cy: -24, fill: 'var(--blue)' },
  { key: 'prove', cx: 24, cy: 0, fill: 'var(--teal)' },
  { key: 'build', cx: 0, cy: 24, fill: 'var(--amber)' },
  { key: 'placed', cx: -24, cy: 0, fill: 'var(--coral)' },
];

export default function BloomMark({ size = 32, title = 'SAI' }) {
  const maskId = `student-${size}`;
  return (
    <svg className="bloom-mark" viewBox="-48 -48 96 96" width={size} height={size} role="img" aria-label={title}>
      <defs>
        <mask id={maskId}>
          <rect x="-48" y="-48" width="96" height="96" fill="#fff" />
          <circle r="6" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {PETALS.map((petal, index) => (
          <circle
            key={petal.key}
            className="bloom-mark__petal"
            style={{ '--petal-x': `${petal.cx}px`, '--petal-y': `${petal.cy}px`, '--petal-index': index }}
            cx={petal.cx}
            cy={petal.cy}
            r="24"
            fill={petal.fill}
            fillOpacity={index === 0 ? 0.94 : 0.86}
          />
        ))}
      </g>
    </svg>
  );
}
