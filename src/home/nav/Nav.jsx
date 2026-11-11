import LogoMark from '../shared/LogoMark';
import './nav.css';

const LINKS = [
  { href: '#method', label: 'How I teach' },
  { href: '#board', label: 'The board' },
  { href: '#lesson', label: 'Try it' },
  { href: '#questions', label: 'FAQ' },
];

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="nav__brand" href="#top" aria-label="SAI, back to top">
        <LogoMark className="nav__mark" title="" />
        <span aria-hidden="true">SAI</span>
      </a>
      <ul className="nav__links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a className="nav__cta" href="#join">
        Join the waitlist
      </a>
    </nav>
  );
}
