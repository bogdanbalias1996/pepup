import React, { isValidElement } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { openVideoModal, getPepupNotification } from '../../Pepups/actions';

import {
  colorTextViolet,
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus
} from '../../../variables';

import { capitalize } from '../../../helpers';

import { MyRequestItemProps } from './types';
import styles from './MyRequestItem.styles';

class MyRequestItem extends React.PureComponent<MyRequestItemProps> {
  getStatusUser = (item: any) => {
    const { status, id, mediaBasePath } = item;
    const { openVideoModal, getPepupNotification } = this.props;
    const normalizedStatus = status.toLowerCase();
    const name = get(item, 'celebInfo.userInfo.name', '');
    const videoLinkPath = get(item, 'dataInfo.link', '');
    const videoLink = videoLinkPath ? `${mediaBasePath}${videoLinkPath}` : '';

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
          msg: (
            <Text>
              <Text style={styles.text}>Hurray! Your pepup is ready.</Text>{' '}
              <Text
                style={[
                  styles.text,
                  { color: colorCompletedStatus },
                  styles.completed
                ]}>
                Click to watch.
              </Text>
            </Text>
          ),
          statusColor: colorCompletedStatus,
          onPress: () => {
            openVideoModal(videoLink);
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
    const { msg, statusColor, onPress, status } = this.getStatusUser(item);

    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={[styles.text, { color: statusColor }]}>
                {capitalize(status.toLowerCase())}
              </Text>{' '}
              - <Text style={styles.name}>{item.celebInfo.userInfo.name}</Text>
            </Text>
            <Text style={styles.date}>{item.requestedOnDt}</Text>
          </View>
          <View>
            {
              isValidElement(msg) 
                ? msg
                : <Text style={styles.text}>{msg}</Text>
            }            
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
  { openVideoModal, getPepupNotification }
)(MyRequestItem);
