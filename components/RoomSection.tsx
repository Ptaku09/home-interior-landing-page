import PhotoCurtain from './PhotoCurtain';
import Image from 'next/image';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../providers/SectionOnScreenProvider';
import useOnScreen from '../hooks/useOnScreen';

export enum RoomNameColor {
  yellow = 'text-yellow-600',
  green = 'text-emerald-600',
}

type Props = {
  id: string;
  number: string;
  sectionName: SectionOnScreen;
  color: RoomNameColor;
  title: string;
  imageUrl: string;
  children: ReactNode;
};

const RoomSection = ({ id, number, sectionName, color, title, imageUrl, children }: Props) => {
  const { setSectionOnScreen } = useContext(SectionOnScreenContext);
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const isVisible = useOnScreen(ref, '0px', 0.51);

  useEffect(() => {
    isVisible && setSectionOnScreen(Object.values(SectionOnScreen)[Number(number) - 1]);
  }, [isVisible, number, setSectionOnScreen]);

  return (
    <section ref={ref} id={id} className="section relative w-full h-full">
      <div className="absolute h-full top-0 left-0 z-[2] w-1/3 bg-transparent">
        <div className="relative h-screen">
          <p className="number absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            {number}
          </p>
          <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col">
            <div className="text flex justify-center flex-col gap-3">
              <h4 className={`${color} font-oswald font-semibold`}>{sectionName.toUpperCase()}</h4>
              <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">{title}</h1>
              <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">{children}</p>
            </div>
          </div>
        </div>
      </div>
      <PhotoCurtain />
      <Image className="-scale-x-100" src={imageUrl} layout="fill" objectFit="cover" alt="dining room" priority />
    </section>
  );
};

export default RoomSection;
