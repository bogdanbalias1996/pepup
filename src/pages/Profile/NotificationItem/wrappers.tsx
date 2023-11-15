import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  colorBorderGradEnd,
  colorBorderGradStart
} from '../../../variables';

import styles from './NotificationItem.styles';
import { View } from 'react-native';
import { Wrapper } from './types';

export const GradientWrapper: Wrapper = ({ children }) => (
  <LinearGradient
    start={[0, 0.5]}
    end={[1, 0.5]}
    colors={[colorBorderGradStart, colorBorderGradEnd]}
    style={styles.gradient}>
    {children}
  </LinearGradient>
);

export const DefaultWrapper: Wrapper = ({ children }) => (
  <View style={styles.messageWrap}>{children}</View>
);
