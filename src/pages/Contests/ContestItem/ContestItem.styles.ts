import { StyleSheet } from 'react-native';

import {
  colorBlack,
  defaultFont,
  boldFont,
  colorEventLabel
} from '../../../variables';

export default StyleSheet.create({
  card: {
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: colorBlack,
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
    color: colorEventLabel
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    alignItems: 'center'
  },
  imageLogo: {
    width: '100%',
    height: '100%',
    marginRight: 16,
    borderRadius: 8
  },
  gradient: {
    borderRadius: 8
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 15
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24
  }
});
