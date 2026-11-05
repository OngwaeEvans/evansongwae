import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Bi, Lang } from '../types';

type Theme = 'dark' | 'light';
interface Prefs { lang: Lang; setLang: (l: Lang) => void; theme: Theme; toggleTheme: () => void; t: (b: Bi) => string }
const Ctx = createContext<Prefs | null>(null);

const read = <T extends string>(k: string, fallback: T): T => {
  try { return (localStorage.getItem(k) as T) || fallback; } catch { return fallback; }
};

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => read<Lang>('cave-lang', 'en'));
  const [theme, setTheme] = useState<Theme>(() => read<Theme>('cave-theme', 'dark'));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    try { localStorage.setItem('cave-theme', theme); localStorage.setItem('cave-lang', lang); } catch { /* storage unavailable */ }
  }, [theme, lang]);
  const value: Prefs = { lang, setLang, theme, toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')), t: (b) => b[lang] };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePrefs must be used inside PrefsProvider');
  return v;
}

/** UI strings. Long-form narrative stays in English; navigation and controls are bilingual. */
export const ui = {
  enter: { en: 'Enter the Cave', sw: 'Ingia Pangoni' },
  explore: { en: 'Explore the work', sw: 'Chunguza kazi' },
  contactEvans: { en: 'Contact Evans', sw: 'Wasiliana na Evans' },
  online: { en: 'Cave online', sw: 'Pango liko hewani' },
  console: { en: 'Console mode', sw: 'Hali ya Konsoli' },
  search: { en: 'Search projects, tags, tech…', sw: 'Tafuta miradi…' },
  all: { en: 'All', sw: 'Zote' },
  open: { en: 'Open dossier', sw: 'Fungua faili' },
  visit: { en: 'Visit site', sw: 'Tembelea' },
  watch: { en: 'Watch on YouTube', sw: 'Tazama YouTube' },
  play: { en: 'Play here', sw: 'Cheza hapa' },
  whatsapp: { en: 'Message on WhatsApp', sw: 'Tuma WhatsApp' },
  call: { en: 'Call Evans', sw: 'Mpigie Evans' },
  text: { en: 'Send a text', sw: 'Tuma SMS' },
  socials: { en: 'Open social links', sw: 'Fungua mitandao' },
  menu: { en: 'Menu', sw: 'Menyu' },
  close: { en: 'Close', sw: 'Funga' },
} satisfies Record<string, Bi>;
