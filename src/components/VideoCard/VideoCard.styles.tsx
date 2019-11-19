import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  videoContainer: {
    flexGrow: 1,
    flexShrink: 0,    
    position: 'relative',        
    width: '100%'    
  },
  video: {
    flex: 1,    
    borderRadius: 10,
    position: 'relative'
  },  
  videoBtnPlayWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30
  }  
});