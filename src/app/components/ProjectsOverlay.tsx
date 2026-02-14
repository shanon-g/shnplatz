'use client';
import React, { useEffect, RefObject, Dispatch, SetStateAction, useRef, useState } from 'react';
import { Project } from '../data/projects';
import { getNextZIndex } from '../utils/zIdxManager';
import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
  projectsRef: RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowProjects: Dispatch<SetStateAction<boolean>>;
  viewMode: 'list' | 'detailed';
  setViewMode: Dispatch<SetStateAction<'list' | 'detailed'>>;
}

export default function ProjectsOverlay({
  projects,
  projectsRef,
  onMouseDown,
  setShowProjects,
  viewMode,
  setViewMode
}: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const zIndexRef = useRef<number>(40);

  // category expansion
  const [majorOpen, setMajorOpen] = useState(true);
  const [minorOpen, setMinorOpen] = useState(false);

  const majorProjects = projects.filter((p) => p.category === 'major');
  const minorProjects = projects.filter((p) => p.category === 'minor');

  useEffect(() => {
    const next = getNextZIndex();
    zIndexRef.current = next;
    if (projectsRef.current) projectsRef.current.style.zIndex = String(next);
  }, [projectsRef]);

  const bringToFront = () => {
    const next = getNextZIndex();
    zIndexRef.current = next;
    if (projectsRef.current) projectsRef.current.style.zIndex = String(next);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProjects(false);
      setIsClosing(false);
    }, 300);
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
    tone: 'major' | 'minor';
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

  const CollapsedPreview = ({ projects, tone }: { projects: Project[]; tone: 'major' | 'minor' }) => (
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

  return (
    <div
      ref={projectsRef}
      onPointerDownCapture={bringToFront}
      onTouchStartCapture={bringToFront}
      style={{ zIndex: zIndexRef.current }}
      className="fixed flex items-center justify-center animate-slideUp
                w-[96%] max-w-[1080px]
                h-[80%] max-h-[700px] min-h-[500px] sm:min-h-[650px]
                left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${isClosing ? 'dockDown' : 'dockUp'}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Top Bar */}
          <div
            onMouseDown={(e) => {
              onMouseDown(e);
              bringToFront();
            }}
            className="flex items-center justify-center gap-2 bg-[#efeea4] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img src="/assets/logo.png" alt="logo" className="absolute left-4 w-13 h-13" />
            <span className="font-bold text-center w-full pulse-glow">Projects</span>
            <div className="absolute right-4 flex gap-2">
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200"
              >
                −
              </button>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>

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
            {viewMode === 'detailed' ? (
              <div className="space-y-4 p-3">
                {/* Major */}
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader
                    title="Major Projects"
                    count={majorProjects.length}
                    open={majorOpen}
                    onToggle={() => setMajorOpen((v) => !v)}
                    tone="major"
                  />
                  {majorOpen ? (
                    <div className="space-y-2 p-3 bg-[#F6DADA]">
                      {majorProjects.map((project, i) => (
                        <ProjectCard key={`major-${i}`} project={project} />
                      ))}
                    </div>
                  ) : (
                    <CollapsedPreview projects={majorProjects} tone="major" />
                  )}
                </div>

                {/* Mini */}
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader
                    title="Mini Projects"
                    count={minorProjects.length}
                    open={minorOpen}
                    onToggle={() => setMinorOpen((v) => !v)}
                    tone="minor"
                  />
                  {minorOpen ? (
                    <div className="space-y-2 p-3 bg-[#EEE6FF]">
                      {minorProjects.map((project, i) => (
                        <ProjectCard key={`minor-${i}`} project={project} />
                      ))}
                    </div>
                  ) : (
                    <CollapsedPreview projects={minorProjects} tone="minor" />
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-3">
                {/* Major */}
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader
                    title="Major Projects"
                    count={majorProjects.length}
                    open={majorOpen}
                    onToggle={() => setMajorOpen((v) => !v)}
                    tone="major"
                  />
                  {majorOpen ? (
                    <div className="p-4 bg-[#F6DADA]">
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
                          {majorProjects.map((project, i) => (
                            <tr
                              key={`major-row-${i}`}
                              className="rounded-md hover:bg-[#F0CFCF] transition-colors duration-200"
                            >
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
                  ) : (
                    <CollapsedPreview projects={majorProjects} tone="major" />
                  )}
                </div>

                {/* Mini */}
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader
                    title="Mini Projects"
                    count={minorProjects.length}
                    open={minorOpen}
                    onToggle={() => setMinorOpen((v) => !v)}
                    tone="minor"
                  />
                  {minorOpen ? (
                    <div className="p-4 bg-[#EEE6FF]">
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
                          {minorProjects.map((project, i) => (
                            <tr
                              key={`minor-row-${i}`}
                              className="rounded-md hover:bg-[#E0D0FF] transition-colors duration-200"
                            >
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
                  ) : (
                    <CollapsedPreview projects={minorProjects} tone="minor" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
