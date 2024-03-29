import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardProps } from './types';

export const Card = ({ children, style, radius = 20, borderWidth = 4, withoutShadow = false }: CardProps) => {
  return (
    <View style={[
      styles.wrapper, 
      withoutShadow ? {} : styles.shadow, 
      style, 
      { borderRadius: radius, padding: borderWidth }
    ]}>
      <View style={[styles.cardBg, { borderRadius: radius }]}>
        {children}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',    
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(242,203,31, 0.9)'
  }
});
