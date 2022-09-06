import React, { useState } from 'react';

const MobileHamburger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-7 h-5 mt-4">
      <input
        id="hamburger-menu"
        type="checkbox"
        className="hidden peer"
        checked={isOpen}
        onChange={() => setIsOpen((prevState: boolean) => !prevState)}
      />
      <label
        htmlFor="hamburger-menu"
        className="absolute h-1 w-7 bg-white duration-200 before:transition-all before:bg-white before:h-1 before:w-7 before:absolute before:-mt-2 after:transition-all after:bg-white after:h-1 after:w-7 after:absolute after:mt-2 peer-checked:bg-transparent peer-checked:before:rotate-45 before:origin-[1px] peer-checked:after:-rotate-45 after:origin-[1px] peer-checked:after:translate-y-0.5"
      />
    </div>
  );
};

export default MobileHamburger;
