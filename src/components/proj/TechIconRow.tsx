'use client';

import { useState } from 'react';
import CubeIcon from '@/components/CubeIcon';
import type { TechIcon } from '@/types/proj';

interface Props {
  icons: TechIcon[];
}

// Two copies of each cube: the desktop one flips on hover via `group`, the
// mobile one flips on tap. Only one is visible at a given breakpoint.
export default function TechIconRow({ icons }: Props) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [tapped, setTapped] = useState<Record<number, boolean>>({});

  const hndlTap = (i: number) => setTapped((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="flex gap-1 flex-row flex-wrap items-center">
      {icons.map((icon, i) => (
        <div key={i}>
          <div className="hidden sm:block">
            <CubeIcon
              icon={icon}
              isActive={hoverIdx === i}
              onClick={() => setHoverIdx(hoverIdx === i ? null : i)}
              wrapCls="group"
            />
          </div>

          <CubeIcon
            icon={icon}
            isActive={Boolean(tapped[i])}
            onClick={() => hndlTap(i)}
            wrapCls="block sm:hidden"
          />
        </div>
      ))}
    </div>
  );
}
