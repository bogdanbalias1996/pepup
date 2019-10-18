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
import {getProfile, openVideoRecordModal, fulfillPepupRequest} from './actions';
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
  profileData: state.ProfileState.profileData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: (id: string) => dispatch(getProfile(id) as any),
  openVideoRecordModal: () => dispatch(openVideoRecordModal()),
  fulfillPepupRequest: (video: any) =>
    dispatch(fulfillPepupRequest(video) as any),
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

  dataNotifications = [
    {
      id: '1',
      date: 'Today',
      name: 'Michael Jordan',
      type: 'Pending',
      text: 'Please make me a pepup wishing my sister a happy birthday.',
    },
    {
      id: '2',
      date: 'Today',
      name: 'Lionel Messi',
      type: 'Completed',
      text:
        'Awadhe Warriors - Fan Meet n Greet started today. Get ready to be one of the participants!',
    },
    {
      id: '3',
      date: 'Today',
      name: 'Jonh Hopkins',
      type: 'Unavailable',
      text: 'Please make me a pepup wishing my sister a happy birthday.',
    },
  ];

  dataPepups = [
    {
      id: '1',
      date: '01 Oct 2009',
      who: 'Michael Jordan',
      toWhom: 'Sofia',
      pepup: 'Please make me a pepup wishing my sister a happy birthday.',
    },
    {
      id: '2',
      date: '01 Oct 2009',
      who: 'Lionel Messi',
      toWhom: 'Sofia',
      pepup:
        'Awadhe Warriors - Fan Meet n Greet started today. Get ready to be one of the participants!',
    },
    {
      id: '3',
      date: '01 Oct 2009',
      who: 'Jonh Hopkins',
      toWhom: 'Sofia',
      pepup: 'Please make me a pepup wishing my sister a happy birthday.',
    },
  ];

  tabsConfig = [
    {
      title: 'My Requests',
      component: () => <NotificationItems data={this.dataNotifications} />,
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems data={this.dataNotifications} />,
    },
  ];

  tabsConfigCeleb = [
    {
      title: 'My Requests',
      component: () => <NotificationItems data={this.dataNotifications} />,
    },
    {
      title: 'Notifications',
      component: () => <NotificationItems data={this.dataNotifications} />,
    },
    {
      title: 'Fan Requests',
      component: () => <FanRequests data={this.dataNotifications} />,
    },
    {
      title: 'History',
      component: () => <History data={this.dataPepups} />,
    },
  ];

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount = () => {
    const {userId} = this.props;
    userId && this.props.getProfile(userId);
  };

  render() {
    const {profileData, openVideoRecordModal, fulfillPepupRequest} = this.props;
    return (
      <PepupBackground>
        <Image
          style={styles.avatar}
          source={require('../../../assets/mock_avatar.jpg')}
          resizeMode="cover"
        />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{profileData.name || ''}</Text>
          <TouchableOpacity
            onPress={
              profileData.role === 'REGULAR,CELEBRITY'
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
          {profileData.role === 'REGULAR,CELEBRITY' ? (
            <Tabs
              config={this.tabsConfig}
              style={{flex: 1}}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 10,
              }}
            />
          ) : (
            <Tabs
              config={this.tabsConfigCeleb}
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
