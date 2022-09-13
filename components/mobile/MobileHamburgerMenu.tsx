import React, { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import useLockScroll from '../../hooks/useLockScroll';
import { SectionOnScreen } from '../../providers/SectionOnScreenProvider';
import MobileMenuTile from './MobileMenuTile';

const MobileHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { lockScroll, unlockScroll } = useLockScroll();
  const ref = useRef<HTMLDivElement | null>(null);
  const gsapPointer = gsap.utils.selector(ref);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  useIsomorphicLayoutEffect(() => {
    const menuBackground = gsapPointer('.menu-background');
    const texts: HTMLParagraphElement[] = gsap.utils.toArray(gsapPointer('.text'));
    menuTimeline.current = gsap.timeline();

    if (isOpen) {
      lockScroll();
      menuTimeline.current.to(menuBackground, { backgroundColor: 'rgba(255, 255, 255, 0.7)', duration: 0.2 });

      texts.forEach((text: HTMLParagraphElement) => {
        menuTimeline.current?.to(text, { x: 0, duration: 0.2 }, '-=0.08');
      });
    } else {
      menuTimeline.current.to(menuBackground, { x: -window.innerWidth, duration: 0.2 });
      menuTimeline.current.set(menuBackground, { backgroundColor: 'rgba(255, 255, 255, 0)', x: 0 });

      texts.forEach((text: HTMLParagraphElement) => {
        menuTimeline.current?.set(text, { x: -window.innerWidth });
      });

      unlockScroll();
    }

    return () => {
      menuTimeline.current?.kill();
    };
  }, [isOpen]);

  return (
    <div ref={ref}>
      <div className="relative z-[1] w-7 h-5 mt-4">
        <input
          id="hamburger-menu"
          type="checkbox"
          className="hidden peer"
          checked={isOpen}
          onChange={() => setIsOpen((prevState: boolean) => !prevState)}
        />
        <label
          htmlFor="hamburger-menu"
          className="absolute h-1 w-7 bg-white duration-200 before:transition-all before:bg-white before:h-1 before:w-7 before:absolute before:-mt-2 after:transition-all after:bg-white after:h-1 after:w-7 after:absolute after:mt-2 peer-checked:bg-transparent peer-checked:before:rotate-45 peer-checked:before:bg-stone-500 before:origin-[1px] peer-checked:after:-rotate-45 peer-checked:after:bg-stone-500 after:origin-[1px] peer-checked:after:translate-y-0.5"
        />
      </div>
      <div className="menu-background w-screen h-screen absolute top-0 left-0 text-2xl bg-opacity-0 flex items-center justify-center flex-col gap-6">
        <div className="w-screen h-16 absolute top-0" /> {/* this is for auto-closing the menu when focus is lost, but keeps tiles centered */}
        <div className="w-full h-full flex items-center justify-center flex-col gap-6 w-2/3" onClick={() => setIsOpen(false)}>
          {Object.values(SectionOnScreen).map((sectionName: string) => (
            <MobileMenuTile key={sectionName} sectionName={sectionName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHamburgerMenu;
