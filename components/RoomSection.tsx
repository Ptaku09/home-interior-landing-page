import PhotoCurtain from './PhotoCurtain';
import Image from 'next/image';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../providers/SectionOnScreenProvider';
import useOnScreen from '../hooks/useOnScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export enum SectionHighlightedTextColor {
  yellow = 'text-yellow-600',
  green = 'text-emerald-600',
  gray = 'text-stone-300',
}

export enum SectionPinsColor {
  yellow = 'bg-yellow-600',
  green = 'bg-emerald-600',
  gray = 'bg-stone-300',
}

type Props = {
  number: string;
  sectionName: SectionOnScreen;
  highlightedTextColor: SectionHighlightedTextColor;
  pinsColor: SectionPinsColor;
  title: string;
  imageUrl: string;
  children: ReactNode;
};

const RoomSection = ({ number, sectionName, highlightedTextColor, pinsColor, title, imageUrl, children }: Props) => {
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);
  const gsapPointer = gsap.utils.selector(ref);
  const timelineNumberTop = useRef<gsap.core.Timeline | null>(null);
  const timelineNumberBottom = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    isVisible && setSectionOnScreen(Object.values(SectionOnScreen)[Number(number) - 1]);
  }, [isVisible, number, setSectionOnScreen]);

  useIsomorphicLayoutEffect(() => {
    const text = gsapPointer('.text');
    const number = gsapPointer('.number');

    // add fade-in animation to number
    timelineNumberTop.current = gsap.timeline({
      scrollTrigger: {
        scroller: '#app-container',
        trigger: ref.current,
        start: '30% center',
        end: 'center center',
        scrub: 3,
      },
    });

    gsap.set(number, { opacity: 0 });
    timelineNumberTop.current.to(number, { opacity: 1 });

    timelineNumberBottom.current = gsap.timeline({
      scrollTrigger: {
        scroller: '#app-container',
        trigger: ref.current,
        start: 'center center',
        end: '70% center',
        scrub: 2,
      },
    });

    timelineNumberBottom.current.set(number, { opacity: 1 });
    timelineNumberBottom.current.to(number, { opacity: 0 });

    // add parallax effect to text
    gsap.to(text, {
      yPercent: -100,
      ease: 'none',
      filter: 'blur(10px)',
      scrollTrigger: {
        scroller: '#app-container',
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
      gsap.killTweensOf('#app-container');
    };
  }, []);

  return (
    <section ref={ref} className="section relative w-full h-full">
      <div className="absolute h-full top-0 left-0 z-[2] w-1/3 bg-transparent">
        <div className="relative h-screen">
          <p className="number absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            {number}
          </p>
          <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col">
            <div className="text flex justify-center flex-col gap-3">
              <h4 className={`${highlightedTextColor} font-oswald font-semibold`}>{sectionName.toUpperCase()}</h4>
              <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">{title}</h1>
              <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">{children}</p>
            </div>
          </div>
        </div>
      </div>
      <PhotoCurtain />
      <Image className="-scale-x-100" src={imageUrl} layout="fill" objectFit="cover" alt="dining room" priority />
    </section>
  );
};

export default RoomSection;
