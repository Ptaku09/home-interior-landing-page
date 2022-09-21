import React, { useContext } from 'react';
import { SectionOnScreen, SectionOnScreenContext } from '../../providers/SectionOnScreenProvider';
import Image from 'next/image';
import githubWhite from '../../public/icons/github-white.svg';
import _ from 'lodash';

const TabletNavbar = () => {
  const { sectionOnScreen } = useContext(SectionOnScreenContext);

  return (
    <nav
      data-cy="tablet-navbar"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-10 w-11/12 h-24 flex items-center justify-center px-10 font-poppins text-white bg-zinc-800"
    >
      <div className="flex items-center justify-center flex-row gap-5">
        <ul className="flex items-center flex-row gap-5">
          {Object.values(SectionOnScreen).map((item: string) => (
            <li key={item}>
              <a href={`#${_.kebabCase(item)}`}>
                {sectionOnScreen === item ? (
                  <p className="py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-100">
                    {item}
                  </p>
                ) : (
                  <p className="py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-0 hover:bg-pos-100">
                    {item}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-5 flex items-center justify-center">
        <a
          href="https://github.com/Ptaku09"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 py-5 px-6 rounded-full transition-all duration-500 bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-800 cursor-pointer bg-size-200 bg-pos-0 hover:bg-pos-100"
        >
          <Image src={githubWhite} width={24} height={24} alt="github icon" />
          <p className="hidden xl:block font-semibold">Ptaku09</p>
        </a>
      </div>
    </nav>
  );
};

export default TabletNavbar;
