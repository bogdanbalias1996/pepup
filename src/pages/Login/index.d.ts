import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

export type LoginScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  isFontLoaded: boolean;
  navigationOptions?: NavigationScreenOptions;
  isFetching?: boolean;
}

export type LoginScreenDispatchProps = {
  loginUser: (data: LoginScreenFromData, setErrors: any, navigation: any) => Promise<any>;
}

export type LoginScreenProps = LoginScreenStateProps & LoginScreenDispatchProps;

export type LoginScreenFromData = {
  email: string;
  password: string;
}

export type AuthResponse = {
  accessToken: string;
}

