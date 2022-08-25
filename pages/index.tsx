import type { NextPage } from 'next';
import LivingRoom from '../components/LivingRoom';
import DiningRoom from '../components/DiningRoom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pointer = gsap.utils.selector(ref);
    const sections: HTMLTableSectionElement[] = gsap.utils.toArray(pointer('.section'));

    sections.forEach((section: HTMLTableSectionElement) => {
      const curtain = section.querySelector('.curtain');
      const text = section.querySelector('.text');

      const timelineShow = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: '10% center',
          end: 'center-=100 center',
          scrub: 0.5,
        },
      });

      timelineShow.set(curtain, { x: 0 });
      timelineShow.to(curtain, { x: '-100%', duration: 1 });

      const timelineHide = gsap.timeline({
        scrollTrigger: {
          scroller: '#app-container',
          trigger: section,
          start: 'center+=100 center',
          end: '90% center',
          scrub: 0.5,
        },
      });

      timelineHide.set(curtain, { x: '-100%' });
      timelineHide.to(curtain, { x: 0, duration: 1 });

      // add parallax effect to text
      gsap.to(text, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          scroller: '#app-container',
          start: 'top top',
          end: 'bottom top',
          trigger: section,
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div ref={ref} id="app-container" className="h-screen overflow-y-scroll scroll-smooth snap-y">
      <LivingRoom />
      <DiningRoom />
    </div>
  );
};

export default Home;
