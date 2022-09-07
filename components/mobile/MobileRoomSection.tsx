import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionOnScreen, SectionOnScreenContext } from '../../providers/SectionOnScreenProvider';
import useOnScreen from '../../hooks/useOnScreen';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';

export enum MobileSectionColor {
  yellow = 'bg-yellow-600',
  green = 'bg-emerald-600',
  gray = 'bg-stone-300',
  beige = 'bg-orange-200',
  stone = 'bg-stone-500',
}

type Props = {
  number: string;
  sectionName: SectionOnScreen;
  sectionColor: MobileSectionColor;
  title: string;
  imageUrl: string;
  blurImageUrl: string;
  children: ReactNode;
};

const MobileRoomSection = ({ number, sectionName, sectionColor, title, imageUrl, blurImageUrl, children }: Props) => {
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const gsapPointer = gsap.utils.selector(ref);

  useEffect(() => {
    isVisible && setSectionOnScreen(Object.values(SectionOnScreen)[Number(number) - 1]);
  }, [isVisible, number, setSectionOnScreen]);

  useIsomorphicLayoutEffect(() => {
    const sectionName = gsapPointer('.section-name');
    const title = gsapPointer('.title');
    const text = gsapPointer('.text');

    // add parallax effect to section name
    gsap.to(sectionName, {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        scroller: 'body',
        trigger: ref.current,
        start: 'top 80%',
        end: 'center center',
        scrub: true,
      },
    });

    // add parallax effect to text
    gsap.to(text, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        scroller: 'body',
        trigger: ref.current,
        start: '30% 80%',
        end: 'bottom center',
        scrub: true,
      },
    });

    // add slide-in effect to title
    gsap.fromTo(
      title,
      {
        x: '100%',
      },
      {
        x: '0%',
        scrollTrigger: {
          scroller: 'body',
          trigger: ref.current,
          start: 'top 80%',
          end: '30% center',
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <section ref={ref} className="-mt-20 overflow-hidden">
      <div className={`${sectionColor} section-name w-5/6 xs:w-2/3 h-24 flex items-center px-10 translate-y-32 relative z-[1] text-white`}>
        <p className="text-4xl font-oswald font-semibold">{sectionName}</p>
      </div>
      <div className="relative w-screen">
        <h2 className="title absolute top-1/4 right-5 text-white z-[1] text-8xl font-playfair">{title}</h2>
        <Image
          className="-scale-x-100"
          src={imageUrl}
          layout="responsive"
          objectFit="cover"
          alt="dining room"
          width={1000}
          height={2000}
          blurDataURL={blurImageUrl}
          placeholder="blur"
          priority
        />
      </div>
      <div className="text relative w-full h-auto bg-zinc-700 -translate-y-0 p-10 bg-opacity-70 overflow-hidden">
        <p className="relative z-[1] text-xl text-white font-poppins">{children}</p>
      </div>
    </section>
  );
};

export default MobileRoomSection;
