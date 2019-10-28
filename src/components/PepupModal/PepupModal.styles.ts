import { StyleSheet } from 'react-native';
import {
  colorLightGray,
  boldFont,
  colorBlack,
  defaultFont,
  colorVioletGrey,
  colorTextGray,
} from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    marginTop: 30,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 50,
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontFamily: boldFont,
    fontSize: 24,
    lineHeight: 1.25,
    color: colorBlack,
  },
  modalText: {
    fontFamily: defaultFont,
    fontSize: 14,
    lineHeight: 1.57,
    color: colorVioletGrey,
  },
  introText: {
    fontFamily: defaultFont,
    fontSize: 12,
    color: colorTextGray,
  },
  modalSubtitle: {
    fontFamily: defaultFont,
    fontSize: 18,
    lineHeight: 1.33,
    color: colorBlack,
  },
});
