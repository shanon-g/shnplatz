'use client';
import React, { useEffect, RefObject, Dispatch, SetStateAction, useState } from 'react';
import { Project } from '../data/projects';
import { getNextZIndex } from '../utils/zIdxManager';


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

  const [isClosing, setIsClosing] = useState(false);
  const [zIndex, setZIndex] = useState(40);

  useEffect(() => {
    // bring to top on open
    setZIndex(getNextZIndex());
  }, []);

  const bringToFront = () => {
    setZIndex(getNextZIndex());
  };

  const handleClose = () => {
  setIsClosing(true);
  setTimeout(() => {
      setShowProjects(false);
      setIsClosing(false);
  }, 300);
  };

  return (
    <div
      ref={projectsRef}
      onMouseDown={bringToFront} // bring to front on any click
      style={{ zIndex }}
      className="fixed z-100 flex items-center justify-center animate-slideUp 
                w-[90%] max-w-5xl h-[650px] 
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                <button onClick={() => setViewMode('list')} className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200">
                    <img src="/assets/list_icon.png" className="w-5 h-5" />
                    <span className="font-semibold">List View</span>
                </button>
                <button onClick={() => setViewMode('detailed')} className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200">
                    <img src="/assets/detailed_icon.png" className="w-5 h-5" />
                    <span className="font-semibold">Detailed View</span>
                </button>
            </div>


            {/* Project List */}
            <div className="overflow-y-auto flex-1">
                {viewMode === 'detailed' ? (
                    <div className="space-y-2">
                      {projects.map((project, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-4 py-10 sm:py-5 rounded-lg hover:bg-[#ece5d5] transition-colors duration-200"
                          >
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-36 h-24 sm:w-78 sm:h-48 object-cover border-[3px] border-[#36312C] rounded-xl"
                            />
                            
                            <div className="flex-1 flex flex-col justify-between h-48">
                              <div>
                                <h3 className="font-bold sm:text-base text-sm">{project.name}</h3>
                                <p className="sm:text-sm text-xs text-[#726e5f]">{project.description}</p>
                                
                                <div className="mt-2 sm:text-sm text-xs text-[#726e5f]">
                                  <p className="font-semibold text-[#36312C] mb-1">Links:</p>
                                  {project.links.map((link, index) => (
                                    <a 
                                      key={index}
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block hover:underline text-blue-600"
                                    >
                                      {link}
                                    </a>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-2 mt-2"> {/* ADJUST margin for spacing */}
                                {project.techIcons.map((icon, j) => (
                                  <img key={j} src={icon} className="w-8 h-8 xs:w-5 xs:h-5" alt="tech" />
                                ))}
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                ) : (
                  <div className="p-4 overflow-y-auto flex-1">
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
                          <tr
                            key={i}
                            className="hover:bg-[#ece5d5] transition-colors duration-200"
                          >
                            <td>{i + 1}.</td>
                            <td className="underline text-[#36312C]-700 hover:text-[#36312C]-900">
                              <a
                                href={project.links?.[0] ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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

                )}
            </div>


        </div>
      </div>
    </div>
  );
}
