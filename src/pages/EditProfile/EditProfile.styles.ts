import { StyleSheet } from "react-native";

import { colorLightGray, colorTomato, semiboldFont, colorItalic } from "../../variables";

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    flex: 1,
    marginTop: 10
  },
  form: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between'
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
    fontFamily: semiboldFont
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
    flexGrow: 1,
    paddingHorizontal: 24
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorLightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  private: {
    marginTop: 55
  },
  privateTitle: {
    color: colorItalic,
    fontFamily: semiboldFont,
    fontSize: 16,
    paddingLeft: 40,
    marginBottom: 25
  },
  scrollview: { flexShrink: 1 }
});