import { StyleSheet } from 'react-native';
import { boldFont } from '../../variables';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 60
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    flexShrink: 1,
    alignItems: 'center'
  },
  buttonStyle: {
    alignSelf: 'center',
    position: 'absolute',
    width: 245,
    bottom: -20,
    zIndex: 10
  },
  image: {
    height: '100%',
    aspectRatio: 0.536203522504892,
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 25
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
    paddingTop: 18,
    paddingBottom: 40,
    textAlign: 'center',
    zIndex: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  paginationStyle: {
    left: 0,
    right: 0,
    bottom: 20
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
});
