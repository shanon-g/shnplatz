'use client';

import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { useOverlayClose } from '@/hooks/useOverlayClose';
import { useZIdxState } from '@/hooks/useZIdx';
import OverlayFrame from './OverlayFrame';

interface Props {
  winRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function AbtOverlay({ winRef, onPointerDown, setShow }: Props) {
  const { isClosing, close } = useOverlayClose(setShow);
  const { zStyle, toFront } = useZIdxState();
  const [flippedSkillIndex, setFlippedSkillIndex] = useState<number | null>(null);

  return (
    <OverlayFrame
      winRef={winRef}
      zStyle={zStyle}
      toFront={toFront}
      onBarPointerDown={onPointerDown}
      onClose={close}
      title="About Me"
      isClosing={isClosing}
      outerCls="fixed z-100 flex items-center justify-center w-[90%] max-w-4xl h-[500px] max-h-[90vh]
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      stageCls="relative h-full w-full"
      panelCls="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10"
      barBg="bg-[#a0b3e2]"
    >
      {/* Content */}
      <div className="p-5 overflow-y-auto flex-1">
        <div className="min-h-full flex flex-col gap-8">

          {/* Main Section (Image + Info) */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Image */}
            <div className="w-40 sm:w-66 shrink-0 flex justify-center">
              <div className="aspect-[4/6] w-full overflow-hidden rounded-xl border-[3px] border-[#36312C] bg-[#d7d0c4]">
                <img
                  src="/assets/foto.png"
                  alt="Shanon Giuly Istanto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info Content */}
            <div className="text-[#36312C] text-sm sm:text-base space-y-4 w-full sm:w-2/3">
              <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-base">
                <div className="font-bold">Name</div>
                <div>: Shanon Giuly Istanto</div>

                <div className="font-bold">Major</div>
                <div>: Computer Science - Software Engineering</div>

                <div className="font-bold">GPA</div>
                <div>: 3.92 (up to 5th semester)</div>
              </div>

              <div>
                <p className="text-sm">
                  Aspiring <span className="font-bold">Full Stack Engineer</span> & <span className="font-bold">iOS Developer</span>. Known for fast learning, and adaptability.
                </p>
              </div>

              <div>
                <p className="font-bold">Notable Highlights:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Junior iOS Developer at Apple Developer Academy 2026</li>
                  <li>Lab Assistant at Software Laboratory Center</li>
                  <li>Mentor (Scholarship) at SASC, BINUS University</li>
                  <li>Regional President of HIMTI (Himpunan Mahasiswa Teknik Informatika)</li>
                  <li>Freshmen Partner at BINUS University</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">Language:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Indonesian – Native</li>
                  <li>English – Fluent</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-[13px]">
                  hint: try clicking on the <span className="underline">planes</span> 😌
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border-t-4 border-[#36312C] pt-10 mt-8">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 relative inline-block w-full skill_motion">
              <span className="relative z-10">🤸‍♀️ Skills</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-24 h-[4px] bg-[#36312C] rounded-full z-0" />
            </h2>

            {/* Languages */}
            <div className="mt-8">
              <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                <span className="relative z-10">💻 Languages</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-16 h-[3px] bg-[#7F9795] rounded-full z-0" />
              </h3>
              <div className="pt-2 flex flex-wrap justify-center items-center gap-6 px-4">
                {[
                  { icon: '/assets/swift_icon.png', label: 'TypeScript' },
//                  { icon: '/assets/javascript_icon.png', label: 'JavaScript' },
                  { icon: '/assets/java_icon.png', label: 'Java' },
                  { icon: '/assets/typescript_icon.png', label: 'TypeScript' },
                  { icon: '/assets/python_icon.png', label: 'Python' },
                  { icon: '/assets/php_icon.png', label: 'PHP' },
                  { icon: '/assets/c_icon.png', label: 'C' },
                  { icon: '/assets/c++_icon.png', label: 'C++' },
                  { icon: '/assets/csharp_icon.png', label: 'C#' },
                  { icon: '/assets/html_icon.png', label: 'HTML' },
                  { icon: '/assets/css_icon.png', label: 'CSS' },
                ].map((tech, i) => (
                  <div
                    key={i}
                    className={`cube-wrapper ${flippedSkillIndex === i ? 'flipped' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setFlippedSkillIndex((prev) => (prev === i ? null : i));
                      }
                    }}
                  >
                    <div className="cube-inner">
                      <div className="cube-face cube-front">
                        <img src={tech.icon} alt={tech.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                      </div>
                      <div className="cube-face cube-back text-sm sm:text-base">{tech.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="mt-14">
              <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                <span className="relative z-10">🦾 Frameworks & Libraries</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-20 h-[3px] bg-[#7F9795] rounded-full z-0" />
              </h3>
              <div className="pt-2 flex flex-wrap justify-center items-center gap-6 px-4">
                {[
                  { icon: '/assets/nextjs_icon.png', label: 'Next.js' },
//                  { icon: '/assets/react_icon.png', label: 'React' },
                  { icon: '/assets/express_icon.png', label: 'Express' },
                  { icon: '/assets/laravel_icon.png', label: 'Laravel' },
                  { icon: '/assets/tensorflow_icon.png', label: 'TensorFlow' },
                  { icon: '/assets/nodejs_icon.png', label: 'Node.js' },
                  { icon: '/assets/django_icon.png', label: 'Django' },
                ].map((tech, i) => (
                  <div
                    key={i}
                    className={`cube-wrapper ${flippedSkillIndex === i ? 'flipped' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setFlippedSkillIndex((prev) => (prev === i ? null : i));
                      }
                    }}
                  >
                    <div className="cube-inner">
                      <div className="cube-face cube-front">
                        <img src={tech.icon} alt={tech.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                      </div>
                      <div className="cube-face cube-back text-sm sm:text-base">{tech.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dev Tools & Platforms */}
            <div className="mt-14">
              <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                <span className="relative z-10">🛠️ Tools & Platforms</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-16 h-[3px] bg-[#7F9795] rounded-full z-0" />
              </h3>
              <div className="pt-2 flex flex-wrap justify-center items-center gap-6 px-4">
                {[
                  { icon: '/assets/tailwind_icon.png', label: 'Tailwind CSS' },
                  { icon: '/assets/mysql_icon.png', label: 'MySQL' },
                  { icon: '/assets/mongodb_icon.png', label: 'MongoDB' },
                  { icon: '/assets/jupyter_icon.png', label: 'Jupyter' },
                  { icon: '/assets/unity_icon.png', label: 'Unity' },
                ].map((tech, i) => (
                  <div
                    key={i}
                    className={`cube-wrapper ${flippedSkillIndex === i ? 'flipped' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setFlippedSkillIndex((prev) => (prev === i ? null : i));
                      }
                    }}
                  >
                    <div className="cube-inner">
                      <div className="cube-face cube-front">
                        <img src={tech.icon} alt={tech.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                      </div>
                      <div className="cube-face cube-back text-sm sm:text-base">{tech.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-4 border-[#36312C] pt-10 mt-8">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 relative inline-block w-full skill_motion">
              <span className="relative z-10">^v^</span>
            </h2>
          </div>
        </div>
      </div>
    </OverlayFrame>
  );
}
