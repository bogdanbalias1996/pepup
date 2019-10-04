import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'
import { type } from 'os';

export type ResetpassScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  isFontLoaded: boolean;
  navigationOptions?: NavigationScreenOptions;
  isFetching?: boolean;
}

export type ResetpassScreenDispatchProps = {
  resetPassword: (data: ResetpassScreenFromData, setErrors?: any) => Promise<any>;
}

export type ResetpassScreenProps = ResetpassScreenStateProps & ResetpassScreenDispatchProps;

export type ResetpassScreenFromData = {
  emailId: string;
}
