import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import MobileRoomSection, { MobileSectionColor } from './MobileRoomSection';
import { SectionOnScreen } from '../../providers/SectionOnScreenProvider';
import { SectionHighlightedTextColor } from '../desktop/DesktopRoomSection';
import DesktopNavbar from '../desktop/DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const MobileLandingPage = () => {
  const { width, ref: resizeRef } = useResizeDetector();

  return (
    <div ref={resizeRef} className="relative h-auto w-screen pt-28 flex flex-col items-start">
      {(width as number) > 955 ? <DesktopNavbar /> : <MobileNavbar />}
      <MobileRoomSection
        sectionName={SectionOnScreen.livingRoom}
        sectionColor={MobileSectionColor.yellow}
        title="Design"
        imageUrl="/images/living-room.jpg"
        blurImageUrl="/images/living-room-blur.jpg"
      >
        <>
          Light walls and yellow furniture match very well. Green plant adds some{' '}
          <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>contrast</span> and nature to room. Accessories such as sculpture or
          clock <span className={`${SectionHighlightedTextColor.yellow} font-semibold`}>breaks the monotony</span>.
        </>
      </MobileRoomSection>
      <MobileRoomSection
        sectionName={SectionOnScreen.diningRoom}
        sectionColor={MobileSectionColor.green}
        title="Stylish"
        imageUrl="/images/dining-room.jpg"
        blurImageUrl="/images/dining-room-blur.jpg"
      >
        <>
          Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more{' '}
          <span className={`${SectionHighlightedTextColor.green} font-semibold`}>comfortable and cosy</span>.
        </>
      </MobileRoomSection>
      <MobileRoomSection
        sectionName={SectionOnScreen.kitchen}
        sectionColor={MobileSectionColor.gray}
        title="Magic"
        imageUrl="/images/kitchen.jpg"
        blurImageUrl="/images/kitchen-blur.jpg"
      >
        <>
          Dark cabinets, table and chairs add <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>modernity</span> to the room. Huge
          worktop next to the window is <span className={`${SectionHighlightedTextColor.gray} font-semibold`}>very practical</span>. Fresh spices
          hanging over the table give the place an table magical atmosphere.
        </>
      </MobileRoomSection>
      <MobileRoomSection
        sectionName={SectionOnScreen.bedroom}
        sectionColor={MobileSectionColor.beige}
        title="Comfy"
        imageUrl="/images/bedroom.jpg"
        blurImageUrl="/images/bedroom-blur.jpg"
      >
        <>
          The entire bedroom is in a beige shade which makes it seem{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>comfortable</span>.{' '}
          <span className={`${SectionHighlightedTextColor.beige} font-semibold`}>King-size bed</span> guarantees great sleep and the whole thing is
          due to large window that lets sunlight into the room.
        </>
      </MobileRoomSection>
      <MobileRoomSection
        sectionName={SectionOnScreen.bathroom}
        sectionColor={MobileSectionColor.stone}
        title="Nature"
        imageUrl="/images/bathroom.jpg"
        blurImageUrl="/images/bathroom-blur.jpg"
      >
        <>
          Bathroom is strictly <span className={`${SectionHighlightedTextColor.stone} font-semibold`}>connected with the nature</span>. Despite the
          use of stone, the room does not look ascetic. Rain shower between real trees gives the impression of showering{' '}
          <span className={`${SectionHighlightedTextColor.stone} font-semibold`}>in the wild</span>.
        </>
      </MobileRoomSection>
    </div>
  );
};

export default MobileLandingPage;
