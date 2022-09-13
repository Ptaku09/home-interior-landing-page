import { isBrowser, isMobileOnly, isTablet } from 'react-device-detect';
import React, { ReactNode } from 'react';

type DeviceProps = {
  children: ({ isBrowser, isMobileOnly, isTablet }: { isBrowser: boolean; isMobileOnly: boolean; isTablet: boolean }) => ReactNode;
};

const Device = (props: DeviceProps) => {
  return <div>{props.children({ isBrowser, isMobileOnly, isTablet })}</div>;
};

export default Device;
