import * as React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "../Icon/Icon";
import { TextInputStyledProps } from ".";
import styles from "./TextInputStyled.styles";
import { colorTextGrey } from "../../variables";

export class TextInputStyled extends React.PureComponent<TextInputStyledProps> {
  render() {
    const {
      iconName,
      name,
      label,
      keyboardType,
      type,
      formProps,
      secure,
      handleIconClick = () => {},
      iconSize,
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
      <View
        style={[styles.container, error && elIsTouched ? styles.error : null]}
      >
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={label}
          placeholderTextColor={colorTextGrey}
          value={value}
          onChangeText={handleChange(name)}
          onBlur={() => {
            value && setFieldTouched(name);
          }}
          autoCorrect={true}
          {...TextInputProps}
          secureTextEntry={secure}
        />
        {iconName && (
          <TouchableOpacity
          activeOpacity={1}
            onPress={() => handleIconClick && handleIconClick()}
          >
            <Icon size={iconSize ? iconSize : 27} name={iconName} color="#d4d0dd" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
