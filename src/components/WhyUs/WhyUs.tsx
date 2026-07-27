import { motion } from 'framer-motion';
import {
  IconBolt,
  IconLayers,
  IconGauge,
  IconCode,
  IconSearch,
  IconDevices,
} from './icons';
import './WhyUs.css';

const items = [
  { icon: IconBolt, title: 'Швидка розробка', desc: 'Запускаємо проєкти за 3–7 днів без втрати якості та уваги до деталей.' },
  { icon: IconLayers, title: 'Сучасний дизайн', desc: 'Унікальна візуальна мова під кожну нішу — без шаблонних рішень.' },
  { icon: IconGauge, title: 'Висока швидкість', desc: 'Оптимізоване завантаження та плавні анімації без просідання FPS.' },
  { icon: IconCode, title: 'Чистий код', desc: 'Підтримувана архітектура, яку легко розвивати та масштабувати.' },
  { icon: IconSearch, title: 'SEO', desc: 'Семантична верстка та технічна база для зростання в пошуковій видачі.' },
  { icon: IconDevices, title: 'Повна адаптація', desc: 'Ідеальне відображення на десктопі, планшеті та мобільних пристроях.' },
];

export default function WhyUs() {
  return (
    <section className="section why-us" id="why-us">
      <div className="container">
        <motion.div
          className="why-us__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Переваги</span>
          <h2>
            Чому обирають <span className="gradient-text">нас</span>
          </h2>
        </motion.div>

        <div className="why-us__grid">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              className="why-us__card glass"
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="why-us__icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
