'use client';

import { Dispatch, SetStateAction, useState } from 'react';

// Plays the dockDown animation, then unmounts once it has finished.
export function useOverlayClose(setShow: Dispatch<SetStateAction<boolean>>) {
  const [isClosing, setIsClosing] = useState(false);

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
    }, 300);
  };

  return { isClosing, close };
}
