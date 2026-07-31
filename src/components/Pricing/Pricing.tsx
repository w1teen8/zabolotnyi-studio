import { motion } from 'framer-motion';
import { IconCheck } from './icons';
import './Pricing.css';

const points = [
  'Без передоплати',
  'Оплата після здачі та публікації сайту',
  'Прозорі умови без прихованих платежів',
];

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Вартість</span>
          <h2>
            Скільки коштує <span className="gradient-text">сайт</span>
          </h2>
        </motion.div>

        <motion.div
          className="pricing__card glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pricing__price">
            <span className="pricing__amount gradient-text">$100–200</span>
            <span className="pricing__note">
              Точна сума залежить від обсягу та складності проєкту
            </span>
          </div>

          <ul className="pricing__points">
            {points.map((point) => (
              <li key={point}>
                <span className="pricing__point-icon">
                  <IconCheck />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
