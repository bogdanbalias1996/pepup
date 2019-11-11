import { StyleSheet } from 'react-native';
import {
  colorBlueStart,
  colorVioletStart,
  colorOrangeStart,
  colorCoolGrey,
  boldFont
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
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },
  shadowViolet: {
    shadowColor: colorVioletStart
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
