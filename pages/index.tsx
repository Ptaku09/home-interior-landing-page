import type { NextPage } from 'next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import React from 'react';
import DesktopLandingPage from '../components/desktop/DesktopLandingPage';
import { useResizeDetector } from 'react-resize-detector';
import MobileLandingPage from '../components/mobile/MobileLandingPage';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Home: NextPage = () => {
  const { width, ref: resizeRef } = useResizeDetector();

  return <div ref={resizeRef}>{(width as number) > 955 ? <DesktopLandingPage /> : <MobileLandingPage />}</div>;
};

export default Home;
