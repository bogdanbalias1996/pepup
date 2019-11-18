import { StyleSheet } from 'react-native';
import {
  colorBlack,
  defaultFont,
  boldFont,
  colorEventLabel
} from '../../../variables';

export default StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 23,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'rgba(139, 87, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(198, 198, 202, 0.25)',
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
    color: colorEventLabel
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',    
    marginTop: 30,
    marginBottom: 17,
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
    height: '100%',    
    borderRadius: 8,
    marginBottom: 16
  }
});
