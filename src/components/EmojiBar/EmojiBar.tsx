import * as React from 'react';
import { Text, View } from 'react-native';
import Emoji from 'react-native-emoji';
import styles from './EmojiBar.styles';
import { EmojiBarProps, EmojiItem } from './types';

export class EmojiBar extends React.PureComponent<EmojiBarProps> {
  render() {
    const { data = [] } = this.props;

    return (
      <View style={styles.emojiBarWrapper}>
        {
          data.map(({ name, description }: EmojiItem, index: number) => (
            <View style={styles.emojiContainer} key={`${name}${index}`}>
              <View style={styles.emojiBubble}>
                <Emoji name={name} />
              </View>
              {!!description &&  <Text style={styles.emojiTitle}>{description}</Text>}
            </View>
          ))
        }        
      </View>
    )
  }
}

export default EmojiBar;

