import * as React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Dispatch } from 'redux';
import DeviceInfo from 'react-native-device-info';

import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { goBack } from '../../navigationService';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { SettingsScreenProps } from '.';
import { Icon } from '../../components/Icon/Icon';
import styles from './Settings.styles';
import { colorVioletStart, colorVioletEnd } from '../../variables';
import { logoutUser, setDeveloperMode } from '../Login/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { SuccessfulAlert } from '../../components/SuccessfulAlert/SuccessfulAlert';
import { openAlert, closeAlert } from '../Alert/actions';
import { IGlobalState } from '../../coreTypes';

const ListItem = ({
  title = '',
  onPress = () => {},
  style = {},
  styleText = {}
}) => {
  return (
    <LinearGradient
      start={[0, 0.5]}
      end={[1, 0.5]}
      colors={[colorVioletStart, colorVioletEnd]}
      style={styles.gradient}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.listItem, style]}
        onPress={() => !!onPress && onPress()}>
        <Text style={[styles.listItemText, styleText]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  developerMode: state.LoginState.developerMode
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(logoutUser() as any),
  openAlert: (data: any) => dispatch(openAlert(data) as any),
  closeAlert: () => dispatch(closeAlert() as any),
  setDeveloperMode: (data: boolean) => dispatch(setDeveloperMode(data) as any)
});

export class Component extends React.PureComponent<SettingsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        navigation={navigation}
        title={'Settings'.toUpperCase()}
        getLeftComponent={() => {
          return (
            <TouchableOpacity onPress={() => goBack()}>
              <Icon name="left" />
            </TouchableOpacity>
          );
        }}
      />
    )
  });

  state = {
    devIndicator: 0
  };

  render() {
    const { logoutUser, openAlert, closeAlert, setDeveloperMode } = this.props;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listItemsWrap}>
              <ListItem title="About Pepup" onPress={() => alert('Click!')} />
              <ListItem
                title="Partners &amp; Charities"
                onPress={() => alert('Click!')}
              />
              <ListItem
                title="Privacy Policy"
                onPress={() => alert('Click!')}
              />
              <ListItem
                title="Terms of Service"
                onPress={() => alert('Click!')}
              />
              <ListItem
                title="Provide Feedback"
                onPress={() => alert('Click!')}
              />
              <ListItem
                title={`App Version - ${DeviceInfo.getVersion()}`}
                onPress={() => {
                  this.setState({ devIndicator: this.state.devIndicator + 1 });
                  this.state.devIndicator === 6 &&
                    openAlert({
                      title: 'Developer info',
                      text: 'Now you`re developer!',
                      onPress: () => {
                        closeAlert();
                        setDeveloperMode(true);
                      }
                    });
                }}
              />
              <ListItem title="Sign Out" onPress={() => logoutUser()} />
            </View>
          </ScrollView>
        </View>
        <SuccessfulAlert />
      </PepupBackground>
    );
  }
}

export const SettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
