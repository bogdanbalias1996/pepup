import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import styles from './Logo.styles';

class Logo extends PureComponent {
  render() {
    return (
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../assets/logo2x.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default Logo;