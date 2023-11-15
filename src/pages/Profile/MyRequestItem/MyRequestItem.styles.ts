import { StyleSheet } from 'react-native';

import {
  colorTextGrey,
  colorBlack,
  colorBottomInput,
  defaultFont,  
  semiboldFont
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
  reqText: {
    fontSize: 13   
  },
  text: {
    fontSize: 14,    
    fontFamily: semiboldFont,    
    color: colorTextGrey
  },
  completed: {
    fontFamily: semiboldFont
  },
  reqDescription: {
    fontSize: 13,
    fontFamily: defaultFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGrey
  },
  name: {
    fontSize: 14,
    fontFamily: semiboldFont,
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
