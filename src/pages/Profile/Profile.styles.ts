import { StyleSheet } from 'react-native';
import { colorEndButtonInput, colorLightGray, boldFont } from '../../variables';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  avatarsWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 24
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 5
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  avatarCeleb: {
    backgroundColor: 'white'
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontFamily: boldFont,
    color: 'white',
    textAlign: 'center',
    lineHeight: 28,
    marginHorizontal: 10
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
