import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type SettingsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  developerMode: boolean;
};

export type SettingsScreenDispatchProps = {
  logoutUser: () => any;
  openAlert: (data: any) => any;
  closeAlert: () => any;
  setDeveloperMode: (data: boolean) => any;
};

export type SettingsScreenProps = SettingsScreenStateProps &
  SettingsScreenDispatchProps;
