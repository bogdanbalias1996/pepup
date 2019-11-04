import { StyleSheet } from 'react-native';
import { colorEndButtonInput, colorLightGray } from '../../variables';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingHorizontal: 14,
    flexGrow: 1,
    marginTop: deviceInfoCheck() ? 10 : 0
  },
  wrapHeaderRight: {
    flexDirection: 'row',
  },
  wrapHeaderRightIcon: {
    backgroundColor: colorEndButtonInput,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  rateIcon: {
    width: 20,
    height: 20,
  },
});
