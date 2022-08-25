import Image from 'next/image';
import livingRoom from '../public/images/living-room.jpg';
import { useContext, useEffect, useRef } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../providers/SectionOnScreenProvider';
import useOnScreen from '../hooks/useOnScreen';
import PhotoCurtain from './PhotoCurtain';

const LivingRoom = () => {
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);

  useEffect(() => {
    isVisible && setSectionOnScreen(SectionOnScreen.livingRoom);
  }, [isVisible, setSectionOnScreen]);

  return (
    <section ref={ref} id="living-room" className="section relative w-full h-full snap-center">
      <div className="absolute h-full top-0 left-0 z-[2] w-1/3 bg-transparent">
        <div className="relative h-screen">
          <p className="absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            01
          </p>
          <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col gap-3">
            <p className="text text-yellow-600 font-oswald font-semibold">LIVING ROOM</p>
            <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">Design</h1>
            <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">
              Light walls and yellow furniture match very well. Green plant adds some <span className="text-yellow-600 font-semibold"> contrast</span>{' '}
              and nature to room. Accessories such as sculpture or clock <span className="text-yellow-600 font-semibold"> breaks the monotony</span>.
            </p>
          </div>
        </div>
      </div>
      <PhotoCurtain />
      <Image className="-scale-x-100" src={livingRoom} layout="fill" objectFit="cover" alt="dining room" priority />
    </section>
  );
};

export default LivingRoom;
