import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGrey,
  colorTextViolet,
  defaultFont,
  boldFont,
  colorTomato,
} from "../../variables";

export default StyleSheet.create({
  background: { paddingTop: 0 },
  container: {
    paddingTop: 45,
    justifyContent: "space-between",
    flex: 1
  },
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24
  },
  title: {
    fontFamily: boldFont,
    color: colorBlack,
    textAlign: "center",
    fontSize: 24
  },
  description: {
    fontSize: 14,
    color: colorTextGrey,
    textAlign: "center",
    marginTop: 25,
    fontFamily: defaultFont,
    lineHeight: 20
  },
  form: {
    marginTop: 24
  },
  btnSubmit: {
    marginTop: 24
  },
  createAccountContainer: {
    marginTop: 50
  },
  createAccountText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: defaultFont,
    color: colorTextGrey,
    marginBottom: 30
  },
  resetText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontFamily: defaultFont,
    color: colorTextGrey,
    marginHorizontal: 20,
    marginBottom: 15
  },
  createAccountLink: {
    fontFamily: boldFont,
    color: colorTextViolet
  },
  createAccountEmail: {
    fontFamily: defaultFont,
    color: colorBlack
  },
  formErrorContainer: {
    backgroundColor: colorTomato,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formError: {
    color: "white",
    textAlign: "center",
    padding: 5,
    fontSize: 14
  }
});
