import * as React from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Dispatch} from 'redux';

import {IGlobalState} from '../../coreTypes';
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
  fulfillPepupRequest: (video: any) =>
    dispatch(fulfillPepupRequest(video) as any),
  getUserPepups: (id: string) => dispatch(getUserPepups(id) as any),
});

const ConnectedHeader = connect(
  mapStateToProps,
  null,
)(Header);

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
    const {profileData, openVideoRecordModal, fulfillPepupRequest} = this.props;
    console.log(profileData);
    return (
      <PepupBackground>
        <Image
          style={styles.avatar}
          source={
            profileData.icon
              ? {uri: profileData.icon}
              : require('../../../assets/avatarPlaceholder.png')
          }
          resizeMode="cover"
        />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{profileData.name || ''}</Text>
          <TouchableOpacity
            onPress={
              // profileData.role === 'REGULAR,CELEBRITY'
              profileData.role === 'DF'
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
          {// profileData.role === 'REGULAR,CELEBRITY'
          profileData.role === 'DF' ? (
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
      </PepupBackground>
    );
  }
}

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
