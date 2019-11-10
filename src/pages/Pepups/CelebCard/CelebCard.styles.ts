import {
  StyleSheet
} from 'react-native';

import {
  colorLightGray,
  boldFont,
  semiboldFont
} from '../../../variables';

export default StyleSheet.create({
  row: {
    flex: 1
  },
  wrapper: {
    flex: 0.5
  },
  card: {
    marginVertical: 6,
    marginHorizontal: 6,
    height: 220
  },
  avatarWrapper: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  name: {
    fontSize: 16,
    fontFamily: boldFont,
    color: 'white',
    letterSpacing: 0.5,
    marginLeft: 8
  },
  status: {
    fontSize: 12,
    fontFamily: semiboldFont,
    color: colorLightGray,
    marginBottom: 10,
    marginLeft: 8
  },
  celebsWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});