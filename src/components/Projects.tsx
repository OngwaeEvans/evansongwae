import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play, Search } from 'lucide-react';
import type { Project, ProjectTab, ProjectTag } from '../types';
import { projects } from '../data/projects';
import { divisions } from '../data/divisions';
import { videos, thumb, embedUrl } from '../data/videos';
import { whatsapp } from '../data/identity';
import { ui, usePrefs } from '../lib/prefs';
import { Drawer, SectionHead, StatusLabel } from './shared';

const tabs: (ProjectTab | 'ALL')[] = ['ALL', 'MEDIA', 'TECH / AI', 'FINANCE', 'AERO / ENERGY'];
const tags: ProjectTag[] = ['COMMUNITY', 'LOGISTICS', 'DIGITAL INFRASTRUCTURE', 'HEALTH', 'SOFTWARE', 'RESEARCH', 'INDUSTRIAL SYSTEMS', 'EXPERIMENTAL'];
const divisionName = (id: Project['division']) => (id === 'group' ? 'Hevloys Group' : divisions.find((d) => d.id === id)?.name ?? '');
const host = (u?: string) => (u ? u.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'no public link yet');

export function ProjectFilters({ tab, setTab, tag, setTag, q, setQ, count }: {
  tab: ProjectTab | 'ALL'; setTab: (t: ProjectTab | 'ALL') => void; tag: ProjectTag | null; setTag: (t: ProjectTag | null) => void;
  q: string; setQ: (s: string) => void; count: number;
}) {
  const { t } = usePrefs();
  return (
    <div className="glass-1 sticky top-14 z-30 -mx-5 mb-8 px-5 py-4 md:mx-0 md:px-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div role="tablist" aria-label="Project category" className="no-scrollbar flex gap-1 overflow-x-auto">
          {tabs.map((x) => (
            <button key={x} role="tab" aria-selected={tab === x} onClick={() => setTab(x)}
              className={`relative h-10 shrink-0 px-4 font-head text-[11px] font-semibold uppercase tracking-[.14em] ${tab === x ? 'text-white' : 'text-mute hover:text-ink'}`}>
              {tab === x && <motion.span layoutId="tab-bg" className="absolute inset-0 bg-cobalt" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="relative">{x === 'ALL' ? t(ui.all) : x}</span>
            </button>
          ))}
        </div>
        <label className="flex h-10 flex-1 items-center gap-2 border hairline bg-bg px-3 lg:max-w-sm lg:ml-auto">
          <Search size={14} className="text-mute" /><span className="sr-only">Search</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(ui.search)} className="w-full bg-transparent text-sm outline-none placeholder:text-mute" />
        </label>
        <p className="label whitespace-nowrap">INDEX <span className="text-ink">{String(count).padStart(2, '0')}</span> / {projects.length}</p>
      </div>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {tags.map((x) => (
          <button key={x} onClick={() => setTag(tag === x ? null : x)} aria-pressed={tag === x}
            className={`shrink-0 border px-2.5 py-1.5 font-mono text-[10px] tracking-wider ${tag === x ? 'border-cobalt text-cobalt' : 'hairline text-mute hover:text-ink'}`}>#{x}</button>
        ))}
      </div>
    </div>
  );
}

function Fallback({ p }: { p: Project }) {
  const initials = p.name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
  return (
    <div className="relative flex aspect-[16/9] items-end overflow-hidden bg-surface p-4">
      <div className="blueprint absolute inset-0 opacity-70" aria-hidden />
      <span aria-hidden className="absolute right-3 top-0 font-display text-8xl font-black text-ink/[.06]">{initials}</span>
      <span className="relative font-mono text-[10px] text-mute">{host(p.url)}</span>
    </div>
  );
}

export function ProjectCard({ p, index, onOpen, featured }: { p: Project; index: number; onOpen: () => void; featured?: boolean }) {
  const { t } = usePrefs();
  const vid = p.videoIds?.[0];
  return (
    <motion.article layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
      className={`group relative flex flex-col border hairline bg-panel transition-colors hover:border-cobalt/60 ${featured ? 'md:col-span-2' : ''}`}>
      <button onClick={onOpen} className="text-left" aria-label={`Open ${p.name} details`}>
        <div className="relative overflow-hidden">
          {vid ? <img src={thumb(vid)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /> : <Fallback p={p} />}
          <span className="absolute left-3 top-3 bg-bg/80 px-2 py-1 font-mono text-[10px] text-mute">{String(index + 1).padStart(2, '0')} · {p.tab}</span>
        </div>
        <div className="p-5">
          <StatusLabel status={p.status} source={p.statusSource} />
          <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-none transition-colors group-hover:text-cobalt">{p.name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase text-mute">{divisionName(p.division)}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">{p.short}</p>
          <p className="mt-3 border-l hairline pl-3 text-xs text-mute"><span className="text-ink">Problem:</span> {p.problem}</p>
        </div>
      </button>
      <div className="mt-auto flex border-t hairline">
        <button onClick={onOpen} className="flex flex-1 items-center justify-between px-5 py-3.5 font-head text-[11px] font-semibold uppercase tracking-[.14em] hover:bg-surface">
          {t(ui.open)} <span className="transition-transform group-hover:translate-x-1.5">→</span>
        </button>
        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border-l hairline px-4 font-mono text-[10px] uppercase text-mute hover:bg-cobalt hover:text-white" aria-label={`Visit ${p.name} (opens in new tab)`}>
            {t(ui.visit)} <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectDetailDrawer({ id, onClose, onOpen }: { id: string | null; onClose: () => void; onOpen: (id: string) => void }) {
  const p = projects.find((x) => x.id === id);
  const [playing, setPlaying] = useState<string | null>(null);
  const { t } = usePrefs();
  const related = p ? projects.filter((x) => x.id !== p.id && (x.division === p.division || x.tags.some((tg) => p.tags.includes(tg)))).slice(0, 4) : [];
  const vids = p?.videoIds?.map((v) => videos.find((x) => x.id === v)).filter(Boolean) ?? [];
  return (
    <Drawer open={!!p} onClose={() => { setPlaying(null); onClose(); }} label={p ? `${p.name} dossier` : 'Project'} wide>
      {p && (
        <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="label">{p.tab} · {divisionName(p.division)}</p>
          <h2 className="mt-2 font-display text-4xl md:text-6xl font-black uppercase leading-[.9]">{p.name}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <StatusLabel status={p.status} source={p.statusSource} />
            {p.lastVerified && <span className="font-mono text-[10px] text-mute">LAST CHECKED {p.lastVerified}</span>}
          </div>
          {p.note && <p className="mt-5 border border-dashed hairline p-3 text-xs text-mute"><span className="text-ink">Note · </span>{p.note}</p>}

          <dl className="mt-8 grid gap-6">
            <div><dt className="label">What it is</dt><dd className="mt-2 leading-relaxed">{p.description}</dd></div>
            <div><dt className="label">Problem addressed</dt><dd className="mt-2 leading-relaxed text-ink/85">{p.problem}</dd></div>
            <div><dt className="label">Observed features</dt>
              <dd className="mt-2"><ul className="grid gap-1.5 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="font-head text-sm">— {f}</li>)}</ul></dd></div>
            {p.technologies && <div><dt className="label">Technologies (verified from build)</dt><dd className="mt-2 font-mono text-sm">{p.technologies.join(' · ')}</dd></div>}
            <div><dt className="label">Relationship to Hevloys Group</dt><dd className="mt-2 text-sm">Part of {divisionName(p.division)}{p.division !== 'group' ? ', a Hevloys Group division' : ''}.</dd></div>
            <div className="border-l-2 border-dashed border-cobalt pl-4"><dt className="label">Long-term opportunity · possibility, not outcome</dt><dd className="mt-2 text-sm text-mute">{p.opportunity}</dd></div>
          </dl>

          {vids.length > 0 && (
            <div className="mt-10">
              <p className="label mb-3">Related briefing</p>
              {vids.map((v) => v && (
                <div key={v.id} className="overflow-hidden rounded-[6px] border hairline">
                  {playing === v.id ? (
                    <iframe className="aspect-video w-full" src={embedUrl(v.id)} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                  ) : (
                    <button onClick={() => setPlaying(v.id)} className="group relative block w-full" aria-label={`Play ${v.title}`}>
                      <img src={thumb(v.id)} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30"><span className="flex h-14 w-14 items-center justify-center bg-cobalt text-white transition-transform group-hover:scale-110"><Play size={20} /></span></span>
                    </button>
                  )}
                  <p className="p-3 font-head text-sm">{v.title}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-2 sm:grid-cols-2">
            {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-between bg-cobalt px-5 font-head text-xs font-semibold uppercase tracking-[.14em] text-white">{t(ui.visit)} · {host(p.url)} <ArrowUpRight size={14} /></a>}
            <a href={whatsapp('partner')} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-between border hairline px-5 font-head text-xs font-semibold uppercase tracking-[.14em] hover:border-cobalt">Discuss this project <ArrowUpRight size={14} /></a>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <p className="label mb-3">Related nodes</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {related.map((r) => (
                  <button key={r.id} onClick={() => { setPlaying(null); onOpen(r.id); }} className="border hairline p-3 text-left hover:border-cobalt">
                    <p className="font-head text-sm font-semibold">{r.name}</p><p className="text-xs text-mute line-clamp-1">{r.short}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </Drawer>
  );
}

export function ProjectRegistry({ onOpen }: { onOpen: (id: string) => void }) {
  const [tab, setTab] = useState<ProjectTab | 'ALL'>('ALL');
  const [tag, setTag] = useState<ProjectTag | null>(null);
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter((p) =>
      (tab === 'ALL' || p.tab === tab) && (!tag || p.tags.includes(tag)) &&
      (!s || [p.name, p.short, p.description, ...p.tags, ...(p.technologies ?? [])].join(' ').toLowerCase().includes(s)));
  }, [tab, tag, q]);
  return (
    <section id="projects" className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
      <SectionHead index="06" kicker="Project ecosystem" title="The registry"
        lede="Every project, with context. Each status shows its source: inspected (the site was loaded and read on 5 November 2026), founder-provided, or unverified." />
      <ProjectFilters tab={tab} setTab={setTab} tag={tag} setTag={setTag} q={q} setQ={setQ} count={list.length} />
      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProjectCard key={p.id} p={p} index={projects.indexOf(p)} featured={i === 0 && tab === 'ALL' && !tag && !q} onOpen={() => onOpen(p.id)} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <div className="border border-dashed hairline p-12 text-center">
          <p className="font-head">No project matches that filter.</p>
          <button onClick={() => { setTab('ALL'); setTag(null); setQ(''); }} className="mt-4 label text-cobalt">Reset filters</button>
        </div>
      )}
    </section>
  );
}
