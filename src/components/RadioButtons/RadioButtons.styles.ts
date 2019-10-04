import { StyleSheet } from "react-native";
import { defaultFont } from "../../variables";

export default StyleSheet.create({
  wrapRadioButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16
  },
  btn: {
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  btnGradient: {
    borderRadius: 15,
    height: 30,
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: defaultFont
  }
});
