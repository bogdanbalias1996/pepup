import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Dispatch } from 'redux';
import FastImage from 'react-native-fast-image';

import { IGlobalState } from '../../coreTypes';
import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Icon } from '../../components/Icon/Icon';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { navigate } from '../../navigationService';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

import styles from './Profile.styles';
import { getProfile, getUserPepups } from './actions';
import { ProfileScreenProps } from '.';
import { NotificationItems } from './NotificationItems';
import { History } from './History';
import { FanRequests } from './FanRequests';
import { openPepupModal, getCeleb } from '../Pepups/actions';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  handle: state.LoginState.handle,
  profileData: state.ProfileState.profileData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: (handle: string) => dispatch(getProfile(handle) as any),
  openPepupModal: () => dispatch(openPepupModal()),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),    
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
      component: () => <NotificationItems />
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems />
    }
  ];

  tabsConfigCeleb = [
    {
      title: 'Fan Requests',
      component: () => <FanRequests />
    },
    {
      title: 'My Requests',
      component: () => <NotificationItems />
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems />
    }
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

  render() {
    const { profileData, openPepupModal, getCeleb } = this.props;

    const isCelebrity = profileData && profileData.role === ROLE_CELEB;

    const getModal = () => {
      openPepupModal();
      profileData && getCeleb(profileData.id);
    };

    return (
      profileData && (
        <PepupBackground>
          <View style={styles.avatarsWrap}>
            {profileData && (
              <Card style={styles.avatar} radius={6}>
                <CardGradient style={{ borderRadius: 6 }} />
                <FastImage
                  style={styles.image}
                  source={
                    profileData.icon
                      ? {
                          uri: profileData.icon,
                          priority: FastImage.priority.normal
                        }
                      : require('../../../assets/avatarPlaceholder.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </Card>
            )}
            {isCelebrity && (
              <Card style={styles.avatar} radius={6}>
                <CardGradient style={{ borderRadius: 6 }} />
                <TouchableOpacity activeOpacity={1} onPress={getModal}>
                  <Image
                    style={[styles.image, styles.avatarCeleb]}
                    source={require('../../../assets/celebAvatar.png')}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Card>
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
          <ModalPepupNotification />
        </PepupBackground>
      )
    );
  }
}

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
