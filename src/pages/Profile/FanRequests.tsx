import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {FanRequestsProps, Pepup} from './';
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
  colorBlueberry,
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { Loader } from '../../components/Loader/Loader';
import { getCelebPepups } from './actions';

const mapStateToProps = (state: IGlobalState) => ({
  celebPepups: state.ProfileState.celebPepups,
  userId: state.LoginState.userId,
  isFetching: state.ProfileState.isFetching,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCelebPepups: (id: string) => dispatch(getCelebPepups(id) as any),
});

export class Component extends React.PureComponent<FanRequestsProps> {
  componentDidMount() {
    const { getCelebPepups, userId } = this.props;

    getCelebPepups(userId);
  }

  getStatusCeleb = (type: string, name: string) => {
    switch (type) {
      case 'Pending':
        return {
          msg: `${name} has been notified.`,
          statusColor: colorGreen,
          onPress: () => alert('Pend'),
        };
      case 'Accepted':
        return {
          msg: `${name} is working on your request.`,
          statusColor: colorOrangeStatus,
          onPress: () => alert('Acc'),
        };
      case 'Unavailable':
        return {
          msg: `Sorry. ${name} is unable to complete your request.`,
          statusColor: colorTextRed,
          onPress: () => alert('Unav'),
        };
      case 'Completed':
        return {
          msg: `Hurray! Your pepup is ready.`,
          statusColor: colorCompletedStatus,
          onPress: () => alert('Compl'),
        };
    }
  };

  renderItemCeleb = ({ item }: any) => {
    const { msg, statusColor, onPress } = this.getStatusCeleb(
      item.type,
      item.name,
    );

    return (
      <TouchableOpacity onPress={() => onPress()}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.notificationStatus}>
              <Text style={{ color: statusColor }}>{item.type}</Text> -{' '}
              <Text style={styles.name}>{item.name}</Text>
            </Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View>
            {item.type === 'Completed' ? (
              <Text>
                <Text style={styles.text}>{msg}</Text>{' '}
                <Text
                  style={[
                    styles.text,
                    { color: statusColor },
                    styles.completed,
                  ]}>
                  Click to watch.
                </Text>
              </Text>
            ) : (
              <Text style={styles.text}>{msg}</Text>
            )}
            <Text style={[styles.text, styles.reqDescription]}>
              {item.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { isFetching, celebPepups } = this.props;
    return (
      <Loader isDataLoaded={!isFetching} size="large" color={colorBlueberry}>
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={celebPepups}
          renderItem={this.renderItemCeleb}
          keyExtractor={(item: Pepup) => item.id}
        />
      </Loader>
    );
  }
}

export const FanRequests = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: colorInputBackground,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGray,
  },
  completed: {
    fontFamily: semiboldFont,
  },
  reqDescription: {
    fontSize: 12,
    fontFamily: italicFont,
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    flexShrink: 1,
  },
  name: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack,
  },
  notificationStatus: {
    flexDirection: 'row',
    fontFamily: defaultFont,
  },
});
