import { createStackNavigator } from "react-navigation";
import { LoginScreen } from "../pages/Login/Login";
import { ForgotPasswordScreen } from "../pages/ForgotPassword/ForgotPassword";
import { CheckInboxScreen } from '../pages/ForgotPassword/CheckInbox'
import { SignUpScreen } from "../pages/SignUp/SignUp";

export const AuthenticationNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
    CheckInbox: CheckInboxScreen
  },
  {
    headerMode: 'none'
  }
);
