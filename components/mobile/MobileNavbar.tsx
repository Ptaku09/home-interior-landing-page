import React from 'react';
import githubWhite from '../../public/icons/github-white.svg';
import Image from 'next/image';
import MobileHamburgerMenu from './MobileHamburgerMenu';

const MobileNavbar = () => {
  return (
    <div className="fixed z-10 top-0 w-screen h-16 grid grid-cols-[1fr_3fr_1fr] bg-zinc-700">
      <div className="relative z-[1] flex items-center justify-center">
        <MobileHamburgerMenu />
      </div>
      <div className="flex items-center justify-center">
        <p className="font-poppins text-white text-xl">Find your style</p>
      </div>
      <div className="flex items-center justify-center">
        <a href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
          <Image src={githubWhite} width={30} height={30} alt="github icon" />
        </a>
      </div>
    </div>
  );
};

export default MobileNavbar;
