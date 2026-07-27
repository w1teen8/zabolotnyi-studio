import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories, projects, type Category } from '../../data/projects';
import ProjectCard from './ProjectCard';
import './Portfolio.css';

export default function Portfolio() {
  const [active, setActive] = useState<Category | 'Всі'>('Всі');

  const filtered = useMemo(
    () => (active === 'Всі' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <motion.div
          className="portfolio__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Портфоліо</span>
          <h2 className="portfolio__title">
            Проєкти, які говорять <span className="gradient-text">самі за себе</span>
          </h2>
        </motion.div>

        <motion.div
          className="portfolio__filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`portfolio__filter ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
              data-cursor="link"
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="portfolio__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
