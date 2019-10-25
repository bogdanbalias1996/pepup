import * as React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Dispatch } from 'redux';

import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { SettingsScreenProps } from '.';
import { Icon } from '../../components/Icon/Icon';
import styles from './Settings.styles';
import { colorLightGreyBlue } from '../../variables';
import { logoutUser } from '../Login/actions';
import { ConnectedHeader } from './Settings.header';

const ListItem = ({
  title = '',
  onPress = () => {},
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
      {!!withIcon && <Icon name="next" color={colorLightGreyBlue} />}
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(logoutUser() as any)
});

export class Component extends React.PureComponent<SettingsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => <ConnectedHeader {...props} navigation={navigation} />
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
  null,
  mapDispatchToProps
)(Component);
