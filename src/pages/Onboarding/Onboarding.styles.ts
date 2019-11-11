import { StyleSheet } from 'react-native'
import {
  boldFont,
} from '../../variables'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    height: '72%',
    width: '72%',
    marginHorizontal: 50,
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
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  title: {
    fontSize: 38,
    fontFamily: boldFont,
    color: 'white',
    paddingBottom: 30,
    textAlign: 'center',
    letterSpacing: 2,
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  description: {
    flexGrow: 1,
    fontFamily: boldFont,
    color: 'white',
    fontSize: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
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