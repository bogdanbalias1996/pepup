import { StyleSheet } from 'react-native';
import { boldFont } from '../../../variables';

export default StyleSheet.create({
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
  }
});
