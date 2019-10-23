import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./RadioButtons.styles";
import { RadioButtonsProps } from "./";
import {
  colorLightGradStart,
  colorLightGradEnd,
  colorVioletStart,
  colorVioletEnd
} from "../../variables";

export class RadioButtonsContest extends React.PureComponent<
  RadioButtonsProps
> {
  render() {
    const { options, value, onPress, question } = this.props;
    return (
      <View>
        <Text style={styles.qText}>{question}</Text>
        <View style={styles.wrapRadioButtonsC}>
          {options.map((item:any, i:number) => {
            return (
              <LinearGradient
                key={i}
                start={[0, 0.5]}
                end={[1, 0.5]}
                colors={[colorVioletStart, colorVioletEnd]}
                style={[styles.btnGradientDark]}
              >
                <LinearGradient
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[colorLightGradStart, colorLightGradEnd]}
                  style={[
                    styles.btnGradient
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      {
                        backgroundColor:
                        value && value === item ? "transparent" : "white",
                        height: value && value === item ? 30 : 28
                      }
                    ]}
                    onPress={() => onPress(item)}
                  >
                    <Text style={styles.btnText}>{item}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </LinearGradient>
            );
          })}
        </View>
      </View>
    );
  }
}
