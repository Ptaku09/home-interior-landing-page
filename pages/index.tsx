import type { NextPage } from 'next';
import Image from 'next/image';
import livingRoom from '../public/images/living-room.jpg';
import githubWhite from '../public/icons/github-white.svg';

const Home: NextPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[2] w-11/12 h-24 grid grid-cols-[200px_1fr_200px] px-10 font-poppins text-white bg-zinc-800">
        <div className="flex items-center justify-center">
          <p className="font-semibold text-xl">Find your style</p>
        </div>
        <div className="flex items-center justify-center">
          <form className="flex flex-row gap-5">
            {['Living room', 'Dining room', 'Kitchen', 'Bedroom', 'Bathroom'].map((item: string, index: number) => (
              <div key={item}>
                <input type="radio" name="room" id={`room-${index}`} className="peer hidden" />
                <label
                  htmlFor={`room-${index}`}
                  className="py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-0 peer-checked:bg-pos-100 hover:bg-pos-100"
                >
                  {item}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="https://github.com/Ptaku09"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <Image src={githubWhite} width={24} height={24} alt="github icon" />
            <p className="font-semibold">Ptaku</p>
          </a>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-[1] h-full w-1/3 bg-gradient-to-tr from-zinc-700 via-zinc-700 to-zinc-600">
        <p className="absolute top-1/2 -translate-y-1/2 -left-32 text-[30rem] cursor-default font-oswald font-semibold text-zinc-600 selection:bg-inherit">
          01
        </p>
        <div className="h-full w-auto absolute top-1/2 -translate-y-1/2 -right-14 flex justify-center flex-col gap-3">
          <p className="text-yellow-600 font-oswald font-semibold">LIVING ROOM</p>
          <h1 className="text-9xl text-right font-playfair text-gray-200 whitespace-nowrap">Design</h1>
          <p className="w-80 pt-3 text-gray-300 font-poppins font-thin">
            Light walls and yellow furniture match very well. Green plant adds some contrast and nature to room. Accessories such as sculpture or
            clock breaks the monotony.
          </p>
        </div>
      </div>
      <Image className="-scale-x-100" src={livingRoom} layout="fill" objectFit="cover" alt="dining room" priority />
    </div>
  );
};

export default Home;
