import { MutableRefObject, useEffect, useState } from 'react';

type UseOnScreenType = <T extends HTMLElement | null>(ref: MutableRefObject<T>, rootMargin?: string, threshold?: number) => boolean;

const useOnScreen: UseOnScreenType = <T extends HTMLElement | null>(ref: MutableRefObject<T>, rootMargin: string = '0px', threshold: number = 1) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
};

export default useOnScreen;
