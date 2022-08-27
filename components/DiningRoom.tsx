import Image from 'next/image';
import diningRoom from '../public/images/dining-room.jpg';
import { useContext, useEffect, useRef } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../providers/SectionOnScreenProvider';
import useOnScreen from '../hooks/useOnScreen';
import PhotoCurtain from './PhotoCurtain';

const DiningRoom = () => {
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);

  useEffect(() => {
    isVisible && setSectionOnScreen(SectionOnScreen.diningRoom);
  }, [isVisible, setSectionOnScreen]);

  return (
    <section ref={ref} id="dining-room" className="section relative w-full h-full">
      <div className="absolute h-full top-0 left-0 z-[2] w-1/3 bg-transparent">
        <div className="relative h-screen">
          <p className="number absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            02
          </p>
          <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col">
            <div className="text flex justify-center flex-col gap-3">
              <p className="text-emerald-600 font-oswald font-semibold">DINING ROOM</p>
              <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">Stylish</h1>
              <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">
                Emerald green chairs play well with golden and black elements. Mirror adds some visual space to the room. Carpet makes it more
                <span className="text-emerald-600 font-semibold"> comfortable and cosy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PhotoCurtain />
      <Image className="-scale-x-100" src={diningRoom} layout="fill" objectFit="cover" alt="dining room" priority />
    </section>
  );
};

export default DiningRoom;
