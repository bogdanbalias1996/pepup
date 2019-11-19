import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTextGrey,
  colorTextViolet,
  colorTomato,
  defaultFont,
  boldFont
} from '../../variables';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexGrow: 1
  },
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    flexShrink: 1
  },
  title: {
    fontFamily: boldFont,
    color: colorBlack,
    textAlign: 'center',
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
    marginTop: 24,
    marginBottom: 30
  },
  createAccountText: {
    color: colorTextGrey,
    fontFamily: defaultFont,
    fontSize: 14,
    textAlign: 'center'
  },
  createAccountLink: {
    fontFamily: boldFont,
    color: colorTextViolet
  },
  loginWithText: {
    color: colorBlack,
    fontFamily: defaultFont,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 35
  },
  wrapSocialBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 15
  },
  formErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formError: {
    color: colorTomato,
    textAlign: 'center',
    padding: 5,
    fontSize: 14
  }
});
