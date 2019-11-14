import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {
  colorBlueberry,
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus
} from '../../../variables';

import { capitalize } from '../../../helpers';

import { MyRequestItemProps } from './types';
import styles from './MyRequestItem.styles';

class MyRequestItem extends React.PureComponent<MyRequestItemProps> {
  getStatusUser = (status: string, name: string) => {
    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      case 'pending':
        return {
          status,
          msg: `${name} has been notified.`,
          statusColor: colorGreen,
          onPress: () => {}
        };
      case 'accepted':
        return {
          status,
          msg: `${name} is working on your request.`,
          statusColor: colorOrangeStatus,
          onPress: () => {}
        };
      case 'unavailable':
      case 'rejected':
        return {
          status: 'unavailable',
          msg: `Sorry. ${name} is unable to complete your request.`,
          statusColor: colorTextRed,
          onPress: () => {}
        };
      case 'completed':
        return {
          status,
          msg: `Hurray! Your pepup is ready.`,
          statusColor: colorCompletedStatus,
          onPress: () => alert('Compl')
        };
      default:
        console.log(`Unsupported request status: '${normalizedStatus}'`);
        return {
          status,
          msg: ``,
          statusColor: colorBlueberry,
          onPress: () => {}
        };
    }
  };

  render() {
    const { item } = this.props;
    const { msg, statusColor, onPress, status } = this.getStatusUser(
      item.status,
      item.celebInfo.userInfo.name
    );

    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={{ color: statusColor }}>
                {capitalize(status.toLowerCase())}
              </Text>{' '}
              - <Text style={styles.name}>{item.celebInfo.userInfo.name}</Text>
            </Text>
            <Text style={styles.date}>{item.requestedOnDt}</Text>
          </View>
          <View>
            {status.toLowerCase() === 'completed' ? (
              <Text>
                <Text style={styles.text}>{msg}</Text>{' '}
                <Text
                  style={[
                    styles.text,
                    { color: statusColor },
                    styles.completed
                  ]}>
                  Click to watch.
                </Text>
              </Text>
            ) : (
              <Text style={styles.text}>{msg}</Text>
            )}
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[styles.text, styles.reqDescription]}>
              {item.request}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MyRequestItem;
