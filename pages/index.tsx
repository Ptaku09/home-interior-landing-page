import type { NextPage } from 'next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import { throttle } from 'lodash';
import RoomSection, { SectionMainColor } from '../components/RoomSection';
import { SectionOnScreen } from '../providers/SectionOnScreenProvider';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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

  return (
    <div ref={ref} id="app-container" className="h-screen overflow-y-scroll">
      <Navbar />
      <RoomSection
        id="living-room"
        number="01"
        sectionName={SectionOnScreen.livingRoom}
        color={SectionMainColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
      >
        <>
          Light walls and yellow furniture match very well. Green plant adds some{' '}
          <span className={`text-${SectionMainColor.yellow} font-semibold`}> contrast</span> and nature to room. Accessories such as sculpture or
          clock <span className={`text-${SectionMainColor.yellow} font-semibold`}> breaks the monotony</span>.
        </>
      </RoomSection>
      <RoomSection
        id="dining-room"
        number="02"
        sectionName={SectionOnScreen.diningRoom}
        color={SectionMainColor.green}
        title="Stylish"
        imageUrl="/images/dining-room.jpg"
      >
        <>
          Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more
          <span className={`text-${SectionMainColor.green} font-semibold`}> comfortable and cosy</span>.
        </>
      </RoomSection>
    </div>
  );
};

export default Home;
