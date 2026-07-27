import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Process.css';

const steps = [
  { num: '01', title: 'Обговорення', desc: 'Розбираємо цілі проєкту, аудиторію та очікування від майбутнього сайту.' },
  { num: '02', title: 'Дизайн', desc: 'Створюємо концепт і візуальний стиль, узгоджуємо макет перед розробкою.' },
  { num: '03', title: 'Розробка', desc: 'Верстаємо та програмуємо сайт з анімаціями й адаптацією під усі пристрої.' },
  { num: '04', title: 'Тестування', desc: 'Перевіряємо роботу на різних браузерах, пристроях та роздільних здатностях екрана.' },
  { num: '05', title: 'Запуск', desc: 'Публікуємо сайт і передаємо проєкт — з цього моменту він готовий приносити результат.' },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section process" id="process">
      <div className="container">
        <motion.div
          className="process__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Процес роботи</span>
          <h2>
            Як проходить <span className="gradient-text">співпраця</span>
          </h2>
        </motion.div>

        <div className="process__timeline" ref={ref}>
          <div className="process__line">
            <motion.div className="process__line-fill" style={{ height: lineHeight }} />
          </div>

          {steps.map((step, i) => (
            <motion.div
              className="process__step"
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="process__num">{step.num}</div>
              <div className="process__content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
