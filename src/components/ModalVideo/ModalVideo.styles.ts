import { StyleSheet } from 'react-native';
import { colorCancelButton } from '../../variables';

export default StyleSheet.create({
  wrapVideo: {
    position: 'absolute',
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30
  },
  closeBtn: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 55,
    zIndex: 999
  }
});
