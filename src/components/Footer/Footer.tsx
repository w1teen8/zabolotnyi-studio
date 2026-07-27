import Logo from '../Logo/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo" data-cursor="link">
          <Logo size={30} />
          <span>Zabolotnyi Studio</span>
        </a>
        <p className="footer__copy">© {year} Zabolotnyi Studio. Усі права захищені.</p>
      </div>
    </footer>
  );
}
