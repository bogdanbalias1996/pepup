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
import {
  colorVioletStart,
  colorVioletEnd
} from '../../variables';
import { logoutUser } from '../Login/actions';
import { LinearGradient } from 'expo-linear-gradient';

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(logoutUser() as any)
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

  render() {
    const { logoutUser } = this.props;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <ScrollView>
            <View style={styles.listItemsWrap}>
              <ListItem title="About Pepup" onPress={() => alert('Click!')} />
              <ListItem title="Partners &amp; Charities" onPress={() => alert('Click!')} />
              <ListItem title="Privacy Policy" onPress={() => alert('Click!')} />
              <ListItem title="Terms of Service" onPress={() => alert('Click!')} />
              <ListItem title="Provide Feedback" onPress={() => alert('Click!')} />
              <ListItem title={`App Version - ${DeviceInfo.getVersion()}`} onPress={() => alert('Click!')} />
              <ListItem title="Sign Out" onPress={() => logoutUser()} />
            </View>
          </ScrollView>
        </View>
      </PepupBackground>
    );
  }
}

export const SettingsScreen = connect(
  null,
  mapDispatchToProps
)(Component);
