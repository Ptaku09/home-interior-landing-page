import { useCallback } from 'react';

type UseLockScroll = () => {
  lockScroll: () => void;
  unlockScroll: () => void;
};

const useScroll: UseLockScroll = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

export default useScroll;
