import { StyleSheet } from "react-native";
import {
  colorBlueStart,
  colorVioletStart,
  colorOrangeStart,
  colorCoolGrey
} from "../../variables";

export default StyleSheet.create({
  btn: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48
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
    textAlign: "center",
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    marginHorizontal: 10
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10
  }
});
