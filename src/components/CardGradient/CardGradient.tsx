import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CardGradientProps } from './types';

export const CardGradient = ({ children, style }: CardGradientProps) => {
  return (
    <LinearGradient
      start={[0.5, 0.3]}
      end={[0.5, 1]}
      colors={['rgba(42, 41, 46, 0)', 'rgba(42, 41, 46, 0.6)']}
      style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
};

export default CardGradient;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    padding: 4,
    justifyContent: 'flex-end',
    borderRadius: 20
  }
});
