import { StyleSheet } from 'react-native';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    flex: 1,
    marginTop: deviceInfoCheck() ? 10 : 0
  },
  imageWrap: {
    flexDirection: 'row'
  }
});
