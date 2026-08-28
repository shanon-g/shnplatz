// Platform is the axis; `game` and `ai-ml` are the two domain buckets that
// read as their own thing regardless of what they were built on.
export type ProjType = 'web' | 'ios' | 'game' | 'ai-ml';

export interface TechIcon {
  src: string;
  label: string;
}

export type ProjLinkKind = 'live' | 'demo' | 'source' | 'appstore' | 'testflight';

export interface ProjLink {
  kind: ProjLinkKind;
  url: string;
}

export interface Project {
  name: string;
  language: string;
  type: ProjType;
  featured?: boolean;
  image: string;
  description: string;
  links: ProjLink[];
  techIcons: TechIcon[];
}
