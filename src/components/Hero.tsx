import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { identity, whatsapp } from '../data/identity';
import { tagline } from '../data/content';
import { projects } from '../data/projects';
import { videos } from '../data/videos';
import { ui, usePrefs } from '../lib/prefs';
import { useFinePointer } from '../lib/hooks';

/** Pulls its child gently toward the pointer within `radius`, then springs back. */
export function MagneticElement({ children, radius = 140, strength = 3 }: { children: ReactNode; radius?: number; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const [near, setNear] = useState(false);
  const sx = useSpring(x, { stiffness: near ? 220 : 90, damping: near ? 20 : 18 });
  const sy = useSpring(y, { stiffness: near ? 220 : 90, damping: near ? 20 : 18 });
  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e: PointerEvent) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const edge = Math.max(0, Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0)));
      if (edge < radius) { setNear(true); x.set((dx / r.width) * strength * 8); y.set((dy / r.height) * strength * 8); }
      else { setNear(false); x.set(0); y.set(0); }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [fine, reduce, radius, strength, x, y]);
  return <motion.div ref={ref} style={{ x: sx, y: sy }}>{children}</motion.div>;
}

const frontiers = ['SOVEREIGN COMPUTE', 'ABUNDANT ENERGY', 'INFORMAL ECONOMIES', 'AUTONOMOUS LOGISTICS', 'EQUATORIAL AEROSPACE', 'CAPITAL FORMATION'];

function CyclingWord() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % frontiers.length), 2600); return () => clearInterval(t); }, []);
  return (
    <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
      <motion.span key={i} className="cycle-word" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>{frontiers[i]}</motion.span>
    </span>
  );
}

export function HeroSection() {
  const { t } = usePrefs();
  const ease = [0.2, 0.8, 0.2, 1] as const;
  const live = projects.filter((p) => p.url).length;
  return (
    <section id="overview" className="relative min-h-[100svh] overflow-hidden pt-14">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-app gap-10 px-5 pb-24 pt-10 md:px-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:pt-20">
        <div>
          <motion.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="text-cobalt">●</span> Evans Ongwae Cave · Personal headquarters
          </motion.p>
          <h1 className="mt-6 font-display font-black uppercase fluid-xl">
            {['Evans', 'Ongwae', 'Onchoke'].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span className={`block ${i === 2 ? 'text-transparent [-webkit-text-stroke:1px_rgb(var(--hi))]' : 'display-gradient'}`}
                  initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="mt-8 font-head text-lg md:text-2xl font-semibold uppercase tracking-[.06em] text-ink" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            {t(tagline)}
          </motion.p>
          <motion.p className="mt-3 font-mono text-xs md:text-sm text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            CURRENT FOCUS → <CyclingWord />
          </motion.p>
          <motion.div className="mt-8 max-w-2xl space-y-4 text-mute md:text-lg leading-relaxed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <p>Founder of <span className="kw">Hevloys Group</span>. Builder, <span className="kw">systems thinker</span> and independent explorer of the <span className="kw">technologies and infrastructure</span> that will shape humanity's future.</p>
            <p>From practical software and automation to longer-horizon ambitions in <span className="kw">artificial intelligence</span>, <span className="kw">energy</span>, <span className="kw">aviation and space</span>, the work is about building capabilities that expand what is possible.</p>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { href: '#about', label: t(ui.enter), primary: true },
              { href: '#projects', label: t(ui.explore) },
              { href: whatsapp('general'), label: t(ui.contactEvans), ext: true },
            ].map((b, i) => (
              <motion.a key={b.label} href={b.href} {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 + i * 0.1 }}
                className={`group flex h-12 items-center gap-3 px-6 font-head text-[12px] font-semibold uppercase tracking-[.16em] ${b.primary ? 'bg-cobalt text-white' : 'border hairline text-ink hover:border-cobalt'}`}>
                {b.label}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.4, ease }} className="relative mx-auto w-full max-w-[420px]">
          <MagneticElement>
            <figure className="relative">
              <div className="absolute -inset-3 border hairline" aria-hidden />
              <div className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-cobalt" aria-hidden />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-cobalt" aria-hidden />
              <div className="overflow-hidden rounded-[6px] bg-surface">
                <img src={identity.portrait} alt="Portrait of Evans Ongwae Onchoke" width={600} height={600} className="aspect-[4/5] w-full object-cover object-top grayscale-[35%] contrast-[1.05]" />
              </div>
              <figcaption className="glass-1 absolute bottom-4 left-4 right-4 flex justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[.14em]">
                <span>Founder &amp; Chief Architect</span><span className="text-cobalt">Nairobi · EAT</span>
              </figcaption>
            </figure>
          </MagneticElement>
          <dl className="mt-8 grid grid-cols-3 border-t hairline">
            {[[String(projects.length), 'Registry entries'], [String(live), 'Linked sites'], [String(videos.length), 'Archived videos']].map(([n, l]) => (
              <div key={l} className="border-r hairline py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-3">
                <dt className="label !text-[9px]">{l}</dt><dd className="font-display text-3xl font-bold">{n}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 label md:flex lg:bottom-8" aria-label="Scroll to introduction">
        Scroll <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
