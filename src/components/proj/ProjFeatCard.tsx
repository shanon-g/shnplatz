'use client';

import type { Project } from '@/types/proj';
import ProjBadge from './ProjBadge';

interface Props {
  project: Project;
  onOpen: () => void;
}

export default function ProjFeatCard({ project, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-left bg-[#F9F2E4] border-[3px] border-[#36312C] rounded-xl overflow-hidden
        shadow-[4px_4px_0_0_#36312C] hover:shadow-[6px_6px_0_0_#36312C]
        hover:-translate-y-[2px] active:translate-y-0 active:shadow-[4px_4px_0_0_#36312C]
        transition-all duration-200 flex flex-col"
    >
      <div className="aspect-[2/1] w-full overflow-hidden border-b-[3px] border-[#36312C] bg-[#d7d0c4]">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-2 sm:p-2.5 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="font-extrabold text-[11px] sm:text-xs leading-tight">{project.name}</h3>
          <ProjBadge type={project.types[0]} />
        </div>

        <p className="text-[10px] sm:text-[11px] text-[#726e5f] line-clamp-2">{project.description}</p>
      </div>
    </button>
  );
}
