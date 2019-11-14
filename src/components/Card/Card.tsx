import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardProps } from './types';
import { colorPastelPurple, colorBlack } from '../../variables';

export const Card = ({ children, style, radius = 20, borderWidth = 4 }: CardProps) => {
  return (
    <View style={[styles.wrapper, style, { borderRadius: radius, padding: borderWidth }]}>
      <View style={[styles.purpleBack, { borderRadius: radius }]}>
        {children}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    shadowColor: colorBlack,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  purpleBack: {
    width: '100%',
    height: '100%',
    backgroundColor: colorPastelPurple
  }
});
