import { StyleSheet } from 'react-native';
import { colorLightGray, boldFont, semiboldFont } from '../../../variables';

export default StyleSheet.create({
  row: {
    flex: 1
  },
  wrapper: {
    flex: 0.5
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 6,
    height: 238
  },
  avatarWrapper: {
    height: '100%',
    width: '100%',
    borderRadius: 24
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: boldFont,
    color: 'white',
    letterSpacing: 0.5,
    marginLeft: 8
  },
  status: {
    fontSize: 12,
    fontFamily: semiboldFont,
    color: 'white',
    marginBottom: 10,
    marginLeft: 8,
    opacity: 0.7
  },
  celebsWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});
