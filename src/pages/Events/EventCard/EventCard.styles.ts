import { StyleSheet } from 'react-native';
import {
  colorTextGray,
  colorBlack,
  defaultFont,
  boldFont
} from '../../../variables';

export default StyleSheet.create({
  card: {
    padding: 16,
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
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 24,
    alignItems: 'center'
  },
  imageLogo: {
    width: 72,
    height: '100%',
    marginRight: 16
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24
  },
  avatar: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    marginBottom: 16
  }
});
