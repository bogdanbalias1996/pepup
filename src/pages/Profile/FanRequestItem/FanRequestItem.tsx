import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { FanRequestsProps, Pepup } from '../types';
import {
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus,
  colorBlueberry
} from '../../../variables';

import { capitalize } from '../../../helpers';
import { openNotifyModal, getPepupNotification } from '../actions';
import { videoRecordModalOpen } from '../../RecordVideo/actions';

import styles from './FanRequestItem.styles';

class FanRequestItem extends React.PureComponent<FanRequestsProps> {
  getModal = (pepupId: string) => {
    const { openNotifyModal, getPepupNotification } = this.props;

    openNotifyModal();
    getPepupNotification(pepupId);
  };

  getStatusCeleb = ({ status, requestedOnDt: date, id }: any) => {
    const normalizedStatus = status.toLowerCase();
    const today = new Date();
    const requestedOn = new Date(date);
    const roundedDays = +(
      7 -
      (today.getTime() - requestedOn.getTime()) / (1000 * 3600 * 24)
    ).toFixed(0);

    const getMessage = (days: number) => {
      if (days > 0) {
        return `${days > 1 ? `${days} days` : `${days} day`} remaining.`;
      } else if (days === 0) {
        return `Last day to fulfill.`;
      } else return 'Expired!';
    };

    switch (normalizedStatus) {
      case 'pending':
        return {
          msg: getMessage(roundedDays),
          statusColor: colorGreen,
          onPress: () => this.getModal(id),
          linkText: 'View Details.'
        };
      case 'accepted':
        return {
          msg: getMessage(roundedDays),
          statusColor: colorOrangeStatus,
          onPress: () =>
            this.props.videoRecordModalOpen(id, 'fulfillPepupRequest'),
          linkText: 'Click to record video.'
        };
      case 'rejected':
        return {
          msg: `You rejected this request.`,
          statusColor: colorTextRed,
          onPress: () => {},
          linkText: ''
        };
      case 'completed':
        return {
          msg: `Hurray! Your pepup was sent.`,
          statusColor: colorCompletedStatus,
          onPress: () => alert('Compl'),
          linkText: 'Click to watch.'
        };
      default:
        console.log(`Unsupported request status: '${normalizedStatus}'`);
        return {
          status,
          msg: ``,
          statusColor: colorBlueberry,
          onPress: () => {},
          linkText: ''
        };
    }
  };

  render() {
    const { item } = this.props;
    const { msg, statusColor, onPress, linkText } = this.getStatusCeleb(item);

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress()}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={{ color: statusColor }}>
                {capitalize(item.status.toLowerCase())}
              </Text>{' '}
              - <Text style={styles.name}>{item.requestedByInfo.name}</Text>
            </Text>
            <Text style={styles.date}>{item.requestedOnDt}</Text>
          </View>
          <View>
            <Text>
              <Text style={styles.text}>{msg} </Text>
              <Text
                style={[styles.text, { color: statusColor }, styles.completed]}>
                {linkText}
              </Text>
            </Text>
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

export default connect(null, {
  openNotifyModal,
  getPepupNotification,
  videoRecordModalOpen
})(FanRequestItem as any);
