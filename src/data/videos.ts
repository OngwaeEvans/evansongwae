import type { Bi, Video, VideoCategory } from '../types';

/**
 * HEVLOYS MEDIA ARCHIVE
 * Titles and publish dates were checked against YouTube on 2026-11-05.
 * Add a video by appending { id, title, date, category, summary }.
 * Two supplied clips (gxuqu-z-JBM, brtxIYaEdyI) are held back on purpose:
 * their YouTube descriptions contain sensational claims about Evans that
 * should be corrected on YouTube before they are featured here.
 */
export const videoCategories: { id: VideoCategory | 'all'; label: Bi; blurb?: Bi }[] = [
  { id: 'all', label: { en: 'All', sw: 'Zote' } },
  { id: 'philosophy', label: { en: 'Philosophy & Mindset', sw: 'Falsafa na Fikra' },
    blurb: { en: 'Turning points, rejected scripts, cognitive bandwidth and time as currency.', sw: 'Nyakati za mabadiliko, kukataa mazoea na muda kama mtaji.' } },
  { id: 'wealth', label: { en: 'Wealth & Systems', sw: 'Utajiri na Mifumo' },
    blurb: { en: 'Leverage, networks and the real mechanics of how wealth forms.', sw: 'Nguvu ya mifumo, mitandao na jinsi utajiri unavyojengwa.' } },
  { id: 'engineering', label: { en: 'Engineering & Tech', sw: 'Uhandisi na Teknolojia' },
    blurb: { en: 'Applied physics and systems engineering at national scale.', sw: 'Fizikia na uhandisi wa mifumo kwa kiwango cha taifa.' } },
  { id: 'journey', label: { en: 'Personal Journey & Vlogs', sw: 'Safari Binafsi na Vlogs' },
    blurb: { en: 'Unfiltered, ground-level documentation of a real life being built.', sw: 'Kumbukumbu halisi za maisha yanayojengwa.' } },
];

export const videos: Video[] = [
  { id: 'gWXNUwiS1Hc', title: 'Why I’m Done Being Ignorant: My Vision for Kenya’s Future', date: '2026-02-01', category: 'philosophy',
    summary: 'Recorded on my 22nd birthday. A reflection on dismantling ignorance and a first blueprint for the systems Kenya needs.' },
  { id: 'gpw7ZcRl4Hg', title: 'Radical Thinking: How to Escape the Education System’s Lies', date: '2025-12-30', category: 'philosophy',
    summary: 'Deconstructing institutional schooling, rejecting mediocre scripts and taking full ownership of how I think.' },
  { id: 'L1vej90YLFY', title: 'Welcome to the real world… Let’s have a talk and please criticize me', date: '2026-02-01', category: 'philosophy',
    summary: 'AI acceleration, ego versus ideas and positioning for impact over decades. An open invitation to criticise me while I learn.' },
  { id: 'KgCI7UHBRuY', title: '21 years, 11 months, 15 days | IRL', date: '2026-01-16', category: 'philosophy', live: true,
    summary: 'A raw audit of time, livestreamed: dropping bad habits, quitting distractions and treating every second as capital.' },
  { id: 'xNxPljXeo_U', title: 'How to Slow Down Time in Your Mind: Subjective Time Explained', date: '2026-03-14', category: 'philosophy',
    summary: 'The neuroscience of subjective time dilation: how attention and memory change how much life you actually experience.' },

  { id: 'LHcy9dwH3YM', title: 'The Lie of “Hard Work”: What Actually Makes People Rich', date: '2025-12-05', category: 'wealth',
    summary: 'Why effort alone is low-return, and the four engines that do compound: leverage, positioning, asymmetric skills and networks.' },
  { id: 'mT-ArWSI-zg', title: 'Secrets of Self-Made Millionaires in Kenya: Systems, Mindset & Discipline', date: '2026-03-22', category: 'wealth',
    summary: 'Legal wealth creation from scratch: systems over goals, emotional control and thinking backwards from the future.' },
  { id: 'DINcXjKzLBU', title: 'Why You’re Chasing the Wrong Things (Money, Power, Fame, Attraction)', date: '2026-03-12', category: 'wealth',
    summary: 'A breakdown of the four human drivers, and why chasing results fails unless it is anchored in real competence and value.' },
  { id: '--pmyKQPk0M', title: '7 AI Hacks for Wealth Building, Led by Naval Ravikant', date: '2026-08-27', category: 'wealth', short: true,
    summary: 'Personal finance as architecture: avoiding deficit spending and treating capital as a system rather than idle cash.' },
  { id: 'xc2WpM3Bkpg', title: 'Success Secrets for Young People | Evans Ongwae Explains', date: '2026-03-13', category: 'wealth',
    summary: 'Failure as raw material, compounding patience and why consistency beats luck.' },
  { id: 'vw47o_XvAD4', title: 'Heelo', date: '2026-03-16', category: 'wealth',
    summary: 'Informal reflections on education, ownership versus wage dependence, and financial reality.' },
  { id: 'poTBrvXxA6Q', title: 'The Psychology of Wealth Betrayal', date: '2026-07-27', category: 'wealth', short: true,
    summary: 'A short on the psychology behind money decisions. Connected to Hevloys Capital and Forex Watch.' },
  { id: '_NJBKqFp1qI', title: 'Blueprint of Wealth Betrayal', date: '2026-08-14', category: 'wealth', short: true,
    summary: 'A companion short on the blueprint behind financial self-sabotage. Connected to ChamaChain.' },

  { id: 'jpiURDAxf3I', title: 'Inside the SGR: The Software and Physics of Africa’s Modern Railway', date: '2026-03-01', category: 'engineering',
    summary: 'Kenya’s Standard Gauge Railway as a living engineering system: structural tolerances, thermal expansion, centralised traffic control software and East African trade.' },

  { id: 'apw5ka4RUCA', title: 'Why I’m Documenting My Life (The Kenyan Elon Musk by 2030)', date: '2026-01-16', category: 'journey',
    summary: 'Why I document everything: building toward Heless Industries in public and setting a hard timeline.' },
  { id: 'oaSqkp70v44', title: 'letting go of fear', date: '2025-10-15', category: 'journey',
    summary: 'Leaving the traditional campus path, facing uncertainty and choosing to go and get what I want. If I fail, I learn.' },
  { id: 'mGCvFs9F5k8', title: 'I went on another tour to Mount Kenya University, and it was absolutely disastrous!', date: '2026-01-08', category: 'journey',
    summary: 'A tour that went wrong from the first bus delay: a candid look at academic environments versus real-world execution.' },
  { id: 'W41pPf8gqzQ', title: 'Friends With Benefits: Freedom or Self-Destruction?', date: '2026-03-07', category: 'journey',
    summary: 'Both sides of a controversial topic: emotional avoidance, boundaries and self-awareness in modern relationships.' },
  { id: 'GfK4zpZyeq4', title: 'Evans Ongwae: The Next Evolution, Reality Redefined', date: '2026-07-26', category: 'journey', short: true,
    summary: 'A short on the direction of the Cave and the Hevloys ecosystem.' },
  { id: 'mb1STS-Kiio', title: 'Join the Hevloys Community', date: '2026-04-27', category: 'journey', short: true,
    summary: 'An open call to join the Hevloys community as it forms.' },
  { id: 'hAaPMWK_C2Q', title: 'Hevloys Education Network: learn about real-world business', date: '2026-04-23', category: 'journey', short: true,
    summary: 'Introducing the Hevloys Education Network intake waiting list.' },
];

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
