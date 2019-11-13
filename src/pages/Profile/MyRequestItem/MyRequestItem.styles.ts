import { StyleSheet } from 'react-native';

import {
  colorTextGray,
  colorBlack,
  colorInputBackground,
  defaultFont,
  italicFont,
  semiboldFont
} from '../../../variables';

export default StyleSheet.create({
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colorInputBackground
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  completed: {
    fontFamily: semiboldFont
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: italicFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  name: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
