import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IGlobalState } from '../../coreTypes';
import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Icon } from '../../components/Icon/Icon';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { navigate } from '../../navigationService';

import styles from './Profile.styles';
import { getProfile, getUserPepups } from './actions';
import { ProfileScreenProps } from './types';
import { MyRequests } from './MyRequests';
import { FanRequests } from './FanRequests';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';
import { ModalPostReview } from '../../components/ModalReviewForm/ModalPostReview';
import { Notifications } from './Notifications';

import EditProfileButton from './EditProfileButton';
import UserBlock from './UserBlock';

export const ROLE_CELEB = 'REGULAR,CELEBRITY';

const celebTabs: { [key: string]: number } = {
  funRequests: 0,
  myRequests: 1,
  notifications: 2
};

const userTabs: { [key: string]: number } = {
  myRequests: 0,
  notifications: 1
};

export class Component extends React.Component<ProfileScreenProps> {
  static getDerivedStateFromProps(
    nextProps: ProfileScreenProps,
    prevState: any
  ) {
    const {
      profileData,
      navigation,
      getProfile,
      getUserPepups,
      handle,
      userId
    } = nextProps;
    const { params } = nextProps.navigation.state;
    const isCelebrity = profileData && profileData.role === ROLE_CELEB;

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

  static navigationOptions = () => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        title={'Profile'.toUpperCase()}
        getRightComponent={() => {
          return (
            <TouchableOpacity
              onPress={() => navigate({ routeName: 'Settings' })}>
              <Icon name="nut-icon" />
            </TouchableOpacity>
          );
        }}
      />
    )
  });

  tabsConfig = [
    {
      title: 'My Requests',
      component: MyRequests
    },
    {
      title: 'Notifications',
      component: Notifications
    }
  ];

  tabsConfigCeleb = [
    {
      title: 'Fan Requests',
      component: FanRequests
    },
    {
      title: 'My Requests',
      component: MyRequests
    },
    {
      title: 'Notifications',
      component: Notifications
    }
  ];

  componentDidMount() {
    const { handle, getProfile } = this.props;

    handle && getProfile(handle);
  }

  render() {
    const { profileData } = this.props;

    return (
      profileData && (
        <PepupBackground>
          <UserBlock />
          <EditProfileButton />

          <View style={styles.wrapContent}>
            <Loader isDataLoaded={!!profileData}>
              {!!profileData && (
                <Tabs
                  config={
                    profileData.role === ROLE_CELEB
                      ? this.tabsConfigCeleb
                      : this.tabsConfig
                  }
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
              )}
            </Loader>
          </View>
          <ModalRecordVideo />
          <ModalPepup />
          <ModalPostReview />
          <ModalPepupNotification />
        </PepupBackground>
      )
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  handle: state.LoginState.handle,
  profileData: state.ProfileState.profileData
});

const mapDispatchToProps = {
  getProfile,
  getUserPepups
};

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
