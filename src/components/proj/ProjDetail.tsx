'use client';

import { useEffect } from 'react';
import type { Project, ProjLinkKind } from '@/types/proj';
import ProjBadge from './ProjBadge';
import TechIconRow from './TechIconRow';

interface Props {
  project: Project;
  onClose: () => void;
}

const LINK_BTN =
  `inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-[3px] border-[#36312C]
   text-[10px] sm:text-xs font-extrabold uppercase tracking-wide text-[#36312C]
   shadow-[3px_3px_0_0_#36312C] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_#36312C]
   active:translate-y-0 active:shadow-[3px_3px_0_0_#36312C] transition-all duration-200`;

const LINK_META: Record<ProjLinkKind, { label: string; bg: string; icon?: string; emoji?: string }> = {
  live: { label: 'Live demo', bg: 'bg-[#a4e2a0] hover:bg-[#93d98f]', emoji: '🌐' },
  demo: { label: 'Watch demo', bg: 'bg-[#E4ABAB] hover:bg-[#DFA0A0]', icon: '/assets/youtube_icon.png' },
  source: { label: 'Source code', bg: 'bg-[#F9F2E4] hover:bg-[#d7d0c4]', icon: '/assets/github_icon.png' },
  appstore: { label: 'App Store', bg: 'bg-[#C1E3E1] hover:bg-[#b8d9d7]', emoji: '📱' },
  testflight: { label: 'TestFlight', bg: 'bg-[#C9B0F2] hover:bg-[#BBA0EA]', emoji: '✈️' }
};

export default function ProjDetail({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const links = project.links;

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center px-2 py-3 sm:px-4 sm:py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl" />

      <div
        className="relative w-full max-w-3xl max-h-full flex flex-col rounded-xl bg-[#F9F2E4]
                   border-[4px] sm:border-[6px] border-[#36312C]
                   shadow-[10px_10px_0_0_#36312C] overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between gap-3 bg-[#efeea4] border-b-[4px] border-[#36312C] px-3 sm:px-4 py-2">
          <div className="min-w-0 flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-base truncate">{project.name}</span>
            <ProjBadge type={project.type} />
          </div>

          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C]
                       text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
            title="Close"
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-3 sm:p-4 bg-[#e4cdac]">
          <div className="w-full flex items-center justify-center overflow-hidden rounded-lg border-[3px] sm:border-[4px] border-[#36312C] bg-black">
            <img
              src={project.image}
              alt={project.name}
              className="block w-auto max-w-full max-h-[26vh] sm:max-h-[30vh] object-contain"
              draggable={false}
            />
          </div>

          <div className="mt-3 rounded-lg border-[3px] border-[#36312C] bg-[#F9F2E4] p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#726e5f]">
              <img src="/assets/folder_icon.png" alt="" className="w-4 h-4 object-contain" />
              <span>{project.language}</span>
            </div>

            <p className="text-xs sm:text-sm text-[#36312C] leading-relaxed">{project.description}</p>

            <div>
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#726e5f] mb-1.5">
                Built with
              </p>
              <TechIconRow icons={project.techIcons} />
            </div>

            <div className={`grid gap-2 pt-1 ${links.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {links.map((link) => {
                const meta = LINK_META[link.kind];
                return (
                  <a
                    key={link.kind}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK_BTN} ${meta.bg}`}
                  >
                    {meta.icon ? (
                      <img src={meta.icon} alt="" className="w-4 h-4 object-contain" />
                    ) : (
                      <span aria-hidden>{meta.emoji}</span>
                    )}
                    {meta.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-2 text-[10px] sm:text-xs font-bold text-[#36312C] opacity-80">
            Click ✕ / press ESC to close
          </div>
        </div>
      </div>
    </div>
  );
}
