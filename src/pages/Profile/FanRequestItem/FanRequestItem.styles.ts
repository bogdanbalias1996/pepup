import { StyleSheet } from 'react-native';

import {
  colorTextGrey,
  colorBlack,  
  colorBottomInput,
  defaultFont,
  boldFont
} from '../../../variables';

export default StyleSheet.create({
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colorBottomInput
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGrey
  },
  completed: {
    fontFamily: boldFont
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: defaultFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGrey,
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
