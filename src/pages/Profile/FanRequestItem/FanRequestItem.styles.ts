import { StyleSheet } from 'react-native';

import {
  colorTextGray,
  colorBlack,
  colorInputBackground,
  defaultFont,
  italicFont,
  boldFont
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
    fontFamily: boldFont
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: italicFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    flexShrink: 1
  },
  name: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
