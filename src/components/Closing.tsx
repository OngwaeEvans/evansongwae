import { ArrowUpRight, MessageCircle, MessageSquare, Phone, Share2 } from 'lucide-react';
import { horizons, milestones } from '../data/content';
import { contact, identity, sms, tel, whatsapp, type MessageKey } from '../data/identity';
import { ui, usePrefs } from '../lib/prefs';
import { AnimatedText, FadeIn, SectionHead } from './shared';

export function VisionSection() {
  return (
    <section id="vision" className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
      <SectionHead index="08" kicker="Beyond the current projects" title="The work is smaller than the vision. The direction is not." />
      <div className="grid gap-12 lg:grid-cols-[180px_1fr]">
        <div />
        <div className="grid gap-10 md:grid-cols-2">
          <FadeIn className="space-y-5 text-lg leading-relaxed text-ink/85">
            <p>The projects visible here are an early layer of a much larger undertaking. Useful software, automation and small products are how execution is learned: they build experience, expose limits and create opportunities.</p>
            <p className="text-mute">These questions can't be answered by ambition alone. They need knowledge, engineering, capital, infrastructure, collaboration and sustained execution.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="space-y-4 font-head text-lg">
              {['How can energy become more accessible and abundant?', 'How can computation become widely available and locally controlled?', 'How can Africa take part in the industries of the coming century?', 'How can aviation and autonomous logistics loosen geography\'s grip on opportunity?'].map((q) => (
                <li key={q} className="border-l-2 border-cobalt pl-4">{q}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
      <ol className="mt-20 grid gap-px border hairline bg-[rgb(var(--line))] lg:grid-cols-3" aria-label="Vision horizons">
        {horizons.map((h, i) => (
          <li key={h.code} className="group relative bg-panel p-6 md:p-8">
            <div className="absolute left-0 top-0 h-[3px] bg-cobalt transition-all duration-700 group-hover:w-full" style={{ width: `${(i + 1) * 33}%`, opacity: 1 - i * 0.25 }} />
            <p className="font-mono text-xs text-cobalt">{h.code} · {h.when}</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase">{h.name}</h3>
            <p className="mt-2 inline-block border hairline px-2 py-1 font-mono text-[10px] text-mute">{h.marker}</p>
            <ul className="mt-6 space-y-2 text-sm">{h.items.map((x) => <li key={x} className="text-ink/85">— {x}</li>)}</ul>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-[11px] text-mute">Horizons 02 and 03 are directions and targets, not guaranteed outcomes.</p>
    </section>
  );
}

export function AchievementTimeline() {
  return (
    <section id="achievements" className="border-y hairline bg-bg2">
      <div className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
        <SectionHead index="09" kicker="Achievements & evolution" title="A record of real work" lede="Only what can be evidenced. Where no date was supplied, it says so instead of inventing one." />
        <ol className="relative ml-2 border-l hairline">
          {milestones.map((m, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <li className="group relative pb-10 pl-8">
                <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] border border-cobalt bg-bg transition-colors group-hover:bg-cobalt" />
                <p className={`font-mono text-xs ${m.date.startsWith('20') ? 'text-cobalt' : 'text-mute italic'}`}>{m.date}</p>
                <h3 className="mt-1 font-head text-xl font-semibold">{m.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-ink/80">{m.detail}</p>
                <p className="mt-1 font-mono text-[10px] uppercase text-mute">Evidence · {m.evidence}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}

const paths: { k: string; who: string; action: string; href: string; ext?: boolean }[] = [
  { k: 'Explore', who: 'Understand the existing work.', action: 'Explore projects', href: '#projects' },
  { k: 'Invest', who: 'Evaluate opportunities to support future development. No terms or returns are offered here.', action: 'Start an investment conversation', href: whatsapp('invest'), ext: true },
  { k: 'Partner', who: 'Organisations and individuals interested in collaboration.', action: 'Discuss a partnership', href: whatsapp('partner'), ext: true },
  { k: 'Build', who: 'Engineers, researchers, designers and capable operators.', action: 'Discuss working together', href: whatsapp('build'), ext: true },
  { k: 'Follow', who: 'Follow the journey as it unfolds.', action: 'Open the social links', href: contact.linktree, ext: true },
  { k: 'Contact', who: 'Speak directly with Evans.', action: 'WhatsApp or phone', href: '#contact' },
];

export function PartnershipPortal() {
  return (
    <section id="partnerships" className="mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
      <SectionHead index="10" kicker="Partnerships" title="Build what comes next"
        lede="The work ahead needs more than ideas: capable people, technical knowledge, capital, infrastructure, research, distribution and long-term partners. Whatever you bring, there is room for a serious conversation." />
      <div className="grid gap-px border hairline bg-[rgb(var(--line))] sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p, i) => (
          <a key={p.k} href={p.href} {...(p.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group relative flex min-h-[220px] flex-col bg-panel p-6 transition-colors hover:bg-surface">
            <span className="font-mono text-[10px] text-mute">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-6 font-display text-4xl font-black uppercase transition-colors group-hover:text-cobalt">{p.k}</h3>
            <p className="mt-2 text-sm text-mute">{p.who}</p>
            <span className="mt-auto flex items-center justify-between pt-6 font-head text-[11px] font-semibold uppercase tracking-[.14em]">
              {p.action}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ContactHub() {
  const { t } = usePrefs();
  const items = [
    { label: t(ui.whatsapp), sub: contact.phoneDisplay, href: whatsapp('general'), Icon: MessageCircle, ext: true, primary: true },
    { label: t(ui.call), sub: contact.phoneDisplay, href: tel, Icon: Phone },
    { label: t(ui.text), sub: 'SMS', href: sms, Icon: MessageSquare },
    { label: t(ui.socials), sub: 'linktr.ee/EvansOngwaeOnchoke', href: contact.linktree, Icon: Share2, ext: true },
  ];
  const intents: [MessageKey, string][] = [['invest', 'Investment'], ['partner', 'Partnership'], ['build', 'Technical collaboration'], ['general', 'General enquiry']];
  return (
    <section id="contact" className="relative overflow-hidden border-t hairline">
      <div className="blueprint absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-app px-5 py-24 md:px-10 md:py-36">
        <p className="label"><span className="text-cobalt">11</span> &nbsp;Contact & exit</p>
        <AnimatedText text="Talk to Evans directly." className="mt-6 font-display font-black uppercase fluid-xl display-gradient" />
        <p className="mt-6 max-w-xl text-mute">No forms, no gatekeepers. Every button below opens a real channel to the same phone number. There is no email address on purpose.</p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ label, sub, href, Icon, ext, primary }) => (
            <a key={label} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`group flex flex-col justify-between gap-10 p-6 transition-all hover:-translate-y-1 ${primary ? 'bg-cobalt text-white' : 'glass-1 hover:border-cobalt'}`}>
              <Icon size={22} />
              <span><span className="block font-head text-sm font-semibold uppercase tracking-[.12em]">{label}</span><span className={`mt-1 block font-mono text-[11px] ${primary ? 'text-white/80' : 'text-mute'}`}>{sub}</span></span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <p className="label mb-3">Or start with a pre-written message</p>
          <div className="flex flex-wrap gap-2">
            {intents.map(([k, l]) => <a key={k} href={whatsapp(k)} target="_blank" rel="noopener noreferrer" className="border hairline bg-bg px-3 py-2 font-head text-xs uppercase tracking-wider hover:border-cobalt hover:text-cobalt">{l} →</a>)}
            <a href={contact.linktreeSecondary} target="_blank" rel="noopener noreferrer" className="border border-dashed hairline px-3 py-2 font-mono text-[11px] text-mute hover:text-ink">Secondary socials ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t hairline bg-bg pb-24 lg:pb-0">
      <div className="mx-auto max-w-app px-5 py-16 md:px-10">
        <p className="max-w-4xl font-display text-2xl md:text-4xl font-extrabold uppercase leading-tight">
          The future is not a spectacle to observe. It is a system to understand, an infrastructure to build and a possibility to expand.
        </p>
        <p className="mt-6 font-display text-xl font-bold uppercase text-cobalt">Welcome to the Cave.</p>
        <div className="mt-12 flex flex-col gap-6 border-t hairline pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-head font-semibold uppercase tracking-[.12em]">{identity.name}</p>
            <p className="label mt-1">Founder & Chief Architect · Hevloys Group</p>
          </div>
          <div className="flex flex-wrap gap-4 label">
            <a className="hover:text-ink" href={contact.linktree} target="_blank" rel="noopener noreferrer">Linktree</a>
            <a className="hover:text-ink" href={contact.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a className="hover:text-ink" href="https://hevloys-group.netlify.app/" target="_blank" rel="noopener noreferrer">Hevloys Group</a>
            <span>© {new Date().getFullYear()} Evans Ongwae Cave</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
