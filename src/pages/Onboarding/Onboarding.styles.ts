import { StyleSheet } from 'react-native'
import {
  boldFont,
} from '../../variables'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    width: '100%',
    height: '100%',
    maxWidth: 286,
    maxHeight: 524,
    position: 'relative'
  },
  buttonStyle: {
    alignSelf: 'center',
    position: 'absolute',
    width: 245,
    bottom: '8%',
    zIndex: 10,
  },
  image: {
    flexGrow: 1,    
    maxWidth: 274,
    maxHeight: 511,
    borderRadius: 20
  },
  title: {
    fontSize: 38,
    fontFamily: boldFont,
    color: 'white',
    paddingBottom: 26,
    textAlign: 'center',
    letterSpacing: 2,
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0    
  },
  description: {    
    fontFamily: boldFont,
    color: 'white',
    fontSize: 20,
    marginTop: 18,
    marginHorizontal: 20,
    textAlign: 'center',
    zIndex: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4    
  },
  paginationStyle: {
    height: 100,
    left: 0,
    right: 0,
    bottom: 0
  },
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white'
  },
  activeDotStyle: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white'
  }
})