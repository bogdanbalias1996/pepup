import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTextGray,
  colorLightGray,
  colorTextViolet,
  colorTomato,
  defaultFont
} from '../../variables';

export default StyleSheet.create({
  background: { paddingTop: 0 },
  container: {
    paddingTop: 45,
    justifyContent: 'space-between',
    height: '100%'
  },
  imageWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  logo: {
    height: 110,
    alignSelf: 'center'
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
  btnForgetPasswordText: {
    color: colorTextViolet,
    fontFamily: defaultFont,
    fontSize: 14,
    width: '100%',
    textAlign: 'right'
  },
  createAccountContainer: {
    marginTop: 24,
    marginBottom: 80
  },
  createAccountText: {
    color: colorTextGray,
    fontFamily: defaultFont,
    fontSize: 14,
    textAlign: 'center'
  },
  createAccountLink: {
    fontFamily: defaultFont,
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
    marginTop: 15,
    marginBottom: 20
  },
  fbButton: { flex: 1, borderRadius: 60 },
  googleButton: { marginLeft: 10, flex: 1 },
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
