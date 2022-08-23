import { ReactNode } from 'react';
import Navbar from './Navbar';
import TextSide from './TextSide';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <TextSide />
      {children}
    </>
  );
};

export default DefaultLayout;
