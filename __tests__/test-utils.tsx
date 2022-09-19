import SectionOnScreenProvider from '../providers/SectionOnScreenProvider';
import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import './../__mocks__/resizeObserverMock';
import './../__mocks__/intersectionObserverMock';

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  return <SectionOnScreenProvider>{children}</SectionOnScreenProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
