import { StyleSheet } from 'react-native';
import { colorBlack, defaultFont, boldFont } from '../../variables';

export default StyleSheet.create({
  wrapRadioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    flex: 1
  },
  wrapRadioButtonsC: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  btn: {
    borderRadius: 17,
    paddingLeft: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%'
  },
  btnGradientDark: {
    borderRadius: 17,
    width: '48%',
    padding: 1,
    marginBottom: 10
  },
  btnGradient: {
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  btnTextQuiz: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack,
    paddingTop: 5
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  qText: {
    fontSize: 16,
    color: colorBlack,
    marginBottom: 5,
    fontFamily: defaultFont
  }
});
