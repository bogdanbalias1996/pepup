import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type SettingsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
};

export type SettingsScreenDispatchProps = {
  logoutUser: () => any;
};

export type SettingsScreenProps = SettingsScreenStateProps &
  SettingsScreenDispatchProps;
