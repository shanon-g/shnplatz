'use client';

import type { Project } from '@/types/proj';

interface Props {
  project: Project;
  onOpen: () => void;
}

// Type is deliberately not shown here — the filter pills above already carry it.
export default function ProjTile({ project, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-left bg-[#F9F2E4] border-[2px] border-[#36312C] rounded-xl overflow-hidden
        shadow-[2px_2px_0_0_#36312C] hover:shadow-[4px_4px_0_0_#36312C]
        hover:-translate-y-[2px] active:translate-y-0 active:shadow-[2px_2px_0_0_#36312C]
        transition-all duration-200"
    >
      <div className="aspect-video w-full overflow-hidden border-b-[2px] border-[#36312C] bg-[#d7d0c4]">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-2 sm:p-2.5 flex flex-col gap-0.5">
        <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-2">{project.name}</h3>
        <p className="text-[10px] sm:text-xs text-[#726e5f] line-clamp-1">{project.description}</p>
      </div>
    </button>
  );
}
