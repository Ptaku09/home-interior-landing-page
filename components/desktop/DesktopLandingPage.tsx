import React, { useRef } from 'react';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import { throttle } from 'lodash';
import DesktopNavbar from './DesktopNavbar';
import DesktopRoomSection, { SectionHighlightedTextColor, SectionPinsColor } from './DesktopRoomSection';
import { SectionOnScreen } from '../../providers/SectionOnScreenProvider';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import DesktopTextSide from './DesktopTextSide';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const DesktopLandingPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const gsapPointer = gsap.utils.selector(ref);

  // handle scroll to section
  useIsomorphicLayoutEffect(() => {
    const sections: HTMLTableSectionElement[] = gsap.utils.toArray(gsapPointer('.section'));
    const navButtons: HTMLButtonElement[] = gsap.utils.toArray(gsapPointer('.nav-button'));

    const goToSection = throttle((i: number) => {
      gsap.set('#desktop-app-container', { overflow: 'hidden' });

      gsap.to('#desktop-app-container', {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 0.75,
        onComplete: () => {
          gsap.set('#desktop-app-container', { overflow: 'auto' });
        },
      });
    }, 750);

    sections.forEach((section: HTMLTableSectionElement, i: number) => {
      ScrollTrigger.create({
        scroller: '#desktop-app-container',
        trigger: section,
        onEnter: () => goToSection(i),
      });

      ScrollTrigger.create({
        scroller: '#desktop-app-container',
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
      gsap.killTweensOf('#desktop-app-container');
    };
  }, []);

  return (
    <div ref={ref} id="desktop-app-container" className="h-screen overflow-y-scroll">
      <DesktopNavbar />
      <DesktopTextSide />
      <DesktopRoomSection
        number="01"
        sectionName={SectionOnScreen.livingRoom}
        highlightedTextColor={SectionHighlightedTextColor.yellow}
        pinsColor={SectionPinsColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
        blurImageUrl="/images/living-room-blur.jpg"
      >
        <>
          Light walls and yellow furniture match very well. Green plant adds some{' '}
          <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>contrast</span> and nature to room. Accessories such as sculpture or
          clock <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>breaks the monotony</span>.
        </>
      </DesktopRoomSection>
      <DesktopRoomSection
        number="02"
        sectionName={SectionOnScreen.diningRoom}
        highlightedTextColor={SectionHighlightedTextColor.green}
        pinsColor={SectionPinsColor.green}
        title="Stylish"
        imageUrl="/images/dining-room.jpg"
        blurImageUrl="/images/dining-room-blur.jpg"
      >
        <>
          Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more{' '}
          <span className={`${SectionHighlightedTextColor.green} font-semibold`}>comfortable and cosy</span>.
        </>
      </DesktopRoomSection>
      <DesktopRoomSection
        number="03"
        sectionName={SectionOnScreen.kitchen}
        highlightedTextColor={SectionHighlightedTextColor.gray}
        pinsColor={SectionPinsColor.gray}
        title="Modern"
        imageUrl="/images/kitchen.jpg"
        blurImageUrl="/images/kitchen-blur.jpg"
      >
        <>
          Dark cabinets, table and chairs add <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>modernity</span> to the room. Huge
          worktop next to the window is <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>very practical</span>. Fresh spices
          hanging over the table give the place an table magical atmosphere.
        </>
      </DesktopRoomSection>
      <DesktopRoomSection
        number="04"
        sectionName={SectionOnScreen.bedroom}
        highlightedTextColor={SectionHighlightedTextColor.beige}
        pinsColor={SectionPinsColor.beige}
        title="Homely"
        imageUrl="/images/bedroom.jpg"
        blurImageUrl="/images/bedroom-blur.jpg"
      >
        <>
          The entire bedroom is in a beige shade which makes it seem{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>comfortable</span>.{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>King-size bed</span> guarantees great sleep and the whole thing is
          due to large window that lets sunlight into the room.
        </>
      </DesktopRoomSection>
      <DesktopRoomSection
        number="05"
        sectionName={SectionOnScreen.bathroom}
        highlightedTextColor={SectionHighlightedTextColor.stone}
        pinsColor={SectionPinsColor.stone}
        title="Nature"
        imageUrl="/images/bathroom.jpg"
        blurImageUrl="/images/bathroom-blur.jpg"
      >
        <>
          Bathroom is strictly <span className={`${SectionHighlightedTextColor.stone} font-semibold`}>connected with the nature</span>. Despite the
          use of stone, the room does not look ascetic. Rain shower between real trees gives the impression of showering{' '}
          <span className={`${SectionHighlightedTextColor.stone} font-semibold`}>in the wild</span>.
        </>
      </DesktopRoomSection>
    </div>
  );
};

export default DesktopLandingPage;
