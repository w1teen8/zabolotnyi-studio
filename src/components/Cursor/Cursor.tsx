import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [variant, setVariant] = useState<'default' | 'link' | 'view' | 'drag'>('default');
  const [label, setLabel] = useState('');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.5 });

  const rafId = useRef(0);

  useEffect(() => {
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    setIsTouch(isCoarse);
    if (isCoarse) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        setVariant((target.dataset.cursor as typeof variant) || 'link');
        setLabel(target.dataset.cursorLabel || '');
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId.current);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: variant === 'default' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`cursor-ring cursor-ring--${variant}`}
        style={{ x: ringX, y: ringY }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </motion.div>
    </>
  );
}
