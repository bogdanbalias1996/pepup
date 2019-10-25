import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import styles from './RadioButtons.styles';
import {RadioButtonsProps} from './';
import {
  colorVioletStart,
  colorVioletEnd,
  colorLightGray,
  colorBlack,
} from '../../variables';

export class RadioButtons extends React.PureComponent<RadioButtonsProps> {
  render() {
    const {options, value, onPress} = this.props;
    return (
      <View style={styles.wrapRadioButtons}>
        {options.map(item => {
          return (
            <LinearGradient
              key={item.key}
              start={[0, 0.5]}
              end={[1, 0.5]}
              colors={[colorVioletStart, colorVioletEnd]}
              style={[
                styles.btnGradient,
                {padding: value.key === item.key ? 0 : 1},
              ]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      value.key === item.key ? 'transparent' : colorLightGray,
                      height: value.key === item.key ? 30 : 28,
                  },
                ]}
                onPress={() => onPress(item)}>
                <Text
                  style={[
                    styles.btnText,
                    {
                      color: value.key === item.key ? 'white' : colorBlack,
                    },
                  ]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
    );
  }
}
