import React, { ReactNode } from 'react';
import Image from 'next/image';
import { SectionOnScreen } from '../../providers/SectionOnScreenProvider';

export enum MobileSectionColor {
  yellow = 'bg-yellow-600',
  green = 'bg-emerald-600',
  gray = 'bg-stone-300',
  beige = 'bg-orange-200',
  stone = 'bg-stone-500',
}

type Props = {
  sectionName: SectionOnScreen;
  sectionColor: MobileSectionColor;
  title: string;
  imageUrl: string;
  blurImageUrl: string;
  children: ReactNode;
};

const MobileRoomSection = ({ sectionName, sectionColor, title, imageUrl, blurImageUrl, children }: Props) => {
  return (
    <div className="-mt-20">
      <div className={`${sectionColor} w-5/6 xs:w-2/3 h-24 flex items-center px-10 translate-y-12 relative z-[1]`}>
        <p className="text-4xl text-white font-oswald font-semibold">{sectionName}</p>
      </div>
      <div className="relative w-screen">
        <h2 className="absolute top-1/4 right-0 text-white z-[1] text-8xl font-playfair">{title}</h2>
        <Image
          className="-scale-x-100"
          src={imageUrl}
          layout="responsive"
          objectFit="cover"
          alt="dining room"
          width={1000}
          height={2000}
          blurDataURL={blurImageUrl}
          placeholder="blur"
          priority
        />
      </div>
      <div className="w-full h-auto bg-zinc-700 -translate-y-20 p-10">
        <p className="text-xl text-white font-poppins">{children}</p>
      </div>
    </div>
  );
};

export default MobileRoomSection;
