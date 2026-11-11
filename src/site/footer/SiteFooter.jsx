import BloomMark from '../shared/BloomMark';
import { CHAPTERS } from '../sections';
import './footer.css';

const WORDMARK_LETTERS = ['S', 'A', 'I'];
const CURRENT_YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <BloomMark size={44} title="SAI logo" />
          <p>Sai Anna, your elder brother for tech, in Telugu-English. Built by The SurfBoard.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}>{chapter.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__legal">
          <a href="#top">Back to top</a>
          <p>© {CURRENT_YEAR} SAI by The SurfBoard</p>
        </div>
      </div>

      {/* The name is cropped by the page edge on purpose: it reads as a sign too big for the screen. */}
      <p className="site-footer__name" aria-hidden="true" data-reveal>
        {WORDMARK_LETTERS.map((letter, index) => (
          <span key={letter} style={{ '--letter-index': index }}>
            {letter}
          </span>
        ))}
      </p>
    </footer>
  );
}
