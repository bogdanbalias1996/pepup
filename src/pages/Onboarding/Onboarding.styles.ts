import { StyleSheet, Dimensions } from 'react-native'
import {
  colorDotGray,
  colorDots,
  semiboldFont,
  colorVioletEnd
} from '../../variables'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    position: 'relative'
  },
  textContainer:{
    position: 'absolute',
    bottom: 110,
    zIndex: 10,
  },
  imageContainer: {
    height: '100%',
    width: '100%'
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  title: {
    fontSize: 38,
    fontFamily: semiboldFont,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 5
  },
  description: {
    fontFamily: semiboldFont,
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    //marginBottom: 20
  },
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colorDots,
  },
  activeDotStyle: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: colorDotGray,
  }
})