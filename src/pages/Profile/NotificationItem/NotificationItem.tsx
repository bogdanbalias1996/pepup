import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { NotificationItemsProps } from '../types';
import { colorBlueberry, boldFont, colorAllRead } from '../../../variables';
import { Notification } from '../../../components/Notification/Notification';

export class NotificationItem extends React.PureComponent<
  NotificationItemsProps
> {
  state = {
    isRead: false
  };

  onPress = () => this.setState(state => ({ isRead: !state.isRead }));

  render() {
    const { item } = this.props;
    return (
      <Notification
        title={item.title}
        message={item.message}
        date={item.date}
        onPress={this.onPress}
        isRead={this.state.isRead}
      />
    );
  }
}

export default NotificationItem;

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingRight: 24,
    flex: 1
  },
  allReadWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  allRead: {
    fontFamily: boldFont,
    fontSize: 14,
    color: colorAllRead
  }
});
