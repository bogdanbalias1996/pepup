import { StyleSheet } from 'react-native';
import {
  colorEndButtonInput,
  colorLightGray,
  semiboldFont
} from '../../variables';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  avatarsWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: 155,
    height: 64,
    marginVertical: 24
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 5
  },
  avatarCeleb: {
    backgroundColor: 'white'
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: semiboldFont,
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 10,
    flexShrink: 1
  },
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingLeft: 16,
    flex: 1,
    marginTop: deviceInfoCheck() ? 10 : 0
  },
  wrapHeaderRight: {
    flexDirection: 'row'
  },
  wrapHeaderRightIcon: {
    backgroundColor: colorEndButtonInput,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 40,
    height: 40
  },
  rateIcon: {
    width: 20,
    height: 20
  },
  imageWrap: {
    flexDirection: 'row'
  }
});
