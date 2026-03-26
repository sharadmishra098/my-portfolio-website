interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-cyan/80">{eyebrow}</p>
      <h2 className="theme-text font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      <p className="theme-muted text-base leading-8 sm:text-lg">{description}</p>
    </div>
  );
}
