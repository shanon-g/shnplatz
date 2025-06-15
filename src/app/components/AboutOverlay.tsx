'use client';
import React, { useRef, RefObject, Dispatch, SetStateAction, useState } from 'react';

interface Props {
  onClose: () => void;
  aboutRef: RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowAbout: Dispatch<SetStateAction<boolean>>;
}


export default function AboutOverlay({
  onClose,
  aboutRef,
  onMouseDown,
  setShowAbout,
}: Props) {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        setShowAbout(false);
        setIsClosing(false);
    }, 300);
    };

  return (
    <div
      ref={aboutRef}
      className="fixed z-40 flex items-center justify-center w-[90%] max-w-4xl h-[500px] 
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${isClosing ? 'dockDown' : 'dockUp'}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Top Bar */}
          <div
            onMouseDown={onMouseDown}
            className="flex items-center justify-center gap-2 bg-[#F9F2E4] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img src="/assets/logo.png" alt="logo" className="absolute left-4 w-13 h-13" />
            <span className="font-bold text-center w-full pulse-glow">About Me</span>
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

          {/* Content */}
            <div className="p-5 overflow-y-auto flex-1">
                <div className="min-h-full flex flex-col gap-8">

                    {/* Main Section (Image + Info) */}
                    <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0 sm:w-1/3 flex justify-center sm:justify-start">
                        <img
                        src="/assets/foto.png"
                        alt="Shanon Giuly Istanto"
                        className="w-40 h-auto sm:w-66 rounded-xl border-[3px] border-[#36312C]"
                        />
                    </div>

                    {/* Info Content */}
                    <div className="text-[#36312C] text-sm sm:text-base space-y-4 sm:w-2/3">
                        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-base">
                            <div className="font-bold">Name</div>
                            <div>: Shanon Giuly Istanto</div>

                            <div className="font-bold">Major</div>
                            <div>: Computer Science - Software Engineering</div>

                            <div className="font-bold">GPA</div>
                            <div>: 3.86 (up to 3rd semester)</div>
                        </div>

                        <div>
                            <p> Versatile <span className="font-bold">Full Stack Engineer</span> skilled across web, backend, game, 
                                and IoT development. Known for fast learning, adaptability, and delivering 
                                efficient, scalable solutions in diverse technical environments.
                            </p>
                        </div>

                        <div>
                        <p className="font-bold">Notable Highlights:</p>
                        <ul className="list-disc list-inside">
                            <li>Lab Assistant at Software Laboratory Center</li>
                            <li>Mentor (Scholarship) at SASC, BINUS University</li>
                            <li>Regional President of HIMTI (Himpunan Mahasiswa Teknik Informatika)</li>
                            <li>Freshmen Partner at BINUS University</li>
                        </ul>
                        </div>

                        {/* <div>
                        <p className="font-bold">Language:</p>
                        <ul className="list-disc list-inside">
                            <li>Indonesian – Native</li>
                            <li>English – Fluent</li>
                        </ul>
                        </div> */}
                    </div>
                    </div>

                    {/* Skills Section */}
                    <div className="border-t-3 pt-6">
                        <h2 className="text-center text-xl sm:text-2xl font-bold mb-4">Skills</h2>

                        <div className="flex flex-wrap justify-center items-center gap-6 px-4">
                            {[
                            { icon: '/assets/typescript_icon.png', label: 'TypeScript' },
                            { icon: '/assets/nextjs_icon.png', label: 'Next.js' },
                            { icon: '/assets/tailwind_icon.png', label: 'Tailwind CSS' },
                            { icon: '/assets/html_icon.png', label: 'HTML' },
                            { icon: '/assets/css_icon.png', label: 'CSS' },
                            { icon: '/assets/javascript_icon.png', label: 'JavaScript' },
                            { icon: '/assets/java_icon.png', label: 'Java' },
                            { icon: '/assets/react_icon.png', label: 'React' },
                            { icon: '/assets/express_icon.png', label: 'Express' },
                            { icon: '/assets/mysql_icon.png', label: 'MySQL' },
                            { icon: '/assets/csharp_icon.png', label: 'C#' },
                            { icon: '/assets/unity_icon.png', label: 'Unity' },
                            { icon: '/assets/jupyter_icon.png', label: 'Jupyter' },
                            { icon: '/assets/python_icon.png', label: 'Python' },
                            { icon: '/assets/mongodb_icon.png', label: 'MongoDB' },
                            { icon: '/assets/laravel_icon.png', label: 'Laravel' },
                            { icon: '/assets/php_icon.png', label: 'PHP' },
                            ].map((tech, i) => (
                            <div key={i} className="cube-wrapper">
                                <div className="cube-inner">
                                <div className="cube-face cube-front">
                                    <img
                                    src={tech.icon}
                                    alt={tech.label}
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="cube-face cube-back">
                                    {tech.label}
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
  

        </div>
      </div>
    </div>
  );
}
