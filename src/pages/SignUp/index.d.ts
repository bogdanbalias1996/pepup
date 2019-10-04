import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

export type SignupScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  isFontLoaded: boolean;
  navigationOptions?: NavigationScreenOptions;
  isFetching?: boolean;
}

export type SignupScreenDispatchProps = {
  signupUser: (data: SignupScreenFromData, setErrors: any, navigation: any) => Promise<any>;
}

export type SignupScreenProps = SignupScreenStateProps & SignupScreenDispatchProps;

export type SignupScreenFromData = {
  name: string;  
  email: string;
  password: string;
}

export type AuthResponse = {
  accessToken: string;
}

