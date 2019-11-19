import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTextGrey,
  colorTomato,
  defaultFont,
  boldFont,
  colorCancelButton,
  semiboldFont
} from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flexGrow: 1,
    paddingHorizontal: 24
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    marginHorizontal: 10,
    marginVertical: 10
  },
  title: {
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 25,
    textAlign: 'left'
  },
  subTitle: {
    fontSize: 16,
    fontFamily: boldFont,
    color: colorBlack,
    marginBottom: 5
  },
  disclaimerText: {
    color: colorTextGrey,
    lineHeight: 22,
    alignSelf: 'flex-start',
    fontFamily: defaultFont
  },
  modal: {
    marginTop: 20,
    zIndex: 100,
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  modalFooter: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 17,
    top: 23,
    zIndex: 999,
    flexGrow: 1
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: semiboldFont,
    lineHeight: 22,
    color: colorBlack
  },
  reqTitle: {
    alignItems: 'flex-start'
  },
  form: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  formErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formError: {
    color: colorTomato,
    textAlign: 'center',
    paddingLeft: 40,
    fontSize: 14
  },
  inputWrap: {
    marginTop: 30
  },
  wrap: {
    flex: 1
  },
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 34
  },
  checkText: {
    flex: 1,
    marginLeft: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 10
  },
  scrollContent: { paddingBottom: 90 },
  upperWrap: {
    paddingHorizontal: 24,
    flex: 1,
    paddingTop: 70
  }
});
