'use client';

import type { ProjType } from '@/types/proj';

export type ProjFilter = ProjType | 'all';

const FILTERS: { value: ProjFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'ios', label: 'iOS' },
  { value: 'game', label: 'Games' },
  { value: 'ai-ml', label: 'AI & ML' }
];

interface Props {
  query: string;
  setQuery: (v: string) => void;
  filter: ProjFilter;
  setFilter: (v: ProjFilter) => void;
}

export default function ProjToolbar({ query, setQuery, filter, setFilter }: Props) {
  return (
    <div className="shrink-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 border-b-[4px] border-[#36312C]">
      <div className="relative sm:w-64 shrink-0">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="w-full bg-[#F9F2E4] border-[3px] border-[#36312C] rounded-lg
            pl-3 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#36312C]
            placeholder:text-[#726e5f] placeholder:font-normal outline-none
            focus:shadow-[3px_3px_0_0_#36312C] transition-shadow"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#36312C] font-extrabold text-xs hover:opacity-60 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border-[3px] border-[#36312C]
              text-[10px] sm:text-xs font-extrabold uppercase tracking-wide transition-all duration-200
              ${filter === f.value
                ? 'bg-[#E4ABAB] shadow-[3px_3px_0_0_#36312C]'
                : 'bg-[#F9F2E4] hover:bg-[#F6DADA] hover:-translate-y-[2px]'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
