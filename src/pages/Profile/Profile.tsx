import * as React from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Dispatch} from 'redux';

import {IGlobalState} from '../../coreTypes';
import {ModalPepup} from '../../components/ModalPepup/ModalPepup';
import {ModalRecordVideo} from '../../components/ModalRecordVideo/ModalRecordVideo';
import {PepupBackground} from '../../components/PepupBackground/PepupBackground';
import {Icon} from '../../components/Icon/Icon';
import {Tabs, defaultTabsStyles} from '../../components/Tabs/Tabs';
import {HeaderRounded} from '../../components/HeaderRounded/HeaderRounded';
import {navigate} from '../../navigationService';

import styles from './Profile.styles';
import {
  getProfile,
  openVideoRecordModal,
  fulfillPepupRequest,
  getUserPepups,
} from './actions';
import {ProfileScreenProps, HeaderProps} from '.';
import {NotificationItems} from './NotificationItems';
import {History} from './History';
import {FanRequests} from './FanRequests';
import {openPepupModal, getCeleb} from '../Pepups/actions';

const Header = (props: HeaderProps) => (
  <HeaderRounded
    {...props}
    title={'Profile'.toUpperCase()}
    getRightComponent={() => {
      return (
        <TouchableOpacity onPress={() => navigate({routeName: 'Settings'})}>
          <Icon name="nut-icon" />
        </TouchableOpacity>
      );
    }}
  />
);

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  handle: state.LoginState.handle,
  profileData: state.ProfileState.profileData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: (handle: string) => dispatch(getProfile(handle) as any),
  openVideoRecordModal: () => dispatch(openVideoRecordModal()),
  openPepupModal: () => dispatch(openPepupModal()),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  fulfillPepupRequest: (video: any) =>
    dispatch(fulfillPepupRequest(video) as any),
  getUserPepups: (id: string) => dispatch(getUserPepups(id) as any),
});

const ConnectedHeader = connect(
  mapStateToProps,
  null,
)(Header);

const ROLE_CELEB = 'REGULAR,CELEBRITY';
export class Component extends React.PureComponent<ProfileScreenProps> {
  static navigationOptions = ({navigation}: any) => ({
    header: (props: any) => (
      <ConnectedHeader {...props} navigation={navigation} />
    ),
  });

  state = {
    isModalVisible: false,
  };

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
      title: 'My Requests',
      component: () => <NotificationItems />,
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems />,
    },
    {
      title: 'Fan Requests',
      component: () => <FanRequests />,
    },
    {
      title: 'History',
      component: () => <History />,
    },
  ];

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount = () => {
    const {userId, handle} = this.props;

    handle && this.props.getProfile(handle);
    userId && this.props.getUserPepups(userId);
  };

  render() {
    const {
      profileData,
      openVideoRecordModal,
      fulfillPepupRequest,
      openPepupModal,
      getCeleb,
    } = this.props;
    const getModal = () => {
      openPepupModal();
      getCeleb(profileData.id);
    };

    return (
      <PepupBackground>
        <View style={styles.avatarsWrap}>
          <Image
            style={styles.avatar}
            source={
              profileData.icon
                ? {uri: profileData.icon}
                : require('../../../assets/avatarPlaceholder.png')
            }
            resizeMode="cover"
          />
          {profileData.role === ROLE_CELEB ? (
            <TouchableOpacity onPress={() => getModal()}>
              <Image
                style={[styles.avatar, styles.avatarCeleb]}
                source={require('../../../assets/celebAvatar.png')}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{profileData.name || ''}</Text>
          <TouchableOpacity
            onPress={
              profileData.role === ROLE_CELEB
                ? () => navigate({routeName: 'EditProfileCeleb'})
                : () => navigate({routeName: 'EditProfile'})
            }>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => openVideoRecordModal()}>
          <Text style={styles.title}>MODAL 222</Text>
        </TouchableOpacity>

        <View style={styles.wrapContent}>
          {profileData.role === ROLE_CELEB ? (
            <Tabs
              config={this.tabsConfigCeleb}
              style={{flex: 1}}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 10,
              }}
            />
          ) : (
            <Tabs
              config={this.tabsConfig}
              style={{flex: 1}}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 10,
              }}
            />
          )}
        </View>
        <ModalRecordVideo onVideoSave={fulfillPepupRequest} />
        <ModalPepup />
      </PepupBackground>
    );
  }
}

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
