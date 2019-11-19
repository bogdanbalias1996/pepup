import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import differenceInDays from 'date-fns/differenceInDays';

import {
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus,
  colorBlack
} from '../../../variables';

import { capitalize } from '../../../helpers';
import { openNotifyModal, getPepupNotification } from '../actions';
import { videoRecordModalOpen } from '../../RecordVideo/actions';

import styles from './FanRequestItem.styles';
import { FanRequestItemProps } from './types';

class FanRequestItem extends React.PureComponent<FanRequestItemProps> {
  getModal = (pepupId: string) => {
    const { openNotifyModal, getPepupNotification } = this.props;

    openNotifyModal();
    getPepupNotification(pepupId);
  };

  getMessage(days: number) {
    if (days > 0) {
      return `${days > 1 ? `${days} days` : `${days} day`} remaining.`;
    } else if (days === 0) {
      return `Last day to fulfill.`;
    } else return 'Expired!';
  }

  getStatusCeleb = ({ status, requestedOnDt: date, id }: any) => {
    const normalizedStatus = status.toLowerCase();

    const today = new Date();
    const requestedOn = new Date(date);
    const dayLimit = 8;
    const roundedDays = dayLimit - differenceInDays(today, requestedOn);

    switch (normalizedStatus) {
      case 'pending':
        return {
          msg: this.getMessage(roundedDays),
          statusColor: colorGreen,
          onPress: () => this.getModal(id),
          linkText: 'View Details.'
        };
      case 'accepted':
        return {
          msg: this.getMessage(roundedDays),
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
          msg: `Hurray! Your pepup is ready.`,
          statusColor: colorCompletedStatus,
          onPress: () => alert('Compl'),
          linkText: 'Click to watch.'
        };
      default:
        console.log(`Unsupported request status: '${normalizedStatus}'`);
        return {
          status,
          msg: ``,
          statusColor: colorBlack,
          onPress: () => {},
          linkText: ''
        };
    }
  };

  render() {
    const { item } = this.props;
    const { msg, statusColor, onPress, linkText } = this.getStatusCeleb(item);

    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={[styles.text, { color: statusColor }]}>
                {capitalize(item.status.toLowerCase())}
              </Text>{' '}
              - <Text style={[styles.text, styles.name]}>{item.requestedByInfo.name}</Text>
            </Text>
            <Text style={styles.date}>{item.requestedOnDt}</Text>
          </View>
          <View>
            <Text>
              <Text style={styles.text}>{msg} </Text>
              <Text
                style={[styles.text, { color: statusColor }]}>
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
