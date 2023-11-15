import { StyleSheet } from 'react-native';
import { deviceInfoCheck } from '../../helpers';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingHorizontal: 14,
    flexGrow: 1,
    marginTop: deviceInfoCheck() ? 10 : 0
  },
  stylesTabsContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    paddingLeft: 5
  },
  flatListStyle: {
    flex: 1,
    flexDirection: 'row'
  }
});
