import { StyleSheet } from 'react-native';

import {
  colorBlack,
  defaultFont,
  boldFont,
  colorTextGreyIntro
} from '../../../variables';

export default StyleSheet.create({
  card: {
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGreyIntro
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    alignItems: 'center'
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 8
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24
  }
});
