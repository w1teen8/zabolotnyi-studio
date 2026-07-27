import { motion } from 'framer-motion';
import MagneticButton from '../MagneticButton/MagneticButton';
import { IconTelegram, IconMail } from './icons';
import './Contact.css';

const TELEGRAM = 'https://t.me/w1teen0';
const EMAIL = 'zabolotnyistudio@gmail.com';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact__aurora" />
      <div className="container">
        <motion.div
          className="contact__card glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Почнемо?</span>
          <h2 className="contact__title">
            Готові обговорити <span className="gradient-text">проєкт?</span>
          </h2>
          <p className="contact__subtitle">
            Розкажіть про свою ідею — відповімо протягом дня та запропонуємо відповідне рішення.
          </p>

          <div className="contact__actions">
            <MagneticButton href={TELEGRAM} target="_blank" variant="primary" cursorLabel="Написати">
              <IconTelegram />
              Написати в Telegram
            </MagneticButton>
            <MagneticButton href={`mailto:${EMAIL}`} variant="ghost" cursorLabel="Email">
              <IconMail />
              {EMAIL}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
