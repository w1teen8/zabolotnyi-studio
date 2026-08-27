import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';
import Laptop from './Laptop';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !auroraRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(auroraRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__aurora" ref={auroraRef} />
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Zabolotnyi Studio
          </motion.span>

          <h1 className="hero__title">
            <SplitText text="Створюємо сучасні сайти," delay={0.1} />
            <br />
            <SplitText text="які допомагають " delay={0.5} />
            <span className="gradient-text">
              <SplitText text="бізнесу зростати" delay={0.75} />
            </span>
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Modern Web Design &amp; Development — преміальні сайти для освіти, б'юті-індустрії,
            HoReCa і не тільки. Від ідеї до запуску від 7 днів. Вартість — від{' '}
            <a href="#pricing" className="hero__subtitle-price" data-cursor="link">
              $100
            </a>
            , залежно від функціоналу сайту.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="#portfolio" variant="primary" cursorLabel="Дивитись">
              Переглянути проєкти
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" cursorLabel="Написати">
              Обговорити проєкт
            </MagneticButton>
          </motion.div>
        </div>

        <div className="hero__visual">
          <Laptop />
        </div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="hero__scroll-line" />
        <span>Прокрутіть вниз</span>
      </motion.div>
    </section>
  );
}
