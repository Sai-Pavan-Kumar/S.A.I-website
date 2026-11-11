import BloomMark from '../shared/BloomMark';
import { CHAPTERS } from '../sections';
import './hero.css';

// Tabs step across the width so every chapter name stays readable in the stack.
const TAB_OFFSETS = ['6%', '27%', '50%', '70%', '6%'];

function Folder({ chapter, index, isFront }) {
  return (
    <div
      className={`hero-folder${isFront ? ' hero-folder--front' : ''}`}
      style={{ '--folder-index': index, '--folder-ground': chapter.ground, '--folder-ink': chapter.ink }}
    >
      <a className="hero-folder__tab" href={`#${chapter.id}`} style={{ left: TAB_OFFSETS[index] }}>
        {chapter.name}
      </a>
      {isFront && (
        <div className="hero-folder__inside">
          <a className="button" href="#join">
            Join the waitlist
          </a>
          <p>Free to join. One email when Sai Anna is ready for you.</p>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__bar">
        <a className="hero__wordmark" href="#top" aria-label="SAI, back to top">
          <BloomMark size={30} title="SAI logo" />
          <span>SAI</span>
        </a>
        <a className="hero__bar-link" href="#join">
          Join the waitlist
        </a>
      </div>

      <div className="hero__title">
        <h1>Sai Anna</h1>
        <p>Your senior who teaches you SQL in Telugu-English, on a whiteboard, until you are interview-ready.</p>
      </div>

      <nav className="hero__folders" aria-label="Chapters">
        {CHAPTERS.map((chapter, index) => (
          <Folder key={chapter.id} chapter={chapter} index={index} isFront={index === CHAPTERS.length - 1} />
        ))}
      </nav>
    </header>
  );
}
