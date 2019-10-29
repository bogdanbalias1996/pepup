import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceInfoCheck } from '../../helpers';

export const PepupBackground = (props: any): JSX.Element => {
  const { children = null, style = {} } = props;

  return (
    <LinearGradient
      colors={['#7436b2', '#542fb5']}
      start={[0, 0.5]}
      end={[1, 0.5]}
      style={[
        { flexShrink: 0, flexGrow: 1, paddingTop: deviceInfoCheck() ? 80 : 65 },
        style
      ]}>
      {children}
    </LinearGradient>
  );
};
