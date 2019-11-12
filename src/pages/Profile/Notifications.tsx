import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { NotificationItemsProps } from '.';
import {
  colorLightOrange,
  boldFont,
  colorAllRead,
  colorTextViolet
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { Loader } from '../../components/Loader/Loader';
import { getUserPepups } from './actions';
import { Notification } from '../../components/Notification/Notification';

// const mapStateToProps = (state: IGlobalState) => ({
//   userPepups: state.ProfileState.userPepups,
//   userId: state.LoginState.userId,
//   isFetching: state.ProfileState.isFetching
// });
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   getUserPepups: (id: string) => dispatch(getUserPepups(id) as any)
// });

const mock = [
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  },
  {
    title: 'Pepup Sent!',
    date: 'Oct 23, 2019',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
  }
];

export class Component extends React.PureComponent<NotificationItemsProps> {
  state = {
    isRead: false
  }

  renderNotification = ({ item }: any) => {
    return (
      <Notification
        title={item.title}
        message={item.message}
        date={item.date}
        onPress={() => this.setState({isRead: !this.state.isRead})}
        isRead={this.state.isRead}
      />
    );
  };

  render() {
    // const { isFetching } = this.props;

    return (
      // <Loader isDataLoaded={!isFetching} size="large" color={colorLightOrange}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.allReadWrap}
            activeOpacity={1}
            onPress={() => !this.state.isRead && this.setState({isRead: true})}>
            <Text style={styles.allRead}>Mark All as Read</Text>
          </TouchableOpacity>
          <FlatList
            style={{ flex: 1, paddingLeft: 16 }}
            showsVerticalScrollIndicator={false}
            data={mock}
            renderItem={this.renderNotification}
            keyExtractor={(item: any, index: number) => `${index}`}
          />
        </View>
      // </Loader>
    );
  }
}

// export const Notifications = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Component);

export const Notifications = Component;

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
    color: colorTextViolet
  }
});
