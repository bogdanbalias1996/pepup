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
import { ProfileScreenProps } from '.';
import { NotificationItems } from './NotificationItems';
import { History } from './History';
import { FanRequests } from './FanRequests';
import { openPepupModal, getCeleb } from '../Pepups/actions';
import { Loader } from '../../components/Loader/Loader'

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  handle: state.LoginState.handle,
  profileData: state.ProfileState.profileData,
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

export class Component extends React.PureComponent<ProfileScreenProps> {
  static navigationOptions = () => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        title={'Profile'.toUpperCase()}
        getRightComponent={() => {
          return (
            <TouchableOpacity onPress={() => navigate({ routeName: 'Settings' })}>
              <Icon name="nut-icon" />
            </TouchableOpacity>
          );
        }}
      />
    ),
  });

  tabsConfig = [
    {
      title: 'My Requests',
      component: () => <NotificationItems />,
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems />,
    },
  ];

  tabsConfigCeleb = [
    {
      title: 'Fan Requests',
      component: () => <FanRequests />,
    },
    {
      title: 'My Requests',
      component: () => <NotificationItems />,
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems />,
    },
    // {
    //   title: 'History',
    //   component: () => <History />,
    // },
  ];

  componentDidMount = () => {
    const { userId, handle } = this.props;

    handle && this.props.getProfile(handle);
    userId && this.props.getUserPepups(userId);
  };

  handleVideoSave = (video: any) => {
    const { fulfillPepupRequest, updateCelebIntroVideo, profileData } = this.props;

    if (!profileData) return

    const isCelebrity = profileData.role === ROLE_CELEB;

    isCelebrity ? updateCelebIntroVideo(profileData.id, video) : fulfillPepupRequest(video);
  }

  render() {
    const {
      profileData,
      openPepupModal,
      getCeleb,
    } = this.props;

    const isCelebrity = profileData && profileData.role === ROLE_CELEB

    const getModal = () => {
      openPepupModal();
      profileData && getCeleb(profileData.id);
    };

    return (
      <PepupBackground>
        <View style={styles.avatarsWrap}>
          {
            profileData && (
              <Image
                style={styles.avatar}
                source={
                  profileData.icon
                    ? { uri: profileData.icon }
                    : require('../../../assets/avatarPlaceholder.png')
                }
                resizeMode="cover"
              />
            )
          }
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
          <Text style={styles.title}>{profileData && profileData.name || ' '}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigate({
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
                config={profileData.role === ROLE_CELEB ? this.tabsConfigCeleb : this.tabsConfig}
                style={{ flex: 1 }}
                stylesItem={defaultTabsStyles.roundedTabs}
                stylesTabsContainer={{
                  backgroundColor: 'transparent',
                  marginBottom: 10,
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
  mapDispatchToProps,
)(Component);
