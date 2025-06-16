'use client';
import { useState } from 'react';
import CubeIcon from './CubeIcon';
import { Project } from '../data/projects';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [flippedMobile, setFlippedMobile] = useState<{ [key: number]: boolean }>({});

  const handleMobileFlip = (index: number) => {
    setFlippedMobile((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:py-5 sm:py-5 rounded-lg hover:bg-[#ece5d5] transition-colors duration-200">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-48 sm:w-78 sm:h-48 object-cover border-[3px] border-[#36312C] rounded-xl"
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

        {/* Tech Icons */}
        <div className="flex gap-1 mt-1 flex-row flex-wrap items-center">
          {project.techIcons.map((icon, i) => (
            <div key={i}>
              {/* Desktop cube hover */}
              <div className="hidden sm:block">
                <CubeIcon
                  icon={icon}
                  isActive={activeIndex === i}
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                />
              </div>

              {/* Mobile tap-flip cube */}
              <div
                className={`block sm:hidden cube-wrapper-sm ${flippedMobile[i] ? 'flipped' : ''}`}
                onClick={() => handleMobileFlip(i)}
              >
                <div className="cube-inner-sm">
                  <div className="cube-face-sm cube-front-sm">
                    <img src={icon.src} alt={icon.label} className="w-7 h-7 object-contain" />
                  </div>
                  <div className="cube-face-sm cube-back-sm">{icon.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
