import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { NotificationItemsProps, NotificationItemState } from './types';

import { DefaultWrapper, GradientWrapper } from './wrappers';

import styles from './NotificationItem.styles';

export class NotificationItem extends PureComponent<
  NotificationItemsProps,
  NotificationItemState
  > {
  state = {
    isRead: false
  };

  onPress = () =>
    this.setState((state: NotificationItemState) => ({
      isRead: !state.isRead
    }));

  render() {
    const { item } = this.props;
    const { isRead } = this.state;

    const { title = '', date = '', message = '' } = item;

    const Wrapper = isRead ? DefaultWrapper : GradientWrapper;

    return (
      <Wrapper>
        <TouchableOpacity
          onPress={this.onPress}
          activeOpacity={1}
          style={styles.message}>          
            <View style={styles.headerWrap}>
              <Text style={styles.messageTitle}>{title}</Text>
              <Text style={styles.messageDate}>{date}</Text>
            </View>
            <Text style={styles.messageText}>{message}</Text>          
        </TouchableOpacity>
      </Wrapper>
    );
  }
}

export default NotificationItem;
