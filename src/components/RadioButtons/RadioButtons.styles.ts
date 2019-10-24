import { StyleSheet } from "react-native";
import { colorBlack, defaultFont } from "../../variables";

export default StyleSheet.create({
  wrapRadioButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    flex: 1
  },
  wrapRadioButtonsC: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    marginBottom: 16
  },
  btn: {
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    width: "100%"
  },
  btnGradientDark: {
    borderRadius: 15,
    height: 30,
    width: "48%",
    padding: 1,
    marginBottom: 10
  },
  btnGradient: {
    borderRadius: 15,
    height: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7
  },
  btnText: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  qText: {
    fontSize: 16,
    color: colorBlack,
    marginBottom: 5,
    fontFamily: defaultFont
  }
});
