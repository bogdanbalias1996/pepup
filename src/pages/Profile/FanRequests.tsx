import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { FanRequestsProps, Pepup } from './types';
import {
  colorTextGray,
  colorBlack,
  colorInputBackground,
  defaultFont,
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus,
  italicFont,
  colorBlueberry,
  boldFont
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { Loader } from '../../components/Loader/Loader';
import { capitalize } from '../../helpers';
import {
  openNotifyModal,
  getPepupNotification,
  getCelebPepups
} from './actions';
import { videoRecordModalOpen } from '../RecordVideo/actions';
import { VideoType } from '../../components/ModalRecordVideo';

const mapStateToProps = (state: IGlobalState) => ({
  celebPepups: state.ProfileState.celebPepups,
  userId: state.LoginState.userId,
  isFetching: state.ProfileState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCelebPepups: (id: string) => dispatch(getCelebPepups(id) as any),
  openNotifyModal: () => dispatch(openNotifyModal()),
  getPepupNotification: (id: string) =>
    dispatch(getPepupNotification(id) as any),
  videoRecordModalOpen: (entityId: string, videoType: VideoType) =>
    dispatch(videoRecordModalOpen(entityId, videoType))
});

export class Component extends React.PureComponent<FanRequestsProps> {
  componentDidMount() {
    const { getCelebPepups, userId } = this.props;

    userId && getCelebPepups(userId);
  }

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

  renderItemRequest = ({ item }: any) => {
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
  };

  render() {
    const { isFetching, celebPepups } = this.props;

    return (
      celebPepups && (
        <Loader isDataLoaded={!isFetching} size="large" color={colorBlueberry}>
          <FlatList
            style={{ flex: 1, paddingLeft: 16 }}
            showsVerticalScrollIndicator={false}
            data={celebPepups}
            renderItem={this.renderItemRequest}
            keyExtractor={(item: Pepup) => item.id}
          />
        </Loader>
      )
    );
  }
}

export const FanRequests = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: colorInputBackground
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  completed: {
    fontFamily: boldFont
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: italicFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    flexShrink: 1
  },
  name: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
