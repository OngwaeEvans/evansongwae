import type { DivisionId } from '../types';

export interface Division {
  id: Exclude<DivisionId, 'group'>;
  code: string;
  name: string;
  subtitle: string;
  accent: string;
  purpose: string;
  focus: string[];
  tools?: string[];
  now: string;
  objective: string;
}

export const divisions: Division[] = [
  { id: 'labs', code: '01', name: 'Hevloys Labs', subtitle: 'Machine Intelligence & Sovereign Compute', accent: '#3B82F6',
    purpose: 'Investigates how intelligence, automation and computation can be owned and run locally instead of rented.',
    focus: ['Local-first AI orchestration', 'Autonomous software engines', 'Agentic workflows', 'Local language models', 'AI-assisted engineering', 'Distributed and sovereign computing'],
    tools: ['Ollama', 'Gemma', 'Qwen', 'Python', 'Aider', 'Browser automation'],
    now: 'Experiments with local models on constrained hardware. NJia Automations applies automation to real client work.',
    objective: 'Computational capability with real control over data, automation and industrial processes. Sovereign compute clusters are a strategic objective, not a deployed facility.' },
  { id: 'energy', code: '02', name: 'Hevloys Energy & Infrastructure', subtitle: 'Power, Industrial Systems & Foundational Infrastructure', accent: '#E2E8F0',
    purpose: 'Treats energy as the constraint underneath everything else: computation, manufacturing and regional growth.',
    focus: ['Decentralised power networks', 'Microgrid automation', 'Battery and storage systems', 'Energy optimisation', 'Industrial power availability', 'Energy for compute'],
    now: 'Research direction. No power assets are operated.',
    objective: 'Understand how reliable, affordable energy can support computation, manufacturing and regional industry.' },
  { id: 'aero', code: '03', name: 'Hevloys Aero / Space', subtitle: 'Mobility, Aerospace & Equatorial Infrastructure', accent: '#94A3B8',
    purpose: 'Explores how aviation, autonomous logistics and space technology could weaken geography\'s hold on opportunity in Africa.',
    focus: ['Autonomous regional logistics', 'Cargo drone infrastructure', 'Aerospace engineering', 'Equatorial launch opportunities', 'Orbital hardware research'],
    now: 'Hevloys Logistics (ground coordination) and the PAA Technologies concept. No aircraft or launch systems exist.',
    objective: 'Investigate how East Africa could participate in the coming aerospace and space economy.' },
  { id: 'capital', code: '04', name: 'Hevloys Capital & Market Microstructure', subtitle: 'Financial Intelligence & Capital Formation', accent: '#60A5FA',
    purpose: 'Builds analytical and financial capability, and studies how capital is formed and allocated toward larger objectives.',
    focus: ['Forex analysis', 'Quantitative and algorithmic research', 'Liquidity and market microstructure', 'Capital allocation', 'Financial data systems'],
    tools: ['Exness', 'MetaTrader 4', 'MetaTrader 5', 'TradingView', 'COT data'],
    now: 'Forex Watch (live tool), plus the ChamaChain and PASSKEY concepts.',
    objective: 'Deeper financial intelligence in service of technology and industry. Nothing here is investment advice or a promise of returns.' },
];
