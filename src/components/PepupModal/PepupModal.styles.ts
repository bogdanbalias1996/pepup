import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end'    
  },
  overlay: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'    
  }
});
