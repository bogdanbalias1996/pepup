import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus,
  colorTextViolet
} from '../../../variables';

import { capitalize } from '../../../helpers';
import { getPepupNotification } from '../actions';
import { MyRequestItemProps } from './types';
import styles from './MyRequestItem.styles';
import { connect } from 'react-redux';
import { openVideoModal } from '../../Pepups/actions';

class MyRequestItem extends React.PureComponent<MyRequestItemProps> {
  getStatusUser = (
    status: string,
    name: string,
    link: string = '',
    id: string = ''
  ) => {
    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      case 'pending':
        return {
          status,
          msg: `${name} has been notified.`,
          statusColor: colorGreen,
          onPress: undefined
        };
      case 'accepted':
        return {
          status,
          msg: `${name} is working on your request.`,
          statusColor: colorOrangeStatus,
          onPress: undefined
        };
      case 'unavailable':
      case 'rejected':
        return {
          status: 'unavailable',
          msg: `Sorry. ${name} is unable to complete your request.`,
          statusColor: colorTextRed,
          onPress: undefined
        };
      case 'completed':
        return {
          status,
          msg: `Hurray! Your pepup is ready.`,
          statusColor: colorCompletedStatus,
          onPress: () => {
            const { openVideoModal, getPepupNotification } = this.props;
            
            openVideoModal(link);
            getPepupNotification(id);
          }
        };
      default:
        console.log(`Unsupported request status: '${normalizedStatus}'`);
        return {
          status,
          msg: ``,
          statusColor: colorTextViolet,
          onPress: undefined
        };
    }
  };

  render() {
    const { item } = this.props;
    const { msg, statusColor, onPress, status } = this.getStatusUser(
      item.status,
      item.celebInfo.userInfo.name,
      item.dataInfo && item.mediaBasePath + item.dataInfo.link,
      item.id
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
              {item.request.trim()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  {
    getPepupNotification,
    openVideoModal
  }
)(MyRequestItem as any);
