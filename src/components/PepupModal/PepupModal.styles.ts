import { StyleSheet } from 'react-native';
import { colorLightGray } from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    marginTop: 30
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 50
  },
  overlay: {
    // flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  }
});
