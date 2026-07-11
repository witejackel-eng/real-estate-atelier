import { cn } from '@/lib/utils';

interface ContainerProps {
  variant?: 'main' | 'editorial' | 'form' | 'narrow';
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  main: 'max-w-[1360px] px-5 sm:px-6 md:px-8 lg:px-16',
  editorial: 'max-w-[720px] px-5 sm:px-6 md:px-8 lg:px-16',
  form: 'max-w-[640px] px-5 sm:px-6 md:px-8 lg:px-16',
  narrow: 'max-w-[560px] px-5 sm:px-6 md:px-8 lg:px-16',
};

export function Container({ variant = 'main', className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto', variantStyles[variant], className)}>
      {children}
    </div>
  );
}