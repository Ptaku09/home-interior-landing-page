import { isBrowser, isMobileOnly } from 'react-device-detect';
import React, { ReactNode } from 'react';

type DeviceProps = {
  children: (isBrowser: boolean, isMobileOnly: boolean) => ReactNode;
};

const Device = (props: DeviceProps) => {
  return <div>{props.children(isBrowser, isMobileOnly)}</div>;
};

export default Device;
