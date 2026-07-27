import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';
import { screenshots } from '../../data/screenshots';
import './Laptop.css';

const showcase = [projects[0], projects[3], projects[9], projects[11], projects[12]];

export default function Laptop() {
  const [index, setIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { damping: 20, stiffness: 120 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { damping: 20, stiffness: 120 });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % showcase.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const active = showcase[index];

  return (
    <motion.div
      className="laptop-wrap"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="laptop" style={{ rotateX, rotateY }}>
        <div className="laptop__glow" />
        <div className="laptop__screen">
          <div className="laptop__bar">
            <span className="laptop__dot laptop__dot--red" />
            <span className="laptop__dot laptop__dot--yellow" />
            <span className="laptop__dot laptop__dot--green" />
            <span className="laptop__url">{active.url.replace('https://', '')}</span>
          </div>
          <div className="laptop__viewport">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={screenshots[active.id]}
                alt={active.name}
                className="laptop__shot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
        </div>
        <div className="laptop__base">
          <div className="laptop__notch" />
        </div>
      </motion.div>

      <div className="laptop__dots-nav">
        {showcase.map((p, i) => (
          <button
            key={p.id}
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
            aria-label={p.name}
          />
        ))}
      </div>
    </motion.div>
  );
}
