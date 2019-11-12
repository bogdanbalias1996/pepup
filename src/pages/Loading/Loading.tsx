import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import styles from './Loading.styles';
import { LoadingScreenProps } from '.';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';

export class Component extends React.PureComponent<LoadingScreenProps> {
  render() {
    return (
      <PepupBackground style={{ paddingTop: 0, ...styles.container }}>
        <ActivityIndicator size="large" color="white" />
      </PepupBackground>
    );
  }
}

export const LoadingScreen = Component;
