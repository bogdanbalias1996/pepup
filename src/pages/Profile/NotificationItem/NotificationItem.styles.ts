import { StyleSheet } from 'react-native';

import {
  colorBlack,
  semiboldFont,
  italicFont,  
  colorMessageBorder
} from '../../../variables';

export default StyleSheet.create({
  messageWrap: {
    borderColor: colorMessageBorder,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 5
  },
  message: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white'
  },
  gradient: {
    borderRadius: 8,
    padding: 1,
    marginVertical: 5
  },
  messageText: {
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22
  },
  messageTitle: {
    color: colorBlack,
    fontSize: 14,
    fontFamily: semiboldFont
  },
  headerWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  messageDate: {
    fontFamily: italicFont,    
    fontSize: 12,
    textAlign: 'center'
  }
});
