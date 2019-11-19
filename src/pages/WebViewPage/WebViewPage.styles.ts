import { StyleSheet } from 'react-native';
import {
  semiboldFont,
  colorBlack,
  colorCancelButton,
} from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    flex: 1,
    paddingHorizontal: 24,
    position: 'relative',
    paddingTop: 60
  },
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24
  },
  listItemsWrap: {
    marginTop: 40
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 24
  },
  listItemText: {
    color: colorBlack,
    fontSize: 16,
    fontFamily: semiboldFont,
  },
  gradient: {
    borderRadius: 24,
    padding: 1,
    marginVertical: 10
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 8,
    zIndex: 999
  }
});
