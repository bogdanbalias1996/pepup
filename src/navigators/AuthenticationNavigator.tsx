import { createStackNavigator } from "react-navigation";
import { LoginScreen } from "../pages/Login/Login";
import { ForgotPasswordScreen } from "../pages/ForgotPassword/ForgotPassword";
import { CheckInboxScreen } from '../pages/ForgotPassword/CheckInbox'
import { SignUpScreen } from "../pages/SignUp/SignUp";

export const AuthenticationNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation, screenProps }: any) => ({
        header: null,
        headerTransparent: true,
        title: "Login"
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation, screenProps }: any) => ({
        title: "SignUp",
        header: null,
        headerTransparent: true,
        headerTintColor: "white"
      })
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: ({ navigation, screenProps }: any) => ({
        header: null,
        headerTransparent: true,
        headerTintColor: "white"
      })
    },
    CheckInbox: {
      screen: CheckInboxScreen,
      navigationOptions: ({ navigation, screenProps }: any) => ({
        header: null,
        headerTransparent: true,
        headerTintColor: "white"
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);
