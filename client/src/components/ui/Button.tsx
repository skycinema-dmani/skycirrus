import { Link } from 'react-router-dom';
import { useMagneticButton, cn } from '@/hooks/useAnimations';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  magnetic?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className,
  magnetic = true,
  disabled,
}: ButtonProps) {
  const magneticRef = useMagneticButton();

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-500 overflow-hidden group';

  const variants = {
    primary:
      'bg-gold text-obsidian hover:bg-gold-light shadow-gold hover:shadow-lg',
    secondary:
      'bg-transparent text-cream border border-cream/30 hover:border-gold hover:text-gold',
    ghost: 'bg-transparent text-cream/70 hover:text-gold',
    outline:
      'bg-transparent text-gold border border-gold/50 hover:bg-gold/10 hover:border-gold',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs uppercase tracking-widest',
    md: 'px-8 py-3.5 text-sm uppercase tracking-widest',
    lg: 'px-10 py-4 text-sm uppercase tracking-widest',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        ref={magnetic ? (magneticRef as React.RefObject<HTMLAnchorElement>) : undefined}
        to={to}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={magnetic ? (magneticRef as React.RefObject<HTMLAnchorElement>) : undefined}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magnetic ? (magneticRef as React.RefObject<HTMLButtonElement>) : undefined}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}
    >
      {content}
    </button>
  );
}
