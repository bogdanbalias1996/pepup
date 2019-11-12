import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { createSelector } from 'reselect';
import memoize from 'memoize-one';

import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import { MyRequests } from './MyRequests';
import { FanRequests } from './FanRequests';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';
import { ModalPostReview } from '../../components/ModalReviewForm/ModalPostReview';
import { Notifications } from './Notifications';
import EditProfileButton from './EditProfileButton';
import UserBlock from './UserBlock';
import ProfileHeader from './ProfileHeader';

import { isUserCelebritySelector } from '../../selectors';

import { getProfile, getUserPepups } from './actions';

import { IGlobalState } from '../../coreTypes';
import { ProfileScreenProps, ProfileScreenState } from './types';

import styles from './Profile.styles';

export class Component extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  static navigationOptions = () => ({
    header: (navigationProps: any) => <ProfileHeader {...navigationProps} />
  });

  static getDerivedStateFromProps(
    nextProps: ProfileScreenProps,
    prevState: ProfileScreenState
  ) {
    const {
      profileData,
      navigation,
      getProfile,
      getUserPepups,
      handle,
      userId,
      isCelebrity
    } = nextProps;
    const { params } = nextProps.navigation.state;

    handle && !profileData && getProfile(handle);
    userId && !profileData && getUserPepups(userId);

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

    handle && getProfile(handle);
  }

  getTabsConfig = memoize((isCelebrity: boolean) => {
    const tabsConfig = [
      {
        title: 'My Requests',
        component: MyRequests
      },
      {
        title: 'Notifications',
        component: Notifications
      }
    ];

    const tabsConfigCeleb = [
      {
        title: 'Fan Requests',
        component: FanRequests
      },
      ...tabsConfig
    ];

    return isCelebrity ? tabsConfigCeleb : tabsConfig;
  });

  render() {
    const { profileData, isCelebrity } = this.props;

    if (!profileData) {
      return null;
    }

    const tabsConfig = this.getTabsConfig(isCelebrity);

    return (
      <PepupBackground>
        <UserBlock />
        <EditProfileButton />

        <View style={styles.wrapContent}>
          <Loader isDataLoaded={!!profileData}>
            <Tabs
              config={tabsConfig}
              changeIndex={(index: number) =>
                this.setState({ activeTabIndex: index })
              }
              style={{ flex: 1 }}
              stylesItem={defaultTabsStyles.roundedTabs}
              activeTabIndex={this.state.activeTabIndex}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 10
              }}
            />
          </Loader>
        </View>
        <ModalRecordVideo />
        <ModalPepup />
        <ModalPostReview />
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
  (state: IGlobalState) => ({
    userId: state.LoginState.userId,
    handle: state.LoginState.handle,
    profileData: state.ProfileState.profileData
  }),
  (isCelebrity: boolean, otherProps) => ({
    isCelebrity,
    ...otherProps
  })
);

const mapDispatchToProps = {
  getProfile,
  getUserPepups
};

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
