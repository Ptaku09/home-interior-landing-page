import type { NextPage } from 'next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import { throttle } from 'lodash';
import RoomSection, { SectionHighlightedTextColor, SectionPinsColor } from '../components/RoomSection';
import { SectionOnScreen } from '../providers/SectionOnScreenProvider';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const gsapPointer = gsap.utils.selector(ref);

  // handle scroll to section
  useIsomorphicLayoutEffect(() => {
    const sections: HTMLTableSectionElement[] = gsap.utils.toArray(gsapPointer('.section'));
    const navButtons: HTMLButtonElement[] = gsap.utils.toArray(gsapPointer('.nav-button'));

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
        number="01"
        sectionName={SectionOnScreen.livingRoom}
        highlightedTextColor={SectionHighlightedTextColor.yellow}
        pinsColor={SectionPinsColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
      >
        <>
          Light walls and yellow furniture match very well. Green plant adds some{' '}
          <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>contrast</span> and nature to room. Accessories such as sculpture or
          clock <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>breaks the monotony</span>.
        </>
      </RoomSection>
      <RoomSection
        number="02"
        sectionName={SectionOnScreen.diningRoom}
        highlightedTextColor={SectionHighlightedTextColor.green}
        pinsColor={SectionPinsColor.green}
        title="Stylish"
        imageUrl="/images/dining-room.jpg"
      >
        <>
          Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more{' '}
          <span className={`${SectionHighlightedTextColor.green} font-semibold`}>comfortable and cosy</span>.
        </>
      </RoomSection>
      <RoomSection
        number="03"
        sectionName={SectionOnScreen.kitchen}
        highlightedTextColor={SectionHighlightedTextColor.gray}
        pinsColor={SectionPinsColor.gray}
        title="Modern"
        imageUrl="/images/kitchen.jpg"
      >
        <>
          Dark cabinets, table and chairs add <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>modernity</span> to the room. Huge
          worktop next to the window is <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>very practical</span>. Fresh spices
          hanging over the table give the place an table magical atmosphere.
        </>
      </RoomSection>
      <RoomSection
        number="04"
        sectionName={SectionOnScreen.bedroom}
        highlightedTextColor={SectionHighlightedTextColor.beige}
        pinsColor={SectionPinsColor.beige}
        title="Homely"
        imageUrl="/images/bedroom.jpg"
      >
        <>
          The entire bedroom is in a beige shade which makes it seem{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>comfortable</span>.{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>King-size bed</span> guarantees great sleep and the whole thing is
          due to large window that lets sunlight into the room.
        </>
      </RoomSection>
    </div>
  );
};

export default Home;
