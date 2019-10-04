import { StyleSheet } from "react-native";

import { colorLightGray, colorTomato, semiboldFont } from "../../variables";

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    flex: 1
  },
  form: {
    marginTop: 20,
    flexGrow: 0
  },
  formErrorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formError: {
    color: colorTomato,
    textAlign: "center",
    paddingLeft: 40,
    fontSize: 14
  },
  btnSubmit: {
    width: 120,
    fontFamily: semiboldFont,
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 20
  }
});