import { StyleSheet } from 'react-native';
import {
  colorTomato,
  colorBlack,
  defaultFont,
  semiboldFont,
  colorInput
} from '../../variables';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colorInput,
    paddingHorizontal: 16,    
    borderRadius: 8,
    marginVertical: 8,
    height: 56,  
    borderWidth: 1, 
    borderColor: 'rgba(198, 198, 202, 0.25)'
  },
  error: {
    borderWidth: 1,
    borderColor: colorTomato
  },
  input: {
    flexGrow: 1,
    paddingLeft: 0,
    color: colorBlack,
    fontFamily: semiboldFont,
    fontSize: 15    
  },
  inputBorder: {
    flexGrow: 1,
    fontFamily: semiboldFont,
    fontSize: 15,
    color: colorBlack,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5    
  },
  errorText: {
    backgroundColor: colorTomato,
    paddingHorizontal: 10,
    paddingVertical: 3,
    zIndex: -10,
    fontSize: 15,
    color: 'white',
    fontFamily: defaultFont
  },
  inputGradient: {
    borderRadius: 8,
    padding: 1
  }
});
