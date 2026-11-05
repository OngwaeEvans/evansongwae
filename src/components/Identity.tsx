import { useState } from 'react';
import { intro, loop, principles, requirements, thinking, forces, type ForceId } from '../data/content';
import { AnimatedText, FadeIn, SectionHead } from './shared';

export function IntroductionSection() {
  return (
    <section id="about" className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
      <SectionHead index="02" kicker="The introduction" title="Before the projects, a way of seeing" />
      <div className="grid gap-12 lg:grid-cols-[180px_1fr]">
        <div />
        <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-ink/90">
            {intro.slice(1).map((p, i) => <FadeIn key={i} delay={i * 0.05}><p>{p}</p></FadeIn>)}
          </div>
          <FadeIn delay={0.2} className="space-y-8">
            <div className="border-l-2 border-cobalt pl-5">
              <p className="label">Identity</p>
              <p className="mt-2 font-display text-2xl font-bold uppercase">Evans Ongwae Onchoke</p>
              <p className="mt-1 font-head text-sm text-mute">Founder and Chief Architect, Hevloys Group. An independent builder and systems-oriented thinker working where technology, business, infrastructure and human possibility meet.</p>
            </div>
            <div>
              <p className="label mb-3">Way of thinking: interests & working principles</p>
              <ul className="divide-y divide-[rgb(var(--line))] border-y hairline">
                {thinking.map((x, i) => (
                  <li key={x} className="group flex gap-3 py-2.5 font-head text-sm transition-colors hover:text-cobalt">
                    <span className="font-mono text-[10px] text-mute pt-0.5">{String(i + 1).padStart(2, '0')}</span>{x}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="mt-24 grid gap-12 lg:grid-cols-[180px_1fr]">
        <p className="label">Ideas → execution</p>
        <div>
          <AnimatedText as="h3" text="The small projects are exercises. The capability they build is the point." className="font-display text-3xl md:text-5xl font-extrabold uppercase leading-[.95]" />
          <ol className="mt-10 grid grid-cols-2 gap-px bg-[rgb(var(--line))] border hairline sm:grid-cols-4">
            {loop.map((s, i) => (
              <li key={s} className="group relative bg-bg p-5 transition-colors hover:bg-surface">
                <span className="font-mono text-[10px] text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-6 font-head text-sm font-semibold uppercase tracking-wide">{s}</p>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-cobalt transition-all duration-500 group-hover:w-full" />
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <p className="text-mute leading-relaxed">This is not a finished founder story. The ambitions here need things that don't exist yet in this ecosystem, and that is the honest starting point. Not every concept on this site has been implemented, and each project is labelled with what is actually true about it.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase text-ink">
              {requirements.map((r) => <span key={r}><span className="text-cobalt">+</span> {r}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section id="philosophy" className="border-y hairline bg-bg2">
      <div className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
        <SectionHead index="03" kicker="The philosophy" title="The way I see the world" lede="Ten working principles. Hover or tap a card to see how each one shows up in practice." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => (
            <FadeIn key={i} delay={(i % 5) * 0.05}>
              <button type="button" className="flip block h-64 w-full text-left" data-flipped={flipped === i}
                onClick={() => setFlipped(flipped === i ? null : i)} aria-pressed={flipped === i} aria-label={`Principle ${i + 1}: ${p.title}`}>
                <div className="flip-inner">
                  <div className="flip-face flex flex-col justify-between border hairline bg-panel p-5">
                    <span className="font-display text-5xl font-black text-mute/30">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-head text-[15px] font-semibold leading-snug">{p.title}</p>
                  </div>
                  <div className="flip-face flip-back flex flex-col justify-between border border-cobalt bg-surface p-5">
                    <span className="label text-cobalt">In practice</span>
                    <p className="text-sm leading-relaxed text-ink/90">{p.back}</p>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManifestoSection() {
  const [active, setActive] = useState<ForceId | null>(null);
  const [flipped, setFlipped] = useState<ForceId | null>(null);
  return (
    <section aria-labelledby="why" className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="label"><span className="text-cobalt">04</span> &nbsp;The manifesto</p>
          <h2 id="why" className="mt-6 font-display font-black uppercase fluid-lg display-gradient">Why build at all?</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
            <AnimatedText as="p" text="Technology matters because of what it makes possible." className="font-head text-2xl font-semibold text-ink" />
            <p>These forces shape the possibilities available to societies. I want to take part in understanding and building them. The projects are an evolving record of that intention.</p>
            <p className="text-mute">The goal is not to collect company names or chase wealth for its own sake. The destination is larger than the current starting point.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" onMouseLeave={() => setActive(null)}>
          {forces.map((f) => (
            <button key={f.id} type="button" className="force flip flip-click relative h-52 text-left" data-flipped={flipped === f.id}
              data-active={active === f.id} data-wave={active !== null && active !== f.id}
              onMouseEnter={() => setActive(f.id)} onFocus={() => setActive(f.id)} onBlur={() => setActive(null)}
              onClick={() => setFlipped(flipped === f.id ? null : f.id)} aria-pressed={flipped === f.id}>
              <div className="flip-inner">
                <div className="flip-face force overflow-hidden border hairline bg-panel p-6 transition-all duration-500" data-wave={active !== null && active !== f.id} data-active={active === f.id}>
                  <div className={`force-fx fx-${f.id}`} aria-hidden />
                  <p className="label relative">{f.id === active ? 'Active' : 'Force'}</p>
                  <p className="relative mt-10 font-display text-3xl font-extrabold uppercase">{f.name}</p>
                  <p className="relative mt-2 text-sm text-mute">{f.line}</p>
                </div>
                <div className="flip-face flip-back border border-cobalt bg-surface p-6">
                  <p className="label text-cobalt">{f.name}: the thesis</p>
                  <p className="mt-4 text-sm leading-relaxed">{f.back}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
