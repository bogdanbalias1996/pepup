import * as React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "../Icon/Icon";
import { TextInputStyledProps } from ".";
import styles from "./TextInputStyled.styles";
import { colorTextGray } from "../../variables";

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
        {iconName && (
          <TouchableOpacity
            onPress={() => handleIconClick && handleIconClick()}
          >
            <Icon size={27} name={iconName} color="#d4d0dd" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
