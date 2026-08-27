'use client';

import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import ProjCard from '@/components/ProjCard';
import { Project } from '@/data/proj';
import { useOverlayClose } from '@/hooks/useOverlayClose';
import { useZIdxRef } from '@/hooks/useZIdx';
import OverlayFrame from './OverlayFrame';

type Tone = 'major' | 'minor';
type ViewMode = 'list' | 'detailed';

interface Props {
  projects: Project[];
  winRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

// Per-tone body styling. The list-view Major panel carries text sizing that the
// Mini panel does not — kept as-is to match the original rendering.
const TONE: Record<Tone, { cardsCls: string; tableCls: string; rowCls: string }> = {
  major: {
    cardsCls: 'space-y-2 p-3 bg-[#F6DADA]',
    tableCls: 'p-4 bg-[#F6DADA] text-xs sm:text-base',
    rowCls: 'rounded-md hover:bg-[#F0CFCF] transition-colors duration-200'
  },
  minor: {
    cardsCls: 'space-y-2 p-3 bg-[#EEE6FF]',
    tableCls: 'p-4 bg-[#EEE6FF]',
    rowCls: 'rounded-md hover:bg-[#E0D0FF] transition-colors duration-200'
  }
};

const SectionHeader = ({
  title,
  count,
  open,
  onToggle,
  tone
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  tone: Tone;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`w-full flex items-center justify-between px-4 py-3 border-b-[3px] border-[#36312C] transition-colors duration-200
      ${tone === 'major' ? 'bg-[#E4ABAB] hover:bg-[#DFA0A0]' : 'bg-[#C9B0F2] hover:bg-[#BBA0EA]'}`}
    aria-expanded={open}
  >
    <div className="flex items-center gap-2">
      <span className="font-extrabold tracking-tight">{title}</span>
      <span className="text-xs px-2 py-[2px] rounded-full bg-[#d7d0c4] border-[2px] border-[#36312C]">
        {count}
      </span>
    </div>
    <span className="font-black text-lg leading-none select-none">{open ? '▾' : '▸'}</span>
  </button>
);

const CollapsedPreview = ({ projects, tone }: { projects: Project[]; tone: Tone }) => (
  <div
    className={`px-4 py-3 text-xs text-[#726e5f] border-b-[3px] border-[#36312C]
    ${tone === 'major' ? 'bg-[#F2C7C7]' : 'bg-[#E3D7FF]'}`}
  >
    <span className="font-semibold text-[#36312C]">Available:</span>{' '}
    {projects.map((p, i) => (
      <span key={p.name}>
        {p.name}
        {i < projects.length - 1 ? ' • ' : ''}
      </span>
    ))}
  </div>
);

const ProjTable = ({ projects, tone }: { projects: Project[]; tone: Tone }) => (
  <div className={TONE[tone].tableCls}>
    <table className="w-full text-left border-separate border-spacing-y-2 table-fixed">
      <thead>
        <tr className="border-b-[2px] border-[#36312C]">
          <th className="pr-4 w-8">No</th>
          <th className="pr-4 w-1/2">Name</th>
          <th className="pr-4 w-1/4">Language</th>
          <th className="pr-4 w-1/4">Type</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, i) => (
          <tr key={`${tone}-row-${i}`} className={TONE[tone].rowCls}>
            <td>{i + 1}.</td>
            <td className="underline text-[#36312C] hover:opacity-80">
              <a href={project.links?.[0] ?? '#'} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </td>
            <td>{project.language}</td>
            <td>{project.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProjSection = ({
  title,
  projects,
  tone,
  open,
  onToggle,
  viewMode
}: {
  title: string;
  projects: Project[];
  tone: Tone;
  open: boolean;
  onToggle: () => void;
  viewMode: ViewMode;
}) => (
  <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
    <SectionHeader
      title={title}
      count={projects.length}
      open={open}
      onToggle={onToggle}
      tone={tone}
    />
    {!open ? (
      <CollapsedPreview projects={projects} tone={tone} />
    ) : viewMode === 'detailed' ? (
      <div className={TONE[tone].cardsCls}>
        {projects.map((project, i) => (
          <ProjCard key={`${tone}-${i}`} project={project} />
        ))}
      </div>
    ) : (
      <ProjTable projects={projects} tone={tone} />
    )}
  </div>
);

export default function ProjOverlay({
  projects,
  winRef,
  onPointerDown,
  setShow,
  viewMode,
  setViewMode
}: Props) {
  const { isClosing, close } = useOverlayClose(setShow);
  const { zStyle, toFront } = useZIdxRef(winRef);

  // category expansion
  const [majorOpen, setMajorOpen] = useState(true);
  const [minorOpen, setMinorOpen] = useState(false);

  const majorProjects = projects.filter((p) => p.category === 'major');
  const minorProjects = projects.filter((p) => p.category === 'minor');

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
                h-[80vh] max-h-[900px] min-h-[650px]
                left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2"
      stageCls="relative h-full w-full"
      panelCls="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10"
      barBg="bg-[#efeea4]"
    >
      {/* View Tabs */}
      <div className="flex items-center gap-4 px-4 py-2 border-b-[4px] border-[#36312C]">
        <button
          onClick={() => setViewMode('list')}
          className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200"
        >
          <img src="/assets/list_icon.png" className="w-5 h-5" />
          <span className="font-semibold">List View</span>
        </button>
        <button
          onClick={() => setViewMode('detailed')}
          className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200"
        >
          <img src="/assets/detailed_icon.png" className="w-5 h-5" />
          <span className="font-semibold">Detailed View</span>
        </button>
      </div>

      {/* Project List */}
      <div className="overflow-y-auto flex-1">
        <div className="space-y-4 p-3">
          <ProjSection
            title="Major Projects"
            projects={majorProjects}
            tone="major"
            open={majorOpen}
            onToggle={() => setMajorOpen((v) => !v)}
            viewMode={viewMode}
          />
          <ProjSection
            title="Mini Projects"
            projects={minorProjects}
            tone="minor"
            open={minorOpen}
            onToggle={() => setMinorOpen((v) => !v)}
            viewMode={viewMode}
          />
        </div>
      </div>
    </OverlayFrame>
  );
}
