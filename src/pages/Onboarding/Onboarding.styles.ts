import { StyleSheet } from 'react-native'
import {
  boldFont,
} from '../../variables'

export default StyleSheet.create({
  card: {
    height: 510,
    width: 275,
    marginHorizontal: 50,
    marginTop: 100
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative'
  },
  paginationStyle: {
    height: 155,
    left: 24,
    right: 24,
    bottom: -70
  },
  buttonStyle: {
    alignSelf: 'center',
    position: 'absolute',
    width: 245,
    bottom: 40,
    zIndex: 10,
  },
  image: {
    flex: 1,
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
    bottom: 190,
  },
  description: {
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
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  activeDotStyle: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
  }
})