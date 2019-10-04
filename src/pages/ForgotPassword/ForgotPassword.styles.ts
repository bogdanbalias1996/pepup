import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGray,
  colorCoral,
  colorLightGray,
  colorTextViolet,
  defaultFont
} from "../../variables";

export default StyleSheet.create({
  background: { paddingTop: 0 },
  container: {
    paddingTop: 45,
    justifyContent: "space-between",
    flex: 1
  },
  imageWrapper: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    height: 110,
    alignSelf: "center",
    marginBottom: 30
  },
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24
  },
  title: {
    fontFamily: defaultFont,
    color: colorBlack,
    textAlign: "center",
    fontSize: 24
  },
  description: {
    fontSize: 14,
    color: colorTextGray,
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
    color: colorTextGray,
    marginBottom: 30
  },
  resetText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontFamily: defaultFont,
    color: colorTextGray,
    marginHorizontal: 20,
    marginBottom: 15
  },
  createAccountLink: {
    fontFamily: defaultFont,
    color: colorTextViolet
  },
  createAccountEmail: {
    fontFamily: defaultFont,
    color: colorBlack
  },
  formErrorContainer: {
    backgroundColor: colorCoral,
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
