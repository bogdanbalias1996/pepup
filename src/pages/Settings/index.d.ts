import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type SettingsScreenStateProps = {
  developerMode: boolean;
};

export type SettingsScreenDispatchProps = {
  logoutUser: () => any;
  openAlert: (data: any) => any;
  openSettingsModal: (link: string) => void;
  closeAlert: () => any;
  setDeveloperMode: (data: boolean) => any;
};

export type SettingsScreenProps = SettingsScreenStateProps &
  SettingsScreenDispatchProps;
