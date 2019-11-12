import { StyleSheet } from 'react-native';
import {
  colorBlueStart,
  colorVioletStart,
  colorOrangeStart,
  colorCoolGrey,
  boldFont,
  colorBlack,
  colorLightYellow
} from '../../variables';

export default StyleSheet.create({
  btn: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingVertical: 16
  },
  btnShadow: {
    shadowColor: colorBlack,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 16,
  },
  shadowYellow: {
    shadowColor: colorLightYellow
  },
  shadowGrey: {
    shadowColor: colorCoolGrey
  },
  shadowBlue: {
    shadowColor: colorBlueStart
  },
  shadowOrange: {
    shadowColor: colorOrangeStart
  },
  btnBorder: {
    borderWidth: 1,
    borderColor: colorBlueStart
  },
  btnGradient: {
    borderRadius: 24,
    height: 48
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: boldFont
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10
  }
});
