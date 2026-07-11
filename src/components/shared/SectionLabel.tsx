import { cn } from '@/lib/utils';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs tracking-[0.15em] uppercase text-gold block mb-4 md:mb-6',
        className
      )}
    >
      {label}
    </span>
  );
}