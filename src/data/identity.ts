export const identity = {
  name: 'Evans Ongwae Onchoke',
  role: 'Founder & Chief Architect — Hevloys Group',
  site: 'Evans Ongwae Cave',
  siteUrl: (import.meta.env?.VITE_SITE_URL as string | undefined) ?? 'https://evansongwae.netlify.app',
  portrait: '/images/evans-portrait.jpg',
};

export const contact = {
  phone: '+254702245252',
  phoneDisplay: '+254 702 245 252',
  linktree: 'https://linktr.ee/EvansOngwaeOnchoke',
  linktreeSecondary: 'https://linktr.ee/Evans_Ongwae_Socials',
  youtube: 'https://www.youtube.com/@EvansOngwaekenya',
  youtubeHandle: '@EvansOngwaeKenya',
  messages: {
    invest: 'Hello Evans, I have explored Evans Ongwae Cave and would like to discuss potential investment opportunities within the Hevloys Group ecosystem.',
    partner: 'Hello Evans, I have explored your work and would like to discuss a possible partnership or collaboration.',
    build: 'Hello Evans, I am interested in your projects and would like to discuss contributing technical skills or working together.',
    general: 'Hello Evans, I visited Evans Ongwae Cave and would like to connect.',
  },
};

export type MessageKey = keyof typeof contact.messages;
export const whatsapp = (key: MessageKey = 'general') =>
  `https://wa.me/${contact.phone.replace('+', '')}?text=${encodeURIComponent(contact.messages[key])}`;
export const tel = `tel:${contact.phone}`;
export const sms = `sms:${contact.phone}`;
