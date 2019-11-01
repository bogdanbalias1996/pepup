import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import {TextInputStyledProps} from '.';
import styles from './TextInputStyledForEdit.styles';
import { Icon } from '../Icon/Icon';

export const TextInputStyledForEdit: React.SFC<TextInputStyledProps> = (
  props,
): JSX.Element => {
  const {
    name,
    label,
    formProps,
    secure,
    keyboardType,
    borderTop,
    multiline,
    numberOfLines,
    inputStyle,
    iconName,
    iconColor,
    ...TextInputProps
  } = props;

  const {handleChange, setFieldTouched, values, errors, touched} = formProps;

  const value = values[name];
  const error = errors[name];
  const elIsTouched = touched[name];
  return (
    <View
      style={[
        styles.container,
        error && elIsTouched ? styles.error : null,
        borderTop && {borderTopWidth: 1},
      ]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.inputWrap}>
      {iconName ? <Icon size={24} name={iconName} color={iconColor} /> : null}
      <TextInput
        style={[styles.inputStyle].concat(inputStyle)}
        autoCapitalize="none"
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={handleChange(name)}
        onBlur={() => {
          value && setFieldTouched(name);
        }}
        autoCorrect={false}
        {...TextInputProps}
        secureTextEntry={secure}
      />
      </View>
    </View>
  );
};
