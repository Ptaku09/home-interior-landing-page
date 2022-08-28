import { ReactNode } from 'react';
import TextSide from './TextSide';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TextSide />
      {children}
    </>
  );
};

export default DefaultLayout;
