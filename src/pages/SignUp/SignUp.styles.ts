import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGray,
  colorLightGray,
  colorTextViolet,
  colorTomato,
  defaultFont
} from "../../variables";

export default StyleSheet.create({
  container: {
    paddingTop: 45,
    justifyContent: "space-between",
    flexGrow: 1
  },
  logo: {
    height: 110,
    alignSelf: "center"
  },
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    flexShrink: 1
  },
  title: {
    fontFamily: defaultFont,
    color: colorBlack,
    textAlign: "center",
    fontSize: 24
  },
  form: {
    marginTop: 20,
    flexGrow: 0
  },
  btnSubmit: {
    marginTop: 24
  },
  createAccountContainer: {
    marginTop: 24
  },
  createAccountText: {
    color: colorTextGray,
    fontFamily: defaultFont,
    fontSize: 14,
    textAlign: "center"
  },
  createAccountLink: {
    fontFamily: defaultFont,
    color: colorTextViolet
  },
  loginWithText: {
    color: colorBlack,
    fontFamily: defaultFont,
    fontSize: 14,
    textAlign: "center",
    marginTop: 35
  },
  wrapSocialBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 15,
    //marginBottom: 20
  },
  formErrorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formError: {
    color: colorTomato,
    textAlign: "center",
    padding: 5,
    fontSize: 14
  }
});
