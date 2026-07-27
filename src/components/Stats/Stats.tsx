import { motion } from 'framer-motion';
import Counter from './Counter';
import './Stats.css';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  display?: string;
}

const stats: StatItem[] = [
  { value: 13, suffix: '+', label: 'Проєктів' },
  { value: 0, suffix: '', label: 'Ніш бізнесу', display: '∞' },
  { value: 100, suffix: '%', label: 'Адаптивні сайти' },
  { value: 3, suffix: '–7 днів', label: 'Середній термін розробки' },
];

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container stats__grid">
        {stats.map((stat, i) => (
          <motion.div
            className="stats__card glass"
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {stat.display ? (
              <span className="stat-number">{stat.display}</span>
            ) : (
              <Counter value={stat.value} suffix={stat.suffix} />
            )}
            <span className="stats__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
