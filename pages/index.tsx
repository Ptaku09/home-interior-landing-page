import type { NextPage } from 'next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import React from 'react';
import DesktopLandingPage from '../components/desktop/DesktopLandingPage';
import { useResizeDetector } from 'react-resize-detector';
import Device from '../components/device/index';
import MobileLandingPage from '../components/mobile/MobileLandingPage';
import TabletLandingPage from '../components/tablet/TabletLandingPage';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Home: NextPage = () => {
  const { width, ref: resizeRef } = useResizeDetector();

  return (
    <div ref={resizeRef}>
      <Device>
        {({ isBrowser, isMobileOnly, isTablet }) => {
          if (isBrowser && (width as number) > 955) return <DesktopLandingPage />;
          if (isMobileOnly || (width as number) < 500) return <MobileLandingPage />;
          if (isTablet) return <TabletLandingPage />;
          return <DesktopLandingPage />;
        }}
      </Device>
    </div>
  );
};

export default Home;
