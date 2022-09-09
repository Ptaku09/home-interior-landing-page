import React, { useContext } from 'react';
import _ from 'lodash';
import { SectionOnScreenContext } from '../../providers/SectionOnScreenProvider';

const MobileMenuTile = ({ sectionName }: { sectionName: string }) => {
  const { sectionOnScreen } = useContext(SectionOnScreenContext);

  return (
    <a
      key={sectionName}
      href={`#${_.kebabCase(sectionName)}`}
      className={`text w-2/3 py-4 -translate-x-[30rem] bg-stone-500 shadow-xl text-center text-white font-playfair ${
        sectionName === sectionOnScreen && 'bg-gradient-to-tr from-stone-600 to-stone-800'
      }`}
    >
      {sectionName}
    </a>
  );
};

export default MobileMenuTile;
