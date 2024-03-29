import * as React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { goBack, } from '../../navigationService';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { SettingsScreenProps } from '.';
import { Icon } from '../../components/Icon/Icon';
import styles from './Settings.styles';
import { colorBorderGradEnd, colorBorderGradStart } from '../../variables';
import { logoutUser, setDeveloperMode } from '../Login/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { openAlert, closeAlert } from '../Alert/actions';
import { IGlobalState } from '../../coreTypes';
import { openSettingsModal } from '../WebViewPage/actions';
import WebViewPage from '../WebViewPage';

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
      colors={[colorBorderGradStart, colorBorderGradEnd]}
      style={styles.gradient}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.listItem, style]}
        onPress={onPress}>
        <Text style={[styles.listItemText, styleText]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  developerMode: state.LoginState.developerMode
});

const mapDispatchToProps = {
  logoutUser, openAlert, closeAlert, setDeveloperMode, openSettingsModal
}

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
    const { logoutUser, openAlert, openSettingsModal } = this.props;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listItemsWrap}>
              <ListItem
                title="About Pepup"
                onPress={() => openSettingsModal('https://github.com/facebook/react-native')}
              />
              <ListItem
                title="Partners &amp; Charities"
                onPress={() => openSettingsModal('https://github.com/facebook/react-native')}
              />
              <ListItem
                title="Privacy Policy"
                onPress={() => openSettingsModal('https://github.com/facebook/react-native')}
              />
              <ListItem
                title="Terms of Service"
                onPress={() => openSettingsModal('https://github.com/facebook/react-native')}
              />
              <ListItem
                title="Provide Feedback"
                onPress={() => openSettingsModal('https://github.com/facebook/react-native')}
              />
              <ListItem
                title={`App Version - ${DeviceInfo.getVersion()}`}
                onPress={() => {
                  this.setState({ devIndicator: this.state.devIndicator + 1 });
                  if (this.state.devIndicator === 6) {
                    openAlert({
                      title: 'Developer info',
                      text: 'Developer mode:',
                      isDevAlert: true
                    });
                    this.setState({ devIndicator: 0 });
                  }
                }}
              />
              <ListItem title="Sign Out" onPress={() => logoutUser()} />
            </View>
          </ScrollView>
        </View>
        <WebViewPage />
      </PepupBackground>
    );
  }
}

export const SettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
