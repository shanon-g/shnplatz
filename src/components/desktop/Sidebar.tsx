'use client';

interface Props {
  onProjects: () => void;
  onAbout: () => void;
  onContact: () => void;
  onJourney: () => void;
}

export default function Sidebar({ onProjects, onAbout, onContact, onJourney }: Props) {
  return (
    <aside className="z-40 flex flex-col items-center justify-evenly py-0.1 px-1 sm:py-0.1 sm:px-3 min-h-0 overflow-hidden h-full">
      <button
        onClick={onProjects}
        className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
      >
        <img
          src="/assets/folder_icon.png"
          alt="Projects"
          className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
        />
      </button>

      <button
        onClick={onAbout}
        className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
      >
        <img
          src="/assets/about_icon.png"
          alt="About Me"
          className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
        />
      </button>

      <button
        onClick={onContact}
        className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
      >
        <img
          src="/assets/contact_icon.png"
          alt="Contact Me"
          className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
        />
      </button>

      <button>
        <a
          href="/CV_ATS_Shanon.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
        >
          <img
            src="/assets/cv_icon.png"
            alt="CV"
            className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
          />
        </a>
      </button>

      <button
        onClick={onJourney}
        className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
      >
        <img
          src="/assets/journey_icon.png"
          alt="Journey"
          className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
        />
      </button>
    </aside>
  );
}
