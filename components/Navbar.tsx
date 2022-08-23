import Image from 'next/image';
import githubWhite from '../public/icons/github-white.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[2] w-11/12 h-24 grid grid-cols-[200px_1fr_200px] px-10 font-poppins text-white bg-zinc-800">
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xl">Find your style</p>
      </div>
      <div className="flex items-center justify-center">
        <form className="flex flex-row gap-5">
          {['Living room', 'Dining room', 'Kitchen', 'Bedroom', 'Bathroom'].map((item: string, index: number) => (
            <div key={item}>
              <Link href={`#${item.replace(' ', '-').toLowerCase()}`}>
                <a>
                  <input type="radio" name="room" id={`room-${index}`} className="peer hidden" />
                  <label
                    htmlFor={`room-${index}`}
                    className="py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-0 peer-checked:bg-pos-100 hover:bg-pos-100"
                  >
                    {item}
                  </label>
                </a>
              </Link>
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
    </nav>
  );
};

export default Navbar;
