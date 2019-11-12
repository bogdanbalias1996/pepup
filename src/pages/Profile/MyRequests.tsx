import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { MyRequestsProps } from '.';
import {
  colorTextGrey,
  colorBlack,
  colorInputBackground,
  defaultFont,
  colorGreen,
  colorOrangeStatus,
  colorTextRed,
  colorCompletedStatus,
  italicFont,
  semiboldFont,
  colorLightOrange,
  colorTextViolet,
  colorEventLabel
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { Loader } from '../../components/Loader/Loader';
import { getUserPepups } from './actions';
import { capitalize } from '../../helpers';
import { openVideoModal } from '../Pepups/actions';

const mapStateToProps = (state: IGlobalState) => ({
  userPepups: state.ProfileState.userPepups,
  userId: state.LoginState.userId,
  isFetching: state.ProfileState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserPepups: (id: string) => dispatch(getUserPepups(id) as any),
  openVideoModal: (link: string) => dispatch(openVideoModal(link))
});

export class Component extends React.PureComponent<MyRequestsProps> {
  componentDidMount() {
    const { getUserPepups, userId } = this.props;

    userId && getUserPepups(userId);
  }

  getStatusUser = (status: string, name: string, link: string = '') => {
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
          onPress: () => this.props.openVideoModal(link)
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

  renderItemRequest = ({ item }: any) => {
    const { msg, statusColor, onPress, status } = this.getStatusUser(
      item.status,
      item.celebInfo.userInfo.name,
      item.dataInfo && item.mediaBasePath + item.dataInfo.link
    );

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress()}>
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
  };

  render() {
    const { isFetching, userPepups } = this.props;

    return (
      <Loader isDataLoaded={!isFetching} size="large" color={colorLightOrange}>
        <FlatList
          style={{ flex: 1, paddingLeft: 16 }}
          showsVerticalScrollIndicator={false}
          data={userPepups}
          renderItem={this.renderItemRequest}
          keyExtractor={(item: any) => item.id}
        />
      </Loader>
    );
  }
}

export const MyRequests = connect(
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
    color: colorEventLabel
  },
  completed: {
    fontFamily: semiboldFont
  },
  reqDescription: {
    color: colorTextGrey,
    fontSize: 12,
    fontFamily: defaultFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGrey
  },
  name: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont
  }
});
