import type { NextPage } from 'next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { throttle } from 'lodash';
import RoomSection, { RoomNameColor } from '../components/RoomSection';
import { SectionOnScreen } from '../providers/SectionOnScreenProvider';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // handle scroll to section
  useIsomorphicLayoutEffect(() => {
    const pointer = gsap.utils.selector(ref);
    const sections: HTMLTableSectionElement[] = gsap.utils.toArray(pointer('.section'));
    const navButtons: HTMLButtonElement[] = gsap.utils.toArray(pointer('.nav-button'));

    const goToSection = throttle((i: number) => {
      gsap.set('#app-container', { overflow: 'hidden' });

      gsap.to('#app-container', {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 0.75,
        onComplete: () => {
          gsap.set('#app-container', { overflow: 'auto' });
        },
      });
    }, 750);

    sections.forEach((section: HTMLTableSectionElement, i: number) => {
      ScrollTrigger.create({
        scroller: '#app-container',
        trigger: section,
        onEnter: () => goToSection(i),
      });

      ScrollTrigger.create({
        scroller: '#app-container',
        trigger: section,
        start: 'bottom bottom',
        onEnterBack: () => goToSection(i),
      });
    });

    // connect navbar with scrollToPlugin
    navButtons.forEach((button: HTMLButtonElement, i: number) => {
      button.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        goToSection(i);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
      gsap.killTweensOf('#app-container');
    };
  }, []);

  // handle other animations
  useIsomorphicLayoutEffect(() => {
    const pointer = gsap.utils.selector(ref);
    const sections: HTMLTableSectionElement[] = gsap.utils.toArray(pointer('.section'));

    sections.forEach((section: HTMLTableSectionElement) => {
      const curtain = section.querySelector('.curtain');
      const text = section.querySelector('.text');
      const number = section.querySelector('.number');

      const timelineCurtainTop = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: '10% center',
          end: 'center-=100 center',
          scrub: 1,
        },
      });

      timelineCurtainTop.set(curtain, { x: 0 });
      timelineCurtainTop.to(curtain, { x: '-100%' });

      const timelineCurtainBottom = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: 'center+=100 center',
          end: '90% center',
          scrub: 0.5,
        },
      });

      timelineCurtainBottom.set(curtain, { x: '-100%' });
      timelineCurtainBottom.to(curtain, { x: 0 });

      // add parallax effect to text
      gsap.to(text, {
        yPercent: -100,
        ease: 'none',
        filter: 'blur(10px)',
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // add appear animation to number
      const tlNumberShow = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: '30% center',
          end: 'center center',
          scrub: 3,
        },
      });

      gsap.set(number, { opacity: 0 });
      tlNumberShow.to(number, { opacity: 1 });

      const tlNumberHide = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: 'center center',
          end: '70% center',
          scrub: 2,
        },
      });

      tlNumberHide.set(number, { opacity: 1 });
      tlNumberHide.to(number, { opacity: 0 });
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
      gsap.killTweensOf('#app-container');
    };
  }, []);

  return (
    <div ref={ref} id="app-container" className="h-screen overflow-y-scroll">
      <Navbar />
      <RoomSection
        id="living-room"
        number="01"
        sectionName={SectionOnScreen.livingRoom}
        color={RoomNameColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
      >
        <>
          Light walls and yellow furniture match very well. Green plant adds some{' '}
          <span className={`${RoomNameColor.yellow} font-semibold`}> contrast</span> and nature to room. Accessories such as sculpture or clock{' '}
          <span className={`${RoomNameColor.yellow} font-semibold`}> breaks the monotony</span>.
        </>
      </RoomSection>
      <RoomSection
        id="dining-room"
        number="02"
        sectionName={SectionOnScreen.diningRoom}
        color={RoomNameColor.green}
        title="Stylish"
        imageUrl="/images/dining-room.jpg"
      >
        <>
          Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more
          <span className={`${RoomNameColor.green} font-semibold`}> comfortable and cosy</span>.
        </>
      </RoomSection>
    </div>
  );
};

export default Home;
