import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import DesktopNavbar from '../desktop/DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const MobileLandingPage = () => {
  const { width, ref: resizeRef } = useResizeDetector();

  return (
    <div ref={resizeRef} className="relative h-full w-screen flex items-center justify-center">
      {(width as number) > 955 ? <DesktopNavbar /> : <MobileNavbar />}
    </div>
  );
};

export default MobileLandingPage;
