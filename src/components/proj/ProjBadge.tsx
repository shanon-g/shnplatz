import type { ProjType } from '@/types/proj';

export const TYPE_LABEL: Record<ProjType, string> = {
  web: 'Web',
  ios: 'iOS',
  game: 'Game',
  'ai-ml': 'AI & ML'
};

const TYPE_BG: Record<ProjType, string> = {
  web: 'bg-[#F6DADA]',
  ios: 'bg-[#C1E3E1]',
  game: 'bg-[#EEE6FF]',
  'ai-ml': 'bg-[#efeea4]'
};

interface Props {
  type: ProjType;
  className?: string;
}

export default function ProjBadge({ type, className = '' }: Props) {
  return (
    <span
      className={`inline-block shrink-0 text-[10px] sm:text-xs font-bold px-2 py-[2px] rounded-full
        border-[2px] border-[#36312C] text-[#36312C] ${TYPE_BG[type]} ${className}`}
    >
      {TYPE_LABEL[type]}
    </span>
  );
}
