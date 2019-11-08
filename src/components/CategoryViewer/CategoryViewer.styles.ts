import { StyleSheet, Dimensions } from 'react-native';

import {
  colorVioletGrey,
  colorBlack,
  boldFont,
  semiboldFont
} from '../../variables';

export default StyleSheet.create({
  roundedTabs: {
    flex: 0,
    borderRadius: 24,
    backgroundColor: 'transparent',
    marginRight: 13,
    paddingTop: 5,
    paddingBottom: 5
  },
  tabsBar: {
    backgroundColor: 'transparent'
  },
  itemSelectedText: {
    display: 'none',
    height: 0
  },
  selectedLabel: {
    paddingTop: 4,
    color: colorBlack,
    fontSize: 16,
    fontFamily: boldFont,
    letterSpacing: 2,
    alignSelf: 'center',
    textAlign: 'left',
    overflow: 'visible'
  },
  itemText: {
    color: colorVioletGrey,
    fontSize: 16,
    fontFamily: semiboldFont,
    alignSelf: 'center',
    textAlign: 'left',
    letterSpacing: 2,
    paddingTop: 4
  },
  initialLayout: {
    width: Dimensions.get('window').width
  },
  tabBarTabStyle: {
    width: 'auto'
  }
});