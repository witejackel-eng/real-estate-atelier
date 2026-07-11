import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeStyles = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-sm px-8 py-4',
};

const variantStyles = {
  primary: 'bg-espresso text-offwhite hover:bg-charcoal',
  secondary: 'border border-espresso/20 text-espresso hover:bg-espresso/5',
  ghost: 'text-espresso underline decoration-gold/40 underline-offset-4 hover:decoration-gold',
};

const focusRing = 'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className } = props;

  const baseStyles = cn(
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200',
    sizeStyles[size],
    variantStyles[variant],
    focusRing,
    className
  );

  if (props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={baseStyles} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = 'button', disabled = false, ...rest } = props;
  return (
    <button type={type} disabled={disabled} className={baseStyles} {...rest}>
      {children}
    </button>
  );
}