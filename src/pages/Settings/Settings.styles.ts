import { StyleSheet } from 'react-native';
import {
  colorLightGray,
  colorSwipeLine,
  colorTextGray,
  defaultFont,
  semiboldFont,
} from '../../variables';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    flex: 1,
    marginTop: deviceInfoCheck() ? 10 : 0,
  },
  listItemGroup: {
    marginBottom: 32,
  },
  listItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colorSwipeLine,
  },
  listItemText: {
    color: colorTextGray,
    fontSize: 14,
    fontFamily: defaultFont,
  },
  signOutText: {
    fontSize: 14,
    color: colorTextGray,
    fontFamily: semiboldFont,
  },
});
