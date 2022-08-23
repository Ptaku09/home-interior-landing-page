import Image from 'next/image';
import livingRoom from '../public/images/living-room.jpg';

const LivingRoom = () => {
  return (
    <div id="dining-room" className="relative w-full h-screen">
      <div className="absolute h-full top-0 left-0 z-[1] w-1/3 bg-transparent">
        <div className="relative h-screen">
          <p className="absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
            02
          </p>
          <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col gap-3">
            <p className="text-yellow-600 font-oswald font-semibold">DINING ROOM</p>
            <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">Design</h1>
            <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">
              Light walls and yellow furniture match very well. Green plant adds some contrast and nature to room. Accessories such as sculpture or
              clock breaks the monotony.
            </p>
          </div>
        </div>
      </div>
      <Image className="-scale-x-100" src={livingRoom} layout="fill" objectFit="cover" alt="dining room" priority />
    </div>
  );
};

export default LivingRoom;
