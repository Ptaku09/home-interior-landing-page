import { createContext, ReactNode, useState } from 'react';

export enum SectionOnScreen {
  livingRoom = 'Living room',
  diningRoom = 'Dining room',
  kitchen = 'Kitchen',
  bedroom = 'Bedroom',
  bathroom = 'Bathroom',
}

export type SectionOnScreenContextProps = {
  sectionOnScreen: SectionOnScreen;
  setSectionOnScreen: (sectionOnScreen: SectionOnScreen) => void;
};

export const SectionOnScreenContext = createContext<SectionOnScreenContextProps>({} as SectionOnScreenContextProps);

const SectionOnScreenProvider = ({ children }: { children: ReactNode }) => {
  const [sectionOnScreen, setSectionOnScreen] = useState<SectionOnScreen>(SectionOnScreen.livingRoom);

  return <SectionOnScreenContext.Provider value={{ sectionOnScreen, setSectionOnScreen }}>{children}</SectionOnScreenContext.Provider>;
};

export default SectionOnScreenProvider;
