import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceInfoCheck } from '../../helpers';
import { colorLightYellow, colorLightOrange } from '../../variables';

export const PepupBackground = (props: any): JSX.Element => {
  const { children = null, style = {} } = props;

  return (
    <LinearGradient
      colors={[colorLightYellow, colorLightOrange]}
      style={[
        { flexShrink: 0, flexGrow: 1, paddingTop: deviceInfoCheck() ? 80 : 65 },
        style
      ]}>
      {children}
    </LinearGradient>
  );
};
