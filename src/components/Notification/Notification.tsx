import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import { NotificationProps } from '.';
import {
  colorBlack,
  colorVioletStart,
  colorVioletEnd,
  semiboldFont,
  italicFont,
  colorVioletGrey,
  colorMessageBorder
} from '../../variables';

export const Notification: React.SFC<NotificationProps> = ({
  onPress = () => { },
  isRead = false,
  title = '',
  message = '',
  date = ''
}): JSX.Element => {

  const NotificationItem = () => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.message}
      onPress={() => onPress()}>
      <View style={styles.headerWrap}>
        <Text style={styles.messageTitle}>{title}</Text>
        <Text style={styles.messageDate}>{date}</Text>
      </View>
      <Text style={styles.messageText}>{message}</Text>
    </TouchableOpacity>
  )

  return isRead ? (
    <View style={styles.messageWrap}>
      <NotificationItem />
    </View>
  ) : (
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={[colorVioletStart, colorVioletEnd]}
        style={styles.gradient}
      >
        <NotificationItem />
      </LinearGradient>
    );
};

const styles = StyleSheet.create({
  messageWrap: {
    borderColor: colorMessageBorder,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 5
  },
  message: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white'
  },
  gradient: {
    borderRadius: 8,
    padding: 1,
    marginVertical: 5
  },
  messageText: {
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    color: colorVioletGrey
  },
  messageTitle: {
    color: colorBlack,
    fontSize: 14,
    fontFamily: semiboldFont
  },
  headerWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  messageDate: {
    fontFamily: italicFont,
    color: colorVioletGrey,
    fontSize: 12,
    textAlign: 'center'
  }
});
