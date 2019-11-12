import { StyleSheet } from 'react-native';
import {
  colorEndButtonInput,
  colorLightGray,
  boldFont
} from '../../../variables';
import { deviceInfoCheck } from '../../../helpers';

export default StyleSheet.create({
  avatarsWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 24
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 5
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  avatarCeleb: {
    backgroundColor: 'white'
  },
  gradient: {
    borderRadius: 6
  }
});
