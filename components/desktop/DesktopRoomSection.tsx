import DesktopPhotoCurtain from './DesktopPhotoCurtain';
import Image from 'next/image';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../../providers/SectionOnScreenProvider';
import useOnScreen from '../../hooks/useOnScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

export enum SectionHighlightedTextColor {
  yellow = 'text-yellow-600',
  green = 'text-emerald-600',
  gray = 'text-stone-300',
  beige = 'text-orange-200',
  stone = 'text-stone-400',
}

type Props = {
  number: string;
  sectionName: SectionOnScreen;
  highlightedTextColor: SectionHighlightedTextColor;
  title: string;
  imageUrl: string;
  blurImageUrl: string;
  children: ReactNode;
};

const DesktopRoomSection = ({ number, sectionName, highlightedTextColor, title, imageUrl, blurImageUrl, children }: Props) => {
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);
  const gsapPointer = gsap.utils.selector(ref);
  const timelineNumberTop = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    isVisible && setSectionOnScreen(Object.values(SectionOnScreen)[Number(number) - 1]);
  }, [isVisible, number, setSectionOnScreen]);

  useIsomorphicLayoutEffect(() => {
    const text = gsapPointer('.text');
    const number = gsapPointer('.number');

    // add fade-in animation to number
    timelineNumberTop.current = gsap.timeline({
      scrollTrigger: {
        scroller: '#desktop-app-container',
        trigger: ref.current,
        start: '30% center',
        end: 'center center',
        scrub: 3,
      },
    });

    gsap.set(number, { autoAlpha: 0 });
    timelineNumberTop.current.to(number, { autoAlpha: 1 });

    // add parallax effect to text
    gsap.to(text, {
      yPercent: -100,
      ease: 'none',
      filter: 'blur(10px)',
      scrollTrigger: {
        scroller: '#desktop-app-container',
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
      gsap.killTweensOf('#desktop-app-container');
    };
  }, []);

  return (
    <section ref={ref} className="section relative w-full h-full">
      <div className="absolute h-full top-0 left-0 z-[3] w-[calc(33.333333%+5rem)] bg-transparent">
        <div className="relative h-screen">
          <p className="number absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            {number}
          </p>
          <div className="h-full w-full flex justify-center items-end flex-col ml-6 xl:ml-0 xl:pr-10">
            <div className="text flex justify-center flex-col gap-3">
              <h4 className={`${highlightedTextColor} font-oswald font-semibold`}>{sectionName.toUpperCase()}</h4>
              <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">{title}</h1>
              <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">{children}</p>
            </div>
          </div>
        </div>
      </div>
      <DesktopPhotoCurtain />
      <Image
        className="-scale-x-100"
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        alt="dining room"
        blurDataURL={blurImageUrl}
        placeholder="blur"
        priority
      />
    </section>
  );
};

export default DesktopRoomSection;
