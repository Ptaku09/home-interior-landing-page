import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { SectionOnScreen, SectionOnScreenContext } from '../../providers/SectionOnScreenProvider';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import _ from 'lodash';
import Image from 'next/image';
import { SectionBackgroundColor } from '../mobile/MobileRoomSection';

export enum SectionBorderColor {
  yellow = 'border-yellow-600',
  green = 'border-emerald-600',
  gray = 'border-stone-300',
  beige = 'border-orange-200',
  stone = 'border-stone-500',
}

type Props = {
  number: string;
  sectionName: SectionOnScreen;
  sectionColorBackground: SectionBackgroundColor;
  sectionColorBorder: SectionBorderColor;
  title: string;
  imageUrl: string;
  blurImageUrl: string;
  children: ReactNode;
};

const TabletRoomSection = ({ number, sectionName, sectionColorBackground, sectionColorBorder, title, imageUrl, blurImageUrl, children }: Props) => {
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

    return () => {
      gsap.killTweensOf('body');
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-b-8">
      <span id={_.kebabCase(sectionName)} className="absolute -top-4" />
      <div className={`${sectionColorBackground} section-name absolute top-52 w-5/6 h-36 flex items-center px-10 z-[1] text-white`}>
        <p className="text-5xl font-oswald font-semibold">{sectionName}</p>
      </div>
      <div className="relative w-screen h-screen">
        <h2 className="title absolute top-1/4 right-5 text-white z-[1] text-[12rem] font-playfair">{title}</h2>
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
      </div>
      <div className={`${sectionColorBorder} text w-2/3 h-auto absolute bottom-14 left-10 bg-white bg-opacity-50 border-4 p-12 overflow-hidden`}>
        <p className="relative z-[1] text-xl text-stone-900 font-poppins">{children}</p>
      </div>
    </section>
  );
};

export default TabletRoomSection;
