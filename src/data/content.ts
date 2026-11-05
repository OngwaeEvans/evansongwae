import type { Bi } from '../types';

export const sections = [
  { id: 'overview', label: { en: 'Overview', sw: 'Muhtasari' } },
  { id: 'about', label: { en: 'About Evans', sw: 'Kuhusu Evans' } },
  { id: 'philosophy', label: { en: 'The Philosophy', sw: 'Falsafa' } },
  { id: 'hevloys', label: { en: 'Hevloys Group', sw: 'Hevloys Group' } },
  { id: 'projects', label: { en: 'Projects', sw: 'Miradi' } },
  { id: 'media', label: { en: 'Media', sw: 'Habari' } },
  { id: 'vision', label: { en: 'The Vision', sw: 'Maono' } },
  { id: 'achievements', label: { en: 'Achievements', sw: 'Mafanikio' } },
  { id: 'partnerships', label: { en: 'Partnerships', sw: 'Ushirikiano' } },
  { id: 'contact', label: { en: 'Contact', sw: 'Mawasiliano' } },
] as const;
export type SectionId = (typeof sections)[number]['id'];

export const intro: string[] = [
  'Before the projects, there is a way of looking at the world.',
  'I am Evans Ongwae Onchoke, the founder of Hevloys Group. My interests lie in understanding how systems work, why certain problems persist, what prevents people and societies from progressing, and what becomes possible when technology, resources and human intelligence are organised differently.',
  'I do not see technology as an end in itself. I see it as an instrument through which human capability can expand.',
  'Some of the projects gathered here are practical tools responding to immediate problems. Others are experiments in software, automation, media, finance and technology. Beyond them lies a larger ambition: to take part in building the infrastructure that will determine what the next generations can achieve.',
  'The Cave makes that journey visible, so you can examine the work, understand the direction and decide whether you want to be part of it.',
];

export const thinking = [
  'First-principles thinking', 'Understanding underlying mechanisms', 'Connecting separate disciplines',
  'Learning through experimentation', 'Building practical solutions to observed problems', 'Developing independent technical capability',
  'How capital and infrastructure decide what can be built', 'Translating ideas into working systems',
  'Thinking beyond immediate constraints', 'The relationship between technology and society',
];

export const loop = ['See a problem', 'Understand its structure', 'Design a solution', 'Build a prototype', 'Test against reality', 'Learn from limits', 'Improve the system', 'Earn larger work'];

export const requirements = ['Capital', 'Engineering talent', 'Research', 'Infrastructure', 'Time', 'Strategic relationships', 'Operational discipline', 'Access to resources'];

export const principles: { title: string; back: string }[] = [
  { title: 'Humanity’s capabilities are shaped by the systems it builds.', back: 'So the leverage point is the system, not individual effort. Fix the structure and many outcomes change together.' },
  { title: 'Energy is a foundational constraint on industrial and computational progress.', back: 'Every factory, data centre and cold chain is downstream of a power supply. Without cheap, reliable energy, nothing else scales.' },
  { title: 'Computation and AI can change how people solve problems.', back: 'Local models running on modest hardware already automate real work. The question is who owns that capability.' },
  { title: 'Infrastructure determines what societies can produce and distribute.', back: 'The SGR, M-Pesa and fibre each opened markets that had not existed. Infrastructure is the platform an economy runs on.' },
  { title: 'Capital and resources affect the speed and scale of execution.', back: 'Ideas are cheap. Capital decides how fast they meet reality, which is why capital formation is a division in itself.' },
  { title: 'Technology should address meaningful human problems.', back: 'Chamas, informal work, logistics, security: each project starts from a problem that someone can name.' },
  { title: 'Local constraints should not dictate the limits of long-term ambition.', back: 'A 2012 laptop can still run experiments. Starting points constrain speed, not direction.' },
  { title: 'Knowledge becomes valuable when translated into capability.', back: 'Ship, measure, learn. Every deployed page in this registry is a lesson converted into a skill.' },
  { title: 'Collaboration allows work that would be impossible alone.', back: 'Energy, aerospace and compute are team sports. This Cave exists partly to find the team.' },
  { title: 'The future can be investigated, designed and built.', back: 'Not predicted from the sidelines. Treated as an engineering problem with unknowns to reduce.' },
];

export type ForceId = 'energy' | 'computation' | 'infrastructure' | 'intelligence' | 'capital' | 'collaboration';
export const forces: { id: ForceId; name: string; line: string; back: string }[] = [
  { id: 'energy', name: 'Energy', line: 'Determines what can be powered.', back: 'Industrial growth tracks energy per person. Unreliable grids cap every other ambition in the region.' },
  { id: 'computation', name: 'Computation', line: 'Determines what can be processed.', back: 'Compute is becoming the new raw material. Owning some of it locally is a strategic choice.' },
  { id: 'infrastructure', name: 'Infrastructure', line: 'Determines what can be connected, produced and moved.', back: 'Roads, rail, payments and data links decide which markets can exist at all.' },
  { id: 'intelligence', name: 'Intelligence', line: 'Allows complex problems to be investigated.', back: 'Human and machine intelligence together shorten the distance from question to answer.' },
  { id: 'capital', name: 'Capital', line: 'Allows ideas to become systems.', back: 'Without capital formation, good ideas stay as landing pages. That is the honest current constraint.' },
  { id: 'collaboration', name: 'Collaboration', line: 'Lets individuals work beyond their own resources.', back: 'No single founder builds infrastructure. Coordination at scale is the multiplier.' },
];

export const horizons = [
  { code: 'H01', name: 'Build and Learn', when: 'Now / near term', marker: 'WHAT EXISTS & IS BEING DEVELOPED',
    items: ['Practical software', 'Product development', 'AI-assisted tools', 'Automation', 'Digital infrastructure', 'Community-oriented products', 'Market research', 'Business development', 'Demonstrable technical capability', 'Credibility and partnerships'] },
  { code: 'H02', name: 'Develop Capabilities', when: 'Medium term · target', marker: 'WHAT IS BEING EXPLORED',
    items: ['More advanced AI systems', 'Localised compute infrastructure', 'Industrial automation', 'Energy systems research', 'Financial intelligence', 'Research partnerships', 'Engineering talent', 'Regional infrastructure opportunities'] },
  { code: 'H03', name: 'Expand the Frontier', when: 'Long term · ambition', marker: 'WHAT IS ENVISIONED',
    items: ['Advanced energy systems', 'Sovereign compute', 'Industrial development', 'Aviation and aerospace', 'Equatorial space opportunities', 'Orbital technology', 'R&D infrastructure', 'Technologies that expand human capability'] },
];

export const milestones: { date: string; title: string; detail: string; evidence: string }[] = [
  { date: '2025-10-15', title: 'Public documentation begins', detail: 'The first video in the archive, "letting go of fear", is published.', evidence: 'YouTube publish date' },
  { date: '2025-12', title: 'Long-form systems content', detail: 'Wealth and education breakdowns begin on the channel.', evidence: 'YouTube publish dates' },
  { date: '2026-01-16', title: '“Why I’m Documenting My Life”', detail: 'States publicly the intention to build Heless Industries, with a timeline.', evidence: 'YouTube publish date' },
  { date: '2026-03-01', title: 'SGR engineering deep-dive', detail: 'First engineering and infrastructure breakdown published.', evidence: 'YouTube publish date' },
  { date: 'Date unconfirmed', title: 'Hevloys digital ecosystem deployed', detail: '22+ web projects deployed across finance, AI, logistics, health and community. All were reachable on 2026-11-05.', evidence: 'Sites inspected 2026-11-05' },
  { date: 'Date unconfirmed', title: 'NJia Automations', detail: 'Automation service portal live; founder reports it as active.', evidence: 'Site inspected; status founder-provided' },
  { date: 'Date unconfirmed', title: 'Jua Kali ecosystem pilot', detail: 'Informal-sector tools in pilot (founder-provided).', evidence: 'Founder-provided' },
  { date: 'Ongoing', title: 'Local-first AI experiments', detail: 'Ollama, Gemma, Qwen and Aider on a 3rd-gen i5 laptop.', evidence: 'Founder-provided' },
];

export const consoleProfile = {
  hardware: [
    ['Laptop', 'HP EliteBook 8470p'], ['CPU', 'Intel Core i5 (3rd gen)'], ['Memory', '8 GB RAM'],
    ['Mobile', 'Infinix Note 12i'], ['Typing', '83 WPM'],
  ],
  software: ['Ollama', 'Gemma', 'Qwen', 'Aider', 'Python', 'TypeScript', 'React', 'Browser automation', 'Netlify'],
  markets: ['MetaTrader 4/5', 'TradingView', 'COT data'],
  approach: 'Small, quantised local models; offloading heavy builds to free cloud tiers; shipping static-first sites that cost almost nothing to run. This is deliberately modest hardware. The point is resourcefulness, not performance claims.',
  interests: ['Agentic software', 'Local LLM orchestration', 'Energy for compute', 'Logistics coordination', 'Market microstructure'],
};

export const tagline: Bi = { en: 'Engineering the infrastructure of human expansion', sw: 'Kusanifu miundombinu ya upanuzi wa binadamu' };
