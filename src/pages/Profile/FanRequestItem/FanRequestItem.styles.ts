import { StyleSheet } from 'react-native';

import {
  colorTextGrey,
  colorBlack,  
  colorBottomInput,
  colorEventLabel,
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
  text: {
    fontSize: 14,
    fontFamily: semiboldFont,
    color: colorEventLabel    
  },  
  reqDescription: {
    fontSize: 13,
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
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
