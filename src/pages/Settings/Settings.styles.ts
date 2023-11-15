import { StyleSheet } from 'react-native';
import {
  semiboldFont,
  colorBlack,
} from '../../variables';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    flex: 1,
    marginTop: 15,
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
  }
});
