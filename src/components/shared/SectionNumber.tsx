export function SectionNumber({ number, className = '' }: { number: string; className?: string }) {
  return (
    <span className={`section-number ${className}`}>
      N°{number}
    </span>
  );
}