import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardProps } from './';
import { colorPastelPurple } from '../../variables';

export const Card = ({ children, style, radius = 20 }: CardProps) => {
  return (
    <View style={[styles.wrapper, style, { borderRadius: radius }]}>
      <View style={[styles.purpleBack, { borderRadius: radius }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
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
