import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { createSelector } from 'reselect';
import memoize from 'memoize-one';

import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';
import { ModalPostReview } from '../../components/ModalReviewForm/ModalPostReview';
import { ModalVideo } from '../../components/ModalVideo/ModalVideo';
import EditProfileButton from './EditProfileButton';
import UserBlock from './UserBlock';
import ProfileHeader from './ProfileHeader';

import { isUserCelebritySelector } from '../../selectors';

import { getProfile, getUserPepups, getCelebPepups } from './actions';

import { IGlobalState } from '../../coreTypes';
import {
  ProfileScreenProps,
  ProfileScreenState,
  ProfileTabType,
  ProfileTabConfig
} from './types';

import styles from './Profile.styles';

import CategoryViewer from '../../components/CategoryViewer';
import {
  ViewerCategory,
  ViewerRoute
} from '../../components/CategoryViewer/types';

import FanRequestsItem from './FanRequestItem';
import MyRequestsItem from './MyRequestItem';
import NotificationItem from './NotificationItem';

export class Component extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  static navigationOptions = () => ({
    header: (navigationProps: any) => <ProfileHeader {...navigationProps} />
  });

  static getTabsConfig = memoize((isCelebrity: boolean): ProfileTabConfig[] => {
    const tabsConfig: ProfileTabConfig[] = [
      {
        title: 'My Requests',
        key: 'myRequests',
        component: MyRequestsItem
      },
      {
        title: 'Notifications',
        key: 'notifications',
        component: NotificationItem
      }
    ];

    const tabsConfigCeleb: ProfileTabConfig[] = [
      {
        title: 'Fan Requests',
        key: 'funRequests',
        component: FanRequestsItem
      },
      ...tabsConfig
    ];

    return isCelebrity ? tabsConfigCeleb : tabsConfig;
  });

  static getDerivedStateFromProps(
    nextProps: ProfileScreenProps,
    prevState: ProfileScreenState
  ) {
    const { profileData, navigation, isCelebrity } = nextProps;
    const { params } = navigation.state;

    if (params && profileData) {
      if (
        isCelebrity &&
        params.activeTab &&
        celebTabs[params.activeTab] !== prevState.activeTabIndex
      ) {
        const activeTabIndex = celebTabs[params.activeTab];
        navigation.setParams({ activeTab: null });
        return { activeTabIndex };
      } else if (
        !isCelebrity &&
        params.activeTab &&
        userTabs[params.activeTab] !== prevState.activeTabIndex
      ) {
        const activeTabIndex = userTabs[params.activeTab];
        navigation.setParams({ activeTab: null });
        return { activeTabIndex };
      }
    }

    return null;
  }

  state = {
    activeTabIndex: 0
  };

  componentDidMount() {
    const { handle, getProfile } = this.props;

    if (handle) getProfile(handle);
  }

  handleChangeTab = (index: number) => {
    const { isCelebrity, getUserPepups, getCelebPepups, userId } = this.props;

    const tabs = Component.getTabsConfig(isCelebrity);

    const tabName = tabs[index].key;

    const callbacksMap: { [key in ProfileTabType]: () => void } = {
      myRequests: () => {
        userId && getUserPepups(userId);
      },
      funRequests: () => {
        userId && getCelebPepups(userId);
      },
      notifications: () => {
        console.log('fetching notifications');
      }
    };

    if (callbacksMap[tabName]) {
      callbacksMap[tabName]();
    }

    this.setState({ activeTabIndex: index });
  };

  renderHeader = (route: ViewerRoute) => {
    if (route.title === 'Notifications') {
      return (
        <TouchableOpacity style={styles.allReadWrap} activeOpacity={1}>
          <Text style={styles.allReadText}>Mark All as Read</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  render() {
    const { profileData, isCelebrity, data } = this.props;
    const { activeTabIndex } = this.state;

    if (!profileData) {
      return null;
    }

    const tabsConfig = Component.getTabsConfig(isCelebrity) as ViewerCategory[];

    return (
      <PepupBackground>
        <UserBlock />
        <EditProfileButton />

        <View style={styles.wrapContent}>
          <Loader isDataLoaded={!!profileData}>
            <CategoryViewer
              categories={tabsConfig}
              data={data}
              activeTabIndex={activeTabIndex}
              onTabChange={this.handleChangeTab}
              flatListStyle={styles.flatListStyle}
              header={this.renderHeader}
            />
          </Loader>
        </View>
        <ModalRecordVideo />
        <ModalPepup />
        <ModalPostReview />
        <ModalVideo isPepup/>
        <ModalPepupNotification />
      </PepupBackground>
    );
  }
}

const celebTabs: { [key: string]: number } = {
  funRequests: 0,
  myRequests: 1,
  notifications: 2
};

const userTabs: { [key: string]: number } = {
  myRequests: 0,
  notifications: 1
};

const mapStateToProps = createSelector(
  isUserCelebritySelector,
  (
    state: IGlobalState
  ): {
    [key in ProfileTabType]: Array<any>;
  } => ({
    myRequests: state.ProfileState.userPepups,
    funRequests: state.ProfileState.celebPepups,
    notifications: require('./mocks').notifications
  }),
  (state: IGlobalState) => ({
    userId: state.LoginState.userId,
    handle: state.LoginState.handle,
    profileData: state.ProfileState.profileData
  }),
  (isCelebrity: boolean, data, otherProps) => {
    return {
      isCelebrity,
      data,
      ...otherProps
    };
  }
);

const mapDispatchToProps = {
  getProfile,
  getUserPepups,
  getCelebPepups
};

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
