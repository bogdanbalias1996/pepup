import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Dispatch } from 'redux';

import { IGlobalState } from '../../coreTypes';
import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Icon } from '../../components/Icon/Icon';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { navigate } from '../../navigationService';

import styles from './Profile.styles';
import {
  getProfile,
  fulfillPepupRequest,
  updateCelebIntroVideo,
  getUserPepups
} from './actions';
import { ProfileScreenProps, HeaderProps } from '.';
import { NotificationItems } from './NotificationItems';
import { History } from './History';
import { FanRequests } from './FanRequests';
import { openPepupModal, getCeleb } from '../Pepups/actions';
import { Loader } from '../../components/Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  handle: state.LoginState.handle,
  profileData: state.ProfileState.profileData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: (handle: string) => dispatch(getProfile(handle) as any),
  openPepupModal: () => dispatch(openPepupModal()),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  fulfillPepupRequest: (video: any) =>
    dispatch(fulfillPepupRequest(video) as any),
  updateCelebIntroVideo: (celebId: string, video: any) =>
    dispatch(updateCelebIntroVideo(celebId, video) as any),
  getUserPepups: (id: string) => dispatch(getUserPepups(id) as any)
});

const ROLE_CELEB = 'REGULAR,CELEBRITY';

export class Component extends React.Component<ProfileScreenProps> {
  state = {
    activeTabIndex: null
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
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <NotificationItems />
    },
    {
      title: 'Notifications',
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <NotificationItems />
    }
  ];

  tabsConfigCeleb = [
    {
      title: 'My Requests',
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <NotificationItems />
    },
    {
      title: 'Notifications',
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <NotificationItems />
    },
    {
      title: 'Fan Requests',
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <FanRequests />
    },
    {
      title: 'History',
      onPress: (activeTabIndex: number) => {
        this.setState({ activeTabIndex });
      },
      component: () => <History />
    }
  ];

  componentDidMount = () => {
    const { userId, handle } = this.props;

    handle && this.props.getProfile(handle);
    userId && this.props.getUserPepups(userId);
  };

  handleVideoSave = (video: any) => {
    const {
      fulfillPepupRequest,
      updateCelebIntroVideo,
      profileData
    } = this.props;

    if (!profileData) return;

    const isCelebrity = profileData.role === ROLE_CELEB;

    isCelebrity
      ? updateCelebIntroVideo(profileData.id, video)
      : fulfillPepupRequest(video);
  };

  getActiveTab = () => {
    const { profileData } = this.props;
    const { params } = this.props.navigation.state;
    const isCelebrity = profileData && profileData.role === ROLE_CELEB;

    if (params) {
      if (isCelebrity) {
        switch (params.activeTab) {
          case 'funRequests':
            return 0;
          case 'myRequests':
            return 1;
          case 'notifications':
            return 2;
        }
      } else {
        switch (params.activeTab) {
          case 'myRequests':
            return 0;
          case 'notifications':
            return 1;
        }
      }
    } else {
      return 0;
    }
  };

  render() {
    const { profileData, openPepupModal, getCeleb } = this.props;

    const isCelebrity = profileData && profileData.role === ROLE_CELEB;

    const getModal = () => {
      openPepupModal();
      profileData && getCeleb(profileData.id);
    };

    return (
      <PepupBackground>
        <View style={styles.avatarsWrap}>
          {profileData && (
            <Image
              style={styles.avatar}
              source={
                profileData.icon
                  ? { uri: profileData.icon }
                  : require('../../../assets/avatarPlaceholder.png')
              }
              resizeMode="cover"
            />
          )}
          {isCelebrity && (
            <TouchableOpacity onPress={getModal}>
              <Image
                style={[styles.avatar, styles.avatarCeleb]}
                source={require('../../../assets/celebAvatar.png')}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            {(profileData && profileData.name) || ' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigate({
                routeName: isCelebrity ? 'EditProfileCeleb' : 'EditProfile'
              })
            }>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapContent}>
          <Loader isDataLoaded={!!profileData}>
            {!!profileData && (
              <Tabs
                config={
                  profileData.role === ROLE_CELEB
                    ? this.tabsConfigCeleb
                    : this.tabsConfig
                }
                style={{ flex: 1 }}
                stylesItem={defaultTabsStyles.roundedTabs}
                activeTabIndex={
                  this.state.activeTabIndex
                    ? this.state.activeTabIndex
                    : this.getActiveTab()
                }
                stylesTabsContainer={{
                  backgroundColor: 'transparent',
                  marginBottom: 10
                }}
              />
            )}
          </Loader>
        </View>
        <ModalRecordVideo onVideoSave={this.handleVideoSave} />
        <ModalPepup />
      </PepupBackground>
    );
  }
}

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
