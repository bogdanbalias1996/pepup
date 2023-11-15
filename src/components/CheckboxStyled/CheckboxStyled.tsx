import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CheckboxStyledProps } from '.';
import styles from './CheckboxStyled.styles';
import { colorVioletStart, colorVioletEnd, colorBlack, colorBorderGradEnd, colorBorderGradStart } from '../../variables';
import { Icon } from '../Icon/Icon';

export class CheckboxStyled extends React.PureComponent<CheckboxStyledProps> {
  render() {
    const { checked, onPress } = this.props;
    return (
      <LinearGradient
        colors={[colorBorderGradEnd, colorBorderGradStart]}
        style={[styles.btnGradient]}
      >
        <TouchableOpacity
          style={[styles.checkbox]}
          onPress={() => onPress()}
          activeOpacity={1}
        >
          {checked ? <Icon name="check" color={colorBlack} /> : null}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
