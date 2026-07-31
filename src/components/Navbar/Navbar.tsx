import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from '../MagneticButton/MagneticButton';
import Logo from '../Logo/Logo';
import './Navbar.css';

const links = [
  { href: '#portfolio', label: 'Портфоліо' },
  { href: '#why-us', label: 'Чому ми' },
  { href: '#process', label: 'Процес' },
  { href: '#pricing', label: 'Ціна' },
  { href: '#contact', label: 'Контакти' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo" data-cursor="link">
          <Logo size={38} />
          <span className="navbar__logo-text">Zabolotnyi Studio</span>
        </a>

        <nav className="navbar__links">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-cursor="link">
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton href="#contact" variant="ghost" className="navbar__cta" cursorLabel="Написати">
          Обговорити проєкт
        </MagneticButton>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
              Обговорити проєкт
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
