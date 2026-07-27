import { motion, type Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.018, delayChildren: delay },
  }),
};

const char: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <motion.span
      className={`split-text ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          {wi > 0 && ' '}
          <span className="split-text__word">
            {word.split('').map((letter, li) => (
              <span className="split-text__char-mask" key={li}>
                <motion.span className="split-text__char" variants={char}>
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </motion.span>
  );
}
