import * as React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from '../Icon/Icon';
import { TextInputStyledProps } from '.';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './TextInputStyled.styles';
import {
  colorTextGrey,
  colorBorderGradEnd,
  colorBorderGradStart
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
            : [colorBorderGradStart, colorBorderGradEnd]
        }
        style={styles.inputGradient}
      >
        <View style={{ 
          borderRadius: styles.inputGradient.borderRadius,
          minHeight: 41,
          backgroundColor: 'white'
        }}>
          <TextInput
            style={[styles.inputBorder].concat(inputStyle)}
            autoCapitalize="none"
            placeholder={label}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor={'rgba(42, 41, 46, 0.28)'}
            value={value}
            onChangeText={handleChange(name)}
            onBlur={() => {
              value && setFieldTouched(name);
            }}
            autoCorrect={true}
            {...TextInputProps}
            secureTextEntry={secure}
          />
        </View>
      </LinearGradient>
    );
  }
}
