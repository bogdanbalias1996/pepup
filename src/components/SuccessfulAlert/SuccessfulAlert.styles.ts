import { StyleSheet } from 'react-native';
import { colorBlack, defaultFont, boldFont } from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: 350,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  title: {
    fontSize: 20,
    fontFamily: boldFont,
    color: colorBlack,
    textAlign: 'center',
    marginBottom: 15
  },
  textWrap: {
    flexGrow: 1,
    flexShrink: 0
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.76)'
  },
  btnSubmit: {
    width: 155,
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack,
    opacity: 0.7,
    textAlign: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  switchLabelText: {
    lineHeight: 32,
    paddingRight: 16
  }
});
