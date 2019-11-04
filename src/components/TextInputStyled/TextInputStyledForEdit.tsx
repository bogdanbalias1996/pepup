import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TextInputStyledProps } from '.';
import styles from './TextInputStyledForEdit.styles';
import { Icon } from '../Icon/Icon';

export const TextInputStyledForEdit: React.SFC<TextInputStyledProps> = (
  props
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
    iconSize,
    iconNameClick,
    handleIconClick = () => {},
    ...TextInputProps
  } = props;

  const { handleChange, setFieldTouched, values, errors, touched } = formProps;

  const value = values[name];
  const error = errors[name];
  const elIsTouched = touched[name];
  return (
    <View
      style={[
        styles.container,
        error && elIsTouched ? styles.error : null,
        borderTop && { borderTopWidth: 1 }
      ]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={[styles.inputWrap, {paddingRight: iconNameClick ? 15 : 0}]}>
        {iconName && <Icon size={24} name={iconName} color={iconColor} />}
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
          autoCorrect={true}
          {...TextInputProps}
          secureTextEntry={secure}
        />
        {iconNameClick && (
          <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleIconClick && handleIconClick()}>
            <Icon
              size={iconSize ? iconSize : 27}
              name={iconNameClick}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
