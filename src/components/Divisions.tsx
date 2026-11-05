import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { divisions } from '../data/divisions';
import { projects } from '../data/projects';
import { SectionHead } from './shared';

export function DivisionExplorer({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [sel, setSel] = useState(divisions[0].id);
  const d = divisions.find((x) => x.id === sel)!;
  const related = projects.filter((p) => p.division === d.id);
  return (
    <section id="hevloys" className="border-y hairline bg-bg2">
      <div className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
        <SectionHead index="05" kicker="Hevloys Group" title="One ecosystem, four divisions"
          lede="This site belongs to Evans. Hevloys Group is the umbrella brand that organises the wider body of work, and the divisions below are its strategic directions. They are not registered subsidiaries. Each one says plainly what exists now and what is still an objective." />
        <div className="grid gap-px border hairline bg-[rgb(var(--line))] lg:grid-cols-[320px_1fr]">
          <div role="tablist" aria-label="Divisions" className="grid bg-bg sm:grid-cols-2 lg:grid-cols-1">
            {divisions.map((x) => (
              <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}
                className={`relative border-b hairline p-5 text-left transition-colors ${sel === x.id ? 'bg-surface' : 'hover:bg-panel'}`}>
                {sel === x.id && <motion.span layoutId="div-ind" className="absolute left-0 top-0 h-full w-[3px]" style={{ background: x.accent }} />}
                <span className="font-mono text-[10px] text-mute">DIVISION {x.code}</span>
                <p className="mt-1 font-head text-base font-semibold">{x.name}</p>
                <p className="text-xs text-mute">{x.subtitle}</p>
              </button>
            ))}
          </div>
          <div role="tabpanel" className="relative min-h-[520px] overflow-hidden bg-panel p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={d.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 font-display text-[14rem] font-black leading-none opacity-[.05]" style={{ color: d.accent }}>{d.code}</span>
                <p className="label" style={{ color: d.accent }}>Division {d.code}</p>
                <h3 className="mt-2 font-display text-3xl md:text-5xl font-extrabold uppercase">{d.name}</h3>
                <p className="mt-1 font-head text-mute">{d.subtitle}</p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed">{d.purpose}</p>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="label mb-3">What it investigates</p>
                    <ul className="space-y-1.5 font-head text-sm">{d.focus.map((f) => <li key={f}>— {f}</li>)}</ul>
                    {d.tools && <p className="mt-5 font-mono text-xs text-mute">TOOLS · {d.tools.join(' · ')}</p>}
                  </div>
                  <div className="space-y-5">
                    <div className="border-l-2 pl-4" style={{ borderColor: d.accent }}>
                      <p className="label">Exists now</p><p className="mt-1 text-sm">{d.now}</p>
                    </div>
                    <div className="border-l-2 border-dashed hairline pl-4">
                      <p className="label">Envisioned · objective</p><p className="mt-1 text-sm text-mute">{d.objective}</p>
                    </div>
                  </div>
                </div>
                {related.length > 0 && (
                  <div className="mt-10">
                    <p className="label mb-3">Connected projects</p>
                    <div className="flex flex-wrap gap-2">
                      {related.map((p) => (
                        <button key={p.id} onClick={() => onOpenProject(p.id)} className="border hairline px-3 py-2 font-head text-xs uppercase tracking-wider hover:border-cobalt hover:text-cobalt">{p.name} →</button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
