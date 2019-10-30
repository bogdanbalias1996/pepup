import * as React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from '../Icon/Icon';
import { TextInputStyledProps } from '.';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './TextInputStyled.styles';
import {
  colorTextGray,
  colorVioletStart,
  colorVioletEnd
} from '../../variables';

export class TextInputBorderStyled extends React.PureComponent<
  TextInputStyledProps
> {
  render() {
    const {
      name,
      label,
      keyboardType,
      type,
      formProps,
      secure,
      multiline,
      numberOfLines,
      inputStyle,
      ...TextInputProps
    } = this.props;

    const {
      handleChange,
      setFieldTouched,
      values,
      errors,
      touched
    } = formProps;

    const value = values[name];
    const error = errors[name];
    const elIsTouched = touched[name];

    return (
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={
          error && elIsTouched
            ? ['red', 'red']
            : [colorVioletStart, colorVioletEnd]
        }
        style={styles.inputGradient}>
        <TextInput
          style={[styles.inputBorder].concat(inputStyle)}
          autoCapitalize="none"
          placeholder={label}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={colorTextGray}
          value={value}
          onChangeText={handleChange(name)}
          onBlur={() => {
            value && setFieldTouched(name);
          }}
          autoCorrect={false}
          {...TextInputProps}
          secureTextEntry={secure}
        />
      </LinearGradient>
    );
  }
}
