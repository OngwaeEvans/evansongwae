export type Lang = 'en' | 'sw';
export type Bi = { en: string; sw: string };

export type ProjectTab = 'MEDIA' | 'TECH / AI' | 'FINANCE' | 'AERO / ENERGY';
export type ProjectTag =
  | 'COMMUNITY' | 'LOGISTICS' | 'DIGITAL INFRASTRUCTURE' | 'HEALTH'
  | 'SOFTWARE' | 'RESEARCH' | 'INDUSTRIAL SYSTEMS' | 'EXPERIMENTAL';
export type ProjectStatus =
  | 'ACTIVE' | 'ACTIVE PILOT' | 'OPERATIONAL' | 'LIVE MEDIA' | 'IN DEVELOPMENT'
  | 'EXPERIMENTAL' | 'RESEARCH DIRECTION' | 'ARCHIVED' | 'STATUS UNVERIFIED';
export type StatusSource = 'founder' | 'inspected' | 'unverified';
export type DivisionId = 'labs' | 'energy' | 'aero' | 'capital' | 'group';

export interface Project {
  id: string;
  name: string;
  url?: string;
  tab: ProjectTab;
  tags: ProjectTag[];
  division: DivisionId;
  status: ProjectStatus;
  statusSource: StatusSource;
  lastVerified?: string;
  short: string;
  description: string;
  problem: string;
  features: string[];
  opportunity: string;
  technologies?: string[];
  note?: string;
  videoIds?: string[];
}

export type VideoCategory = 'philosophy' | 'wealth' | 'engineering' | 'journey';
export interface Video {
  id: string;
  title: string;
  date: string;
  category: VideoCategory;
  summary: string;
  live?: boolean;
  short?: boolean;
}
