import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play, Radio } from 'lucide-react';
import type { VideoCategory } from '../types';
import { videoCategories, videos, thumb, watchUrl, embedUrl } from '../data/videos';
import { contact } from '../data/identity';
import { ui, usePrefs } from '../lib/prefs';
import { FadeIn, SectionHead } from './shared';

const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

function VideoCard({ v }: { v: (typeof videos)[number] }) {
  const [play, setPlay] = useState(false);
  const { t } = usePrefs();
  const cat = videoCategories.find((c) => c.id === v.category)!;
  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}
      className="group flex flex-col border hairline bg-panel transition-colors hover:border-cobalt/60">
      <div className="relative overflow-hidden">
        {play ? (
          <iframe className="aspect-video w-full" src={embedUrl(v.id)} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button onClick={() => setPlay(true)} className="relative block w-full" aria-label={`${t(ui.play)}: ${v.title}`}>
            <img src={thumb(v.id)} alt="" loading="lazy" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
            <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center bg-cobalt text-white transition-transform group-hover:scale-110"><Play size={16} /></span>
            {(v.live || v.short) && <span className="absolute right-3 top-3 flex items-center gap-1 bg-bg/85 px-2 py-1 font-mono text-[10px] uppercase">{v.live ? <><Radio size={11} className="text-cobalt" />Streamed live</> : 'Short'}</span>}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase text-mute"><time dateTime={v.date}>{fmt(v.date)}</time> · {t(cat.label)}</p>
        <h3 className="mt-2 font-head text-base font-semibold leading-snug">{v.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">{v.summary}</p>
        <a href={watchUrl(v.id)} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4 inline-flex items-center gap-1.5 self-start font-head text-[11px] font-semibold uppercase tracking-[.14em] text-ink hover:text-cobalt">
          {t(ui.watch)} <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

/** Two opposing tracks of real video thumbnails, nudged by scroll. */
export function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);
  const a = videos.slice(0, 10), b = videos.slice(10);
  const Row = ({ items, reverse }: { items: typeof videos; reverse?: boolean }) => (
    <div className={`marquee gap-3 ${reverse ? 'reverse' : ''}`}>
      {[...items, ...items].map((v, i) => (
        <a key={i} href={watchUrl(v.id)} target="_blank" rel="noopener noreferrer" tabIndex={i >= items.length ? -1 : 0} aria-hidden={i >= items.length}
          className="relative block w-[260px] shrink-0 overflow-hidden rounded-[6px] border hairline md:w-[340px]">
          <img src={thumb(v.id)} alt={v.title} loading="lazy" className="aspect-video w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
        </a>
      ))}
    </div>
  );
  return (
    <div ref={ref} className="marquee-wrap my-16 space-y-3 overflow-hidden" aria-label="Moving archive of videos">
      <motion.div style={{ x: x1 }}><Row items={a} /></motion.div>
      <motion.div style={{ x: x2 }}><Row items={b} reverse /></motion.div>
    </div>
  );
}

export function MediaSection() {
  const [cat, setCat] = useState<VideoCategory | 'all'>('all');
  const { t } = usePrefs();
  const list = useMemo(() => videos.filter((v) => cat === 'all' || v.category === cat).sort((a, b) => b.date.localeCompare(a.date)), [cat]);
  const blurb = videoCategories.find((c) => c.id === cat)?.blurb;
  return (
    <section id="media" className="border-y hairline bg-bg2 py-24 md:py-36">
      <div className="mx-auto max-w-app px-5 md:px-10">
        <SectionHead index="07" kicker="Hevloys Media · Who's4K" title="A forensic audit of my mind"
          lede="A forensic audit of my mind, my projects, and my journey to building Heless Industries. Unfiltered. Authentic. Real." />
        <FadeIn>
          <div className="mb-10 grid gap-6 border hairline bg-panel p-6 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-3xl text-ink/85 leading-relaxed">I don't hide the mess; I show the evolution. These are real videos from my channel, recorded from age 21 into 22: tearing down institutional programming, dissecting leverage, breaking down infrastructure, and documenting ordinary days. Every one plays right here.</p>
            <div className="flex flex-wrap gap-2">
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center gap-2 bg-cobalt px-5 font-head text-[11px] font-semibold uppercase tracking-[.14em] text-white">YouTube {contact.youtubeHandle} <ArrowUpRight size={13} /></a>
              <a href={contact.linktree} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center gap-2 border hairline px-5 font-head text-[11px] font-semibold uppercase tracking-[.14em] hover:border-cobalt">Linktree <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </FadeIn>
        <div role="tablist" aria-label="Video categories" className="no-scrollbar mb-4 flex gap-1 overflow-x-auto border-b hairline">
          {videoCategories.map((c) => {
            const n = c.id === 'all' ? videos.length : videos.filter((v) => v.category === c.id).length;
            return (
              <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
                className={`relative shrink-0 px-4 py-3 font-head text-[12px] font-semibold uppercase tracking-[.1em] ${cat === c.id ? 'text-ink' : 'text-mute hover:text-ink'}`}>
                {t(c.label)} <span className="font-mono text-[10px] text-mute">{n}</span>
                {cat === c.id && <motion.span layoutId="media-tab" className="absolute inset-x-0 bottom-0 h-[2px] bg-cobalt" />}
              </button>
            );
          })}
        </div>
        <p className="mb-8 min-h-[1.5rem] font-mono text-xs text-mute">{blurb ? t(blurb) : `${videos.length} videos, newest first.`}</p>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">{list.map((v) => <VideoCard key={v.id} v={v} />)}</AnimatePresence>
        </motion.div>
      </div>
      <ScrollMarquee />
    </section>
  );
}
