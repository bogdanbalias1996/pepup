import { StyleSheet } from 'react-native'
import { colorTomato, colorBorderDarker, colorBlack, colorTextGray, semiboldFont, defaultFont } from '../../variables'

export default StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 40,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: colorBorderDarker
  },
  containerWithLabel: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  error: {
    borderBottomWidth: 1,
    borderColor: colorTomato,
  },
  input: {
    flexGrow: 1,
    paddingLeft: 0,
  },
  inputStyle: {
    borderWidth: 0,
    marginTop: 0,
    fontFamily: semiboldFont,
    color: colorBlack,
    fontSize: 16,
    height: 37,
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    width: '100%',
  },
  labelStyle: {
    marginTop: 0,
    fontFamily: defaultFont,
    color: colorTextGray,
    fontSize: 14,
    alignItems: 'center',
    paddingLeft: 0,
  },
  errorText: {
    backgroundColor: colorTomato,
    paddingHorizontal: 10,
    paddingVertical: 3,
    zIndex: -10,
    fontSize: 15,
    color: 'white',
    fontFamily: defaultFont,
  }
})
