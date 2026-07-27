import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../../data/projects';
import { screenshots } from '../../data/screenshots';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollVars, setScrollVars] = useState({ depth: 0, duration: 4 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const box = viewportRef.current;
    if (!box) return;
    const displayedHeight = img.naturalHeight * (box.clientWidth / img.naturalWidth);
    const depth = Math.max(0, displayedHeight - box.clientHeight);
    setScrollVars({ depth, duration: Math.min(14, Math.max(3, depth / 130)) });
  };

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { damping: 22, stiffness: 200 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { damping: 22, stiffness: 200 });
  const glowX = useTransform(mx, [0, 1], ['0%', '100%']);
  const glowY = useTransform(my, [0, 1], ['0%', '100%']);

  const handleMove = (e: React.MouseEvent) => {
    if (flipped) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const handleFlip = (value: boolean) => {
    mx.set(0.5);
    my.set(0.5);
    setFlipped(value);
  };

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1600 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="project-card__tilt" style={{ rotateX, rotateY }}>
      <motion.div
        className="project-card__flip"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div className="project-card__face project-card__face--front">
          <motion.div
            className="project-card__glow"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) =>
                  `radial-gradient(400px circle at ${gx} ${gy}, rgba(59,130,246,0.18), transparent 60%)`
              ),
            }}
          />
          <div className="browser-bar">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
            <span className="browser-url">{project.url.replace('https://', '')}</span>
          </div>

          <div
            className="project-card__viewport"
            ref={viewportRef}
            data-cursor="view"
            data-cursor-label="Дивитись"
            style={
              {
                '--scroll-depth': `${scrollVars.depth}px`,
                '--scroll-duration': `${scrollVars.duration}s`,
              } as React.CSSProperties
            }
          >
            <img
              src={screenshots[project.id]}
              alt={project.name}
              className="project-card__shot"
              loading="lazy"
              onLoad={handleImageLoad}
            />
          </div>

          <div className="project-card__body">
            <div className="project-card__heading">
              <h3>{project.name}</h3>
              <span className="project-card__category">{project.category}</span>
            </div>
            <p className="project-card__desc">{project.description}</p>

            <div className="project-card__tech">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="project-card__actions">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__btn project-card__btn--primary"
                data-cursor="link"
              >
                Відкрити сайт
              </a>
              <button
                className="project-card__btn project-card__btn--ghost"
                onClick={() => handleFlip(true)}
                data-cursor="link"
              >
                Детальніше
              </button>
            </div>
          </div>
        </div>

        <div className="project-card__face project-card__face--back">
          <div className="project-card__back-content">
            <span className="project-card__category">{project.category}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="project-card__tech project-card__tech--back">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="project-card__actions">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__btn project-card__btn--primary"
                data-cursor="link"
              >
                Відкрити сайт
              </a>
              <button
                className="project-card__btn project-card__btn--ghost"
                onClick={() => handleFlip(false)}
                data-cursor="link"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
