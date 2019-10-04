import * as React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { SettingsScreenProps } from '.';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Icon } from '../../components/Icon/Icon';
import styles from './Settings.styles';
import { goBack } from '../../navigationService';
import { colorLightGreyBlue } from '../../variables';
import { logoutUser } from '../Login/actions';

const Header = props => (
  <HeaderRounded
    {...props}
    title={'Settings'.toUpperCase()}
    getLeftComponent={() => {
      return (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="left" />
        </TouchableOpacity>
      );
    }}
  />
);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser() as any)
});

const ConnectedHeader = connect(
  mapStateToProps,
  null
)(Header);

const ListItem = ({
  title,
  onPress,
  withIcon = false,
  style = {},
  styleText = {}
}) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, style]}
      onPress={() => !!onPress && onPress()}
    >
      <Text style={[styles.listItemText, styleText]}>{title}</Text>
      {!!withIcon && <Icon name="next" color={colorLightGreyBlue} size={24} />}
    </TouchableOpacity>
  );
};

export class Component extends React.PureComponent<SettingsScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />
  });

  render() {
    const { logoutUser } = this.props;
    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <ScrollView>
            <View style={styles.listItemGroup}>
              <ListItem
                title="Settings page"
                onPress={() => {}}
                withIcon={true}
              />
              <ListItem
                title="Email notifications"
                onPress={() => {}}
                withIcon={true}
              />
              <ListItem title="Account" onPress={() => {}} withIcon={true} />
            </View>
            <View style={styles.listItemGroup}>
              <ListItem
                title="Clear image cache"
                onPress={() => {}}
                style={{ borderTopWidth: 1 }}
              />
              <ListItem title="Clear all caches" onPress={() => {}} />
            </View>
            <View style={styles.listItemGroup}>
              <ListItem
                title="Sign Out"
                onPress={() => logoutUser()}
                styleText={styles.signOutText}
                style={{ borderTopWidth: 1 }}
              />
            </View>
          </ScrollView>
        </View>
      </PepupBackground>
    );
  }
}

export const SettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
