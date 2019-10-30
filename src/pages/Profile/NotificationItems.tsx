import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { NotificationItemsProps } from './';
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
  semiboldFont,
  colorBlueberry
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { Loader } from '../../components/Loader/Loader';
import { getUserPepups } from './actions';
import { capitalize } from '../../helpers';

const mapStateToProps = (state: IGlobalState) => ({
  userPepups: state.ProfileState.userPepups,
  userId: state.LoginState.userId,
  isFetching: state.ProfileState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserPepups: (id: string) => dispatch(getUserPepups(id) as any)
});

export class Component extends React.PureComponent<NotificationItemsProps> {
  componentDidMount() {
    const { getUserPepups, userId } = this.props;

    getUserPepups(userId);
  }

  getStatusUser = (status: string, name: string) => {
    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      case 'pending':
        return {
          msg: `${name} has been notified.`,
          statusColor: colorGreen,
          onPress: () => alert('Pend')
        };
      case 'accepted':
        return {
          msg: `${name} is working on your request.`,
          statusColor: colorOrangeStatus,
          onPress: () => alert('Acc')
        };
      case 'unavailable':
      case 'rejected':
        return {
          msg: `Sorry. ${name} is unable to complete your request.`,
          statusColor: colorTextRed,
          onPress: () => alert('Unav')
        };
      case 'completed':
        return {
          msg: `Hurray! Your pepup is ready.`,
          statusColor: colorCompletedStatus,
          onPress: () => alert('Compl')
        };
      default:
        console.log(`Unsupported request status: '${normalizedStatus}'`)
        return {
          msg: ``,
          statusColor: colorCompletedStatus,
          onPress: () => {}
        };
    }
  };

  renderItemUser = ({ item }: any) => {
    const { msg, statusColor, onPress } = this.getStatusUser(
      item.status,
      item.celebInfo.userInfo.name
    );

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress()}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={{ color: statusColor }}>
                {capitalize(item.status.toLowerCase())}
              </Text>{' '}
              - <Text style={styles.name}>{item.celebInfo.userInfo.name}</Text>
            </Text>
            <Text style={styles.date}>{item.requestedOnDt}</Text>
          </View>
          <View>
            {item.status.toLowerCase() === 'completed' ? (
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
            <Text style={[styles.text, styles.reqDescription]}>
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
      <Loader isDataLoaded={!isFetching} size="large" color={colorBlueberry}>
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={userPepups}
          renderItem={this.renderItemUser}
          keyExtractor={(item: any) => item.id}
        />
      </Loader>
    );
  }
}

export const NotificationItems = connect(
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
    fontFamily: semiboldFont
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: italicFont
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray
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
