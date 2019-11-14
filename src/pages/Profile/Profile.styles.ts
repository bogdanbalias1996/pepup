import { StyleSheet } from 'react-native';
import {
  colorEndButtonInput,
  colorLightGray,
  boldFont,
  colorAllRead
} from '../../variables';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    flex: 1,
    marginTop: deviceInfoCheck() ? 10 : 0
  },
  wrapHeaderRight: {
    flexDirection: 'row'
  },
  wrapHeaderRightIcon: {
    backgroundColor: colorEndButtonInput,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 40,
    height: 40
  },
  rateIcon: {
    width: 20,
    height: 20
  },
  imageWrap: {
    flexDirection: 'row'
  },
  allReadWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    marginBottom: 10
  },
  allReadText: {
    fontFamily: boldFont,
    fontSize: 14,
    color: colorAllRead
  },
  flatListStyle: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    marginBottom: 10
  }
});
