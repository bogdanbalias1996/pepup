import { StyleSheet } from 'react-native';
import { colorBlack, colorMessageBorder } from '../../variables';

export default StyleSheet.create({
  emojiBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emojiBubble: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: colorMessageBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emojiTitle: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    color: colorBlack
  }
})