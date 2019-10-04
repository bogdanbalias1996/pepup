import * as React from "react";
import { View, TouchableOpacity, Text , TextInput} from "react-native";
import { TextInputStyledProps } from ".";
import styles from "./TextInputStyledForEdit.styles";
import { colorTextGray } from "../../variables";

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
      ]}
    >
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          value={value}
          onChangeText={handleChange(name)}
          onBlur={() => {
            value && setFieldTouched(name);
          }}
          autoCorrect={false}
          {...TextInputProps}
          secureTextEntry={secure}
        />
    </View>
  );
};