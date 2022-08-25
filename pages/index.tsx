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
      const number = section.querySelector('.number');

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
  }, []);

  return (
    <div ref={ref} id="app-container" className="h-screen overflow-y-scroll scroll-smooth snap-mandatory snap-y">
      <LivingRoom />
      <DiningRoom />
      <DiningRoom />
      <DiningRoom />
    </div>
  );
};

export default Home;
