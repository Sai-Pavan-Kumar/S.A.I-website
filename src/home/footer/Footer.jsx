import LogoMark from '../shared/LogoMark';
import './footer.css';

// Read once when the page loads; the footer never needs to re-render for a new year.
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__word" aria-hidden="true">
        SAI
      </p>
      <div className="footer__row">
        <a className="footer__brand" href="#top">
          <LogoMark className="footer__mark" title="" />
          <span>SAI, your tech senior.</span>
        </a>
        <p className="footer__credit">
          Built by The SurfBoard · © {YEAR}
        </p>
      </div>
    </footer>
  );
}
