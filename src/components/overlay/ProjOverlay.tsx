'use client';

import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import ProjDetail from '@/components/proj/ProjDetail';
import ProjFeatCard from '@/components/proj/ProjFeatCard';
import ProjTile from '@/components/proj/ProjTile';
import ProjToolbar, { ProjFilter } from '@/components/proj/ProjToolbar';
import { useOverlayClose } from '@/hooks/useOverlayClose';
import { useZIdxRef } from '@/hooks/useZIdx';
import type { Project } from '@/types/proj';
import OverlayFrame from './OverlayFrame';

interface Props {
  projects: Project[];
  winRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const SectionLabel = ({ children, hlCls }: { children: React.ReactNode; hlCls: string }) => (
  <h2 className="mb-3 text-xs sm:text-sm font-extrabold text-[#36312C]">
    <span className={`${hlCls} px-2 py-0.5 rounded-md`}>{children}</span>
  </h2>
);

export default function ProjOverlay({ projects, winRef, onPointerDown, setShow }: Props) {
  const { isClosing, close } = useOverlayClose(setShow);
  const { zStyle, toFront } = useZIdxRef(winRef);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ProjFilter>('all');
  const [openProj, setOpenProj] = useState<Project | null>(null);

  const q = query.trim().toLowerCase();
  const shown = (p: Project) =>
    p.name.toLowerCase().includes(q) && (filter === 'all' || p.type === filter);

  const featured = projects.filter((p) => p.featured && shown(p));
  const rest = projects.filter((p) => !p.featured && shown(p));

  return (
    <OverlayFrame
      winRef={winRef}
      zStyle={zStyle}
      toFront={toFront}
      onBarPointerDown={onPointerDown}
      onClose={close}
      title="Projects"
      isClosing={isClosing}
      outerCls="fixed flex items-center justify-center
                w-[96vw] max-w-6xl
                h-[80vh] max-h-[900px] min-h-[min(650px,90vh)]
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      stageCls="relative h-full w-full"
      panelCls="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10"
      barBg="bg-[#efeea4]"
      overlayExtra={
        openProj && <ProjDetail project={openProj} onClose={() => setOpenProj(null)} />
      }
    >
      <ProjToolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

      <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6 sm:space-y-8 bg-[#E6DFD2] rounded-b-md">
        {featured.length > 0 && (
          <section>
            <SectionLabel hlCls="bg-[#E4ABAB]">⭐ Featured</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {featured.map((project) => (
                <ProjFeatCard
                  key={project.name}
                  project={project}
                  onOpen={() => setOpenProj(project)}
                />
              ))}
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section>
            <SectionLabel hlCls="bg-[#C1E3E1]">All Projects</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {rest.map((project) => (
                <ProjTile
                  key={project.name}
                  project={project}
                  onOpen={() => setOpenProj(project)}
                />
              ))}
            </div>
          </section>
        )}

        {featured.length === 0 && rest.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-extrabold text-sm sm:text-base text-[#36312C]">
              No projects found :O
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#726e5f]">
              Try a different search or filter!
            </p>
          </div>
        )}
      </div>
    </OverlayFrame>
  );
}
