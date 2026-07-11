import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  size = 'md',
  className,
  children,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

  const sizeStyles = {
    sm: 'px-4 py-2.5 text-[0.65rem]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  };

  const variantStyles = {
    primary: 'bg-espresso text-offwhite hover:bg-charcoal',
    secondary: 'border border-espresso/20 text-espresso hover:border-gold/50 hover:text-gold',
  };

  const styles = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}