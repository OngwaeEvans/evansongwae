import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, Menu, MessageCircle, Moon, Sun, X } from 'lucide-react';
import { sections, type SectionId } from '../data/content';
import { whatsapp } from '../data/identity';
import { ui, usePrefs } from '../lib/prefs';
import { useNairobiClock } from '../lib/hooks';

function Toggles() {
  const { lang, setLang, theme, toggleTheme } = usePrefs();
  return (
    <div className="flex items-center gap-1">
      <div className="flex border hairline font-mono text-[10px]" role="group" aria-label="Language">
        {(['en', 'sw'] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
            className={`h-8 px-2.5 uppercase ${lang === l ? 'bg-cobalt text-white' : 'text-mute hover:text-ink'}`}>{l}</button>
        ))}
      </div>
      <button onClick={toggleTheme} className="flex h-8 w-8 items-center justify-center border hairline text-mute hover:text-ink" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
}

export function CommandBar({ active, onConsole }: { active: SectionId; onConsole: () => void }) {
  const { time, date } = useNairobiClock();
  const { t } = usePrefs();
  const idx = sections.findIndex((s) => s.id === active);
  return (
    <motion.header initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-1 fixed inset-x-0 top-0 z-[60] h-14 border-x-0 border-t-0">
      <div className="flex h-full items-center gap-4 px-4 lg:pl-[232px] lg:pr-6">
        <a href="#overview" className="font-head text-[12px] font-semibold tracking-[.14em] text-ink whitespace-nowrap">
          EVANS ONGWAE ONCHOKE <span className="text-mute">//</span> <span className="hidden sm:inline">HEVLOYS GROUP</span>
        </a>
        <div className="ml-auto hidden xl:flex items-center gap-6 label">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-cobalt animate-pulse" />{t(ui.online)}</span>
          <span>SECTION <span className="text-ink">{String(idx + 1).padStart(2, '0')} · {sections[idx]?.label.en}</span></span>
          <span>{date}</span>
          <span className="text-ink tabular-nums">{time} EAT</span>
        </div>
        <div className="ml-auto xl:ml-0 hidden md:flex items-center gap-2">
          <button onClick={onConsole} className="flex h-8 items-center gap-2 border hairline px-3 label hover:text-ink hover:border-cobalt"><Cpu size={13} />{t(ui.console)}</button>
          <Toggles />
        </div>
      </div>
    </motion.header>
  );
}

export function NavigationRail({ active }: { active: SectionId }) {
  const { t } = usePrefs();
  return (
    <nav aria-label="Primary" className="fixed left-0 top-0 z-[61] hidden h-full w-[212px] flex-col border-r hairline bg-bg/90 backdrop-blur lg:flex">
      <a href="#overview" className="flex h-14 items-center gap-3 border-b hairline px-5">
        <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden><path d="M10 52 32 10l22 42" fill="none" stroke="currentColor" strokeWidth="5" className="text-hi" /><rect x="27" y="36" width="10" height="10" className="fill-cobalt" /></svg>
        <span className="font-display text-lg font-extrabold tracking-wide">THE CAVE</span>
      </a>
      <ol className="flex-1 py-4">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={on ? 'location' : undefined}
                className={`group relative flex items-center gap-3 px-5 py-2.5 font-head text-[12px] uppercase tracking-[.12em] transition-colors ${on ? 'text-ink' : 'text-mute hover:text-ink'}`}>
                {on && <motion.span layoutId="rail" className="absolute left-0 top-0 h-full w-[2px] bg-cobalt" />}
                <span className={`font-mono text-[10px] ${on ? 'text-cobalt' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="transition-transform group-hover:translate-x-1">{t(s.label)}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <a href={whatsapp('general')} target="_blank" rel="noopener noreferrer" className="m-4 flex items-center justify-center gap-2 bg-cobalt py-3 font-head text-[11px] font-semibold uppercase tracking-[.14em] text-white hover:brightness-110">
        <MessageCircle size={14} /> WhatsApp Evans
      </a>
    </nav>
  );
}

export function MobileNavigation({ active, onConsole }: { active: SectionId; onConsole: () => void }) {
  const [open, setOpen] = useState(false);
  const { t } = usePrefs();
  const dock: SectionId[] = ['overview', 'projects', 'media', 'contact'];
  return (
    <>
      <nav aria-label="Quick" className="glass-2 fixed inset-x-0 bottom-0 z-[62] grid grid-cols-5 border-x-0 border-b-0 lg:hidden pb-[env(safe-area-inset-bottom)]">
        {dock.map((id) => {
          const s = sections.find((x) => x.id === id)!;
          return (
            <a key={id} href={`#${id}`} className={`flex h-14 flex-col items-center justify-center gap-1 font-head text-[10px] uppercase tracking-wider ${active === id ? 'text-cobalt' : 'text-mute'}`}>
              <span className={`h-[2px] w-5 ${active === id ? 'bg-cobalt' : 'bg-transparent'}`} />{t(s.label)}
            </a>
          );
        })}
        <button onClick={() => setOpen(true)} className="flex h-14 flex-col items-center justify-center gap-1 font-head text-[10px] uppercase tracking-wider text-mute" aria-expanded={open}>
          <Menu size={16} />{t(ui.menu)}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="glass-2 fixed inset-0 z-[85] flex flex-col lg:hidden" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
            <div className="flex h-14 items-center justify-between border-b hairline px-4">
              <span className="label">Navigation</span>
              <button onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center" aria-label={t(ui.close)}><X size={18} /></button>
            </div>
            <ol className="flex-1 overflow-y-auto px-4 py-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => setOpen(false)} className={`flex items-baseline gap-4 border-b hairline py-4 font-display text-2xl font-bold uppercase ${active === s.id ? 'text-cobalt' : 'text-ink'}`}>
                    <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>{t(s.label)}
                  </a>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between gap-3 border-t hairline p-4">
              <button onClick={() => { setOpen(false); onConsole(); }} className="flex h-11 items-center gap-2 border hairline px-4 label"><Cpu size={14} />{t(ui.console)}</button>
              <Toggles />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
