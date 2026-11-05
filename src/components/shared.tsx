import { Component, useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import type { ProjectStatus, StatusSource } from '../types';
import { useEscape } from '../lib/hooks';

export function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 24, clipPath: 'inset(0 0 12% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

/** Word-by-word reveal for short statements and headings. */
export function AnimatedText({ text, className = '', as: Tag = 'h2' }: { text: string; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p' }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block"
            initial={reduce ? false : { y: '105%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.045, ease: [0.2, 0.8, 0.2, 1] }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionHead({ index, kicker, title, lede }: { index: string; kicker: string; title: string; lede?: string }) {
  return (
    <header className="mb-10 md:mb-16 grid gap-6 lg:grid-cols-[180px_1fr]">
      <div className="label flex items-start gap-3 pt-2"><span className="text-cobalt">{index}</span><span>{kicker}</span></div>
      <div>
        <AnimatedText text={title} className="font-display font-extrabold uppercase fluid-lg display-gradient" />
        {lede && <FadeIn delay={0.15}><p className="mt-5 max-w-2xl text-mute text-base md:text-lg leading-relaxed">{lede}</p></FadeIn>}
      </div>
    </header>
  );
}

const statusTone: Record<ProjectStatus, string> = {
  ACTIVE: 'bg-cobalt', 'ACTIVE PILOT': 'bg-cobalt', OPERATIONAL: 'bg-cobalt', 'LIVE MEDIA': 'bg-cobalt',
  'IN DEVELOPMENT': 'bg-hi', EXPERIMENTAL: 'bg-hi', 'RESEARCH DIRECTION': 'bg-mute', ARCHIVED: 'bg-mute', 'STATUS UNVERIFIED': 'bg-transparent border border-mute',
};
const sourceLabel: Record<StatusSource, string> = { founder: 'founder-provided', inspected: 'site inspected', unverified: 'unverified' };

export function StatusLabel({ status, source }: { status: ProjectStatus; source?: StatusSource }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[.16em] uppercase">
      <span className={`h-1.5 w-1.5 ${statusTone[status]}`} aria-hidden />
      <span className="text-ink">{status}</span>
      {source && <span className="text-mute">/ {sourceLabel[source]}</span>}
    </span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-cobalt" style={{ scaleX: x }} />;
}

export function Drawer({ open, onClose, label, children, wide }: { open: boolean; onClose: () => void; label: string; children: ReactNode; wide?: boolean }) {
  useEscape(open, onClose);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) ref.current?.focus(); }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div className="absolute inset-0 bg-black/60" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label}
            className={`glass-2 absolute right-0 top-0 h-full w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} overflow-y-auto outline-none`}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
            <button onClick={onClose} className="sticky top-0 ml-auto flex h-12 w-12 items-center justify-center border-l border-b hairline bg-panel text-ink hover:text-cobalt" aria-label="Close panel">
              <X size={18} />
            </button>
            <div className="px-6 pb-16 md:px-10 -mt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export class Boundary extends Component<{ children: ReactNode; name: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <div className="mx-auto max-w-app px-6 py-10 label">{this.props.name} could not load. The rest of the Cave still works.</div>;
    return this.props.children;
  }
}
