import type { ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  target?: string;
  cursorLabel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  cursorLabel,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLElement>(0.25);
  const classes = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;

  const props = {
    className: classes,
    onMouseMove,
    onMouseLeave,
    'data-cursor': 'link',
    'data-cursor-label': cursorLabel || '',
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
