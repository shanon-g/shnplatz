'use client';
import React, { useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { Project } from '../data/projects';

interface Props {
  projects: Project[];
  onClose: () => void;
  projectsRef: RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowProjects: Dispatch<SetStateAction<boolean>>;
  viewMode: 'list' | 'detailed';
  setViewMode: Dispatch<SetStateAction<'list' | 'detailed'>>;
}


export default function ProjectsOverlay({
  projects,
  onClose,
  projectsRef,
  onMouseDown,
  setShowProjects,
  viewMode,
  setViewMode
}: Props) {

  return (
    <div
      ref={projectsRef}
      className="fixed z-40 animate-slideUp w-[90%] max-w-4xl h-[500px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative h-full">
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Top Bar */}
          <div
            onMouseDown={onMouseDown}
            className="flex items-center justify-center gap-2 bg-[#F9F2E4] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img src="/assets/logo.png" alt="logo" className="absolute left-4 w-13 h-13" />
            <span className="font-bold text-center w-full">Projects</span>
            <div className="absolute right-4 flex gap-2">
              <button
                onClick={() => setShowProjects(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold"
              >
                −
              </button>
              <button
                onClick={() => setShowProjects(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* View Tabs */}
            <div className="flex items-center gap-4 px-4 py-2 border-b-[4px] border-[#36312C]">
                <button onClick={() => setViewMode('list')} className="flex items-center gap-1">
                    <img src="/assets/list_icon.png" className="w-5 h-5" />
                    <span className="font-semibold">List View</span>
                </button>
                <button onClick={() => setViewMode('detailed')} className="flex items-center gap-1">
                    <img src="/assets/detailed_icon.png" className="w-5 h-5" />
                    <span className="font-semibold">Detailed View</span>
                </button>
            </div>


            {/* Project List */}
            <div className="p-4 overflow-y-auto flex-1">
                {viewMode === 'detailed' ? (
                    <div className="space-y-4">
                    {projects.map((project, i) => (
                        <div key={i} className="flex items-start gap-4">
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-36 h-28 object-cover border-[3px] border-[#36312C] rounded-xl"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold">{project.name}</h3>
                            <p className="text-sm text-[#7F9795]">{project.description}</p>
                            <div className="flex gap-2 mt-1">
                            {project.techIcons.map((icon, j) => (
                                <img key={j} src={icon} className="w-5 h-5" alt="tech" />
                            ))}
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="border-b-[2px] border-[#36312C]">
                        <th className="pr-4">No</th>
                        <th className="pr-4">Name</th>
                        <th className="pr-4">Language</th>
                        <th className="pr-4">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, i) => (
                        <tr key={i}>
                            <td className="align-top">{i + 1}.</td>
                            <td className="underline">{project.name}</td>
                            <td>{project.language}</td>
                            <td>{project.type}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
            </div>


        </div>
      </div>
    </div>
  );
}
