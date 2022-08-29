import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';

const PhotoCurtain = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const timelineCurtainTop = useRef<gsap.core.Timeline | null>(null);
  const timelineCurtainBottom = useRef<gsap.core.Timeline | null>(null);

  useIsomorphicLayoutEffect(() => {
    timelineCurtainTop.current = gsap.timeline({
      scrollTrigger: {
        scroller: '#app-container',
        trigger: ref.current,
        start: '10% center',
        end: 'center-=100 center',
        scrub: 1,
      },
    });

    timelineCurtainTop.current.set(ref.current, { x: 0 });
    timelineCurtainTop.current.to(ref.current, { x: '-100%' });

    timelineCurtainBottom.current = gsap.timeline({
      scrollTrigger: {
        scroller: '#app-container',
        trigger: ref.current,
        start: 'center+=100 center',
        end: '90% center',
        scrub: 0.5,
      },
    });

    timelineCurtainBottom.current.set(ref.current, { x: '-100%' });
    timelineCurtainBottom.current.to(ref.current, { x: 0 });
  }, []);

  return <div ref={ref} className="curtain absolute right-0 z-[1] w-2/3 h-full bg-zinc-500" />;
};

export default PhotoCurtain;
