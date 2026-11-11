import { useId } from 'react';
import { MARK } from '../brand';

// Static SVG copy of the brand mark. Used where WebGL is not worth it (nav, footer) and as the
// fallback when the live hero cannot run (no WebGL, or the visitor prefers reduced motion).
export default function LogoMark({ className = '', title = 'SAI' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="-48 -48 96 96" role="img" aria-label={title}>
      <defs>
        {MARK.circles.map((circle) => (
          <linearGradient key={circle.key} id={`${id}-${circle.key}`} x1="0.85" y1="0.1" x2="0.15" y2="0.9">
            <stop offset="0" stopColor={circle.from} />
            <stop offset="1" stopColor={circle.to} />
          </linearGradient>
        ))}
        <filter id={`${id}-grain`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.4 -0.55"
            result="specks"
          />
          <feComponentTransfer in="specks" result="faint">
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feComposite in="faint" in2="SourceGraphic" operator="in" result="clipped" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="clipped" />
          </feMerge>
        </filter>
        {/* Far bigger than the mark: where the circles fly in from off-screen they must not be cut at the box edge. */}
        <mask id={`${id}-hollow`} maskUnits="userSpaceOnUse" x="-500" y="-500" width="1000" height="1000">
          <rect x="-500" y="-500" width="1000" height="1000" fill="#fff" />
          <circle r={MARK.hollow} fill="#000" />
        </mask>
      </defs>
      <g filter={`url(#${id}-grain)`} mask={`url(#${id}-hollow)`}>
        {MARK.circles.map((circle) => (
          <circle
            key={circle.key}
            className={`mark__circle mark__circle--${circle.key}`}
            cx={circle.x}
            cy={circle.y}
            r={MARK.radius}
            fill={`url(#${id}-${circle.key})`}
            fillOpacity={circle.opacity}
          />
        ))}
      </g>
    </svg>
  );
}
