import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../../components/Icon/Icon';
import { ButtonStyledProps } from '.';
import styles from './ButtonStyled.styles';
import {
  colorBlack,
  colorBlueStart,
  colorBlueEnd,
  colorOrangeStart,
  colorOrangeEnd,
  colorCoolGrey,
  colorDotGray,
  colorLightYellow,
  colorLightOrange
} from '../../variables';
import { Loader } from '../Loader/Loader';
import FastImage from 'react-native-fast-image';

const getTypeButton = (type: string) => {
  switch (type) {
    case 'blue':
      return [styles.shadowBlue, styles.btnShadow];
    case 'orange':
      return [styles.shadowOrange, styles.btnShadow];
    case 'grey':
      return [styles.shadowGrey, styles.btnShadow];
    default:
      return [styles.shadowYellow, styles.btnShadow];
  }
};

const getColorButton = (type: string) => {
  switch (type) {
    case 'blue':
      return [colorBlueStart, colorBlueEnd];
    case 'orange':
      return [colorOrangeStart, colorOrangeEnd];
    case 'border':
      return [colorLightYellow, colorLightOrange];
    case 'white':
      return 'white';
    case 'grey':
      return [colorCoolGrey, colorDotGray];
    default:
      return [colorLightYellow, colorLightOrange];
  }
};

export const ButtonStyled: React.SFC<ButtonStyledProps> = ({
  onPress = () => {},
  iconName = '',
  iconSource,
  text = '',
  style = '',
  type = '',
  loader = false,
  loaderColor = 'white'
}): JSX.Element => {
  return (
    <View style={[getTypeButton(type)].concat(style)}>
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={getColorButton(type)}
        style={[
          styles.btnGradient,
          getTypeButton(type),
          type === 'border' && { padding: 1 }
        ]}>
        <TouchableOpacity
          activeOpacity={type === 'border' ? 1 : 0.5}
          style={[
            styles.btn,
            type === 'border' && { backgroundColor: 'white', height: 46 }
          ]}
          onPress={() => !loader && onPress()}>
          <Loader color={loaderColor} size="small" isDataLoaded={!loader}>
            <Icon
              name={iconName}
              color="white"
              size={24}
              style={{ marginRight: 15 }}
            />
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    type === 'border'
                      ? colorBlack
                      : type === 'white'
                      ? colorBlack
                      : 'white'
                }
              ]}>
              {text}
            </Text>
            {iconSource && <FastImage style={styles.image} source={iconSource} />}
          </Loader>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
