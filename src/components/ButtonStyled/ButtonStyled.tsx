import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../../components/Icon/Icon';
import { ButtonStyledProps } from '.';
import styles from './ButtonStyled.styles';
import {
  colorBlack,
  colorVioletStart,
  colorVioletEnd,
  colorBlueStart,
  colorBlueEnd,
  colorOrangeStart,
  colorOrangeEnd,
  boldFont,
  defaultFont
} from '../../variables';
import { ImageSafe } from '../ImageSafe/ImageSafe';
import { Loader } from '../Loader/Loader';

const getTypeButton = (type: string) => {
  switch (type) {
    case 'blue':
      return [styles.shadowBlue, styles.btnShadow];
    case 'orange':
      return [styles.shadowOrange, styles.btnShadow];
    case 'grey': 
      return [styles.shadowGrey, styles.btnShadow]  
    default:
      return [styles.shadowViolet, styles.btnShadow];
  }
};

const getColorButton = (type: string) => {
  switch (type) {
    case 'blue':
      return [colorBlueStart, colorBlueEnd];
    case 'orange':
      return [colorOrangeStart, colorOrangeEnd];
    case 'border':
      return [colorVioletStart, colorVioletEnd];
    case 'white':
      return ['white', 'white'];
    default:
      return [colorVioletStart, colorVioletEnd];
  }
};

export const ButtonStyled: React.SFC<ButtonStyledProps> = ({
  onPress = () => {},
  iconName = '',
  iconSource,
  text = '',
  style = '',
  textBold = false,
  type = 'violet',
  loader = false
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
          type === 'border' && { padding: 1 },
        ]}
      >
        <TouchableOpacity
          activeOpacity={type === 'border' ? 1 : 0.5}
          style={[
            styles.btn,
            type === 'border' && { backgroundColor: 'white', height: 46 }
          ]}
          onPress={() => onPress()}
        >
          <Loader color='white' size='small' isDataLoaded={!loader}>
            <Icon
              name={iconName}
              color="white"
              size={24}
              style={{ marginRight: 15 }}
            />
            <Text
              style={[
                styles.btnText,
                { color: type === 'border' ? colorBlack : 'white' },
                { color: type === 'white' ? colorVioletEnd : 'white' },
                {
                  fontFamily: textBold ? boldFont : defaultFont
                }
              ]}
            >
              {text}
            </Text>
            <ImageSafe style={styles.image} iconSource={iconSource} />
          </Loader>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
