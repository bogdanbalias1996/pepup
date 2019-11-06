import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type WebViewPageScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
};

export type WebViewPageScreenDispatchProps = {};

export type WebViewPageScreenProps = WebViewPageScreenStateProps &
  WebViewPageScreenDispatchProps;
