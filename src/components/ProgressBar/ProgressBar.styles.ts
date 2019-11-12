import { StyleSheet } from 'react-native';
import { colorLightYellow } from '../../variables';

export default StyleSheet.create({
  wrapper: {
    height: 7,
    backgroundColor: '#d8d8d8',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 3.5,
    marginTop: 30,
    marginBottom: 10
  },
  progress: {
    borderRadius: 3.5,
    backgroundColor: colorLightYellow,
    height: '100%',
    width: '50%'
  }
});
