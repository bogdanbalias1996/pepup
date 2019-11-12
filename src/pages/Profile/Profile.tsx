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
import { MyRequests } from './MyRequests';
import { History } from './History';
import { FanRequests } from './FanRequests';
import { openPepupModal, getCeleb } from '../Pepups/actions';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';
import { ModalPostReview } from '../../components/ModalReviewForm/ModalPostReview';
import { Notifications } from './Notifications';
import { ModalVideo } from '../../components/ModalVideo/ModalVideo';

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
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
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
      component: () => <MyRequests />
    },
    {
      title: 'Notifications',
      component: () => <Notifications />
    }
  ];

  tabsConfigCeleb = [
    {
      title: 'Fan Requests',
      component: () => <FanRequests />
    },
    {
      title: 'My Requests',
      component: () => <MyRequests />
    },
    {
      title: 'Notifications',
      component: () => <Notifications />
    }
    // {
    //   title: 'History',
    //   component: () => <History />,
    // },
  ];

  componentDidMount = () => {
    const { handle, getProfile } = this.props;

    handle && getProfile(handle);
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
          <ModalVideo />
          <ModalPepup />
          <ModalPostReview />
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
