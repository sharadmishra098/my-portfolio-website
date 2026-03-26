import { MoonStar, SunMedium } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-outline-button group flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] backdrop-blur transition hover:bg-white/20"
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
      <span>{theme === 'dark' ? 'Alt mode' : 'Dark mode'}</span>
    </button>
  );
}
