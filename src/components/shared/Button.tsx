import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode, MouseEventHandler } from 'react';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  'aria-label'?: string;
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonActionProps = ButtonBaseProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
};

type ButtonProps = ButtonLinkProps | ButtonActionProps;

const sizeStyles = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-sm px-8 py-4',
};

const variantStyles = {
  primary: 'bg-espresso text-offwhite hover:bg-charcoal disabled:bg-espresso/50 disabled:cursor-not-allowed',
  secondary: 'border border-espresso/20 text-espresso hover:bg-espresso/5 disabled:border-espresso/10 disabled:text-espresso/40 disabled:cursor-not-allowed',
  ghost: 'text-espresso underline decoration-gold/40 underline-offset-4 hover:decoration-gold',
};

const focusRing = 'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className, disabled = false } = props;

  const baseStyles = cn(
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 rounded-sm',
    sizeStyles[size],
    variantStyles[variant],
    focusRing,
    className
  );

  if ('href' in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseStyles}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  const { type: buttonType = 'button', onClick } = props as ButtonActionProps;
  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles}
    >
      {children}
    </button>
  );
}