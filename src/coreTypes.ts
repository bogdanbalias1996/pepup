import { LoginState } from "./pages/Login/reducer";
import { FontState } from "./common/font.reducer";
import { ContestState } from "./pages/Contests/reducer";
import { EventState } from "./pages/Events/reducer";
import { ProfileState } from "./pages/Profile/reducer";
import { PepupState } from './pages/Pepups/reducer';
import { AlertState } from "./pages/Alert/reducer";
import { ErrorState } from "./pages/ErrorModal/reducer";
import { ConnectionState } from "./utils/connectionCheck/reducer";

export interface IGlobalState {
  LoginState: LoginState;
  FontState: FontState;
  ContestState: ContestState;
  EventState: EventState;
  ProfileState: ProfileState;
  PepupState: PepupState;
  AlertState: AlertState;
  ErrorState: ErrorState;
  ConnectionState: ConnectionState;
}

export interface IAction<T> {
  type: string;
  data: T;
}

export type ObjectWithStrings = { [key: string]: string };
