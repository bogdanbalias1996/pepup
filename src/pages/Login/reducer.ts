import { IAction } from '../../coreTypes';
import { IS_ONBOARDING_PASSED } from '../Onboarding/Onboarding';
import {
  RECEIVE_LOGIN_USER,
  REMOVE_SESSION,
  REQUEST_LOGIN_USER,
  FAILURE_LOGIN_USER,
  SET_USER_ID,
  SET_HANDLE_NAME,
  SET_DEVELOPER_MODE,
  SET_USER_NAME,
  RECIEVE_REGISTER_DEVICE
} from './actions';

import {
  REQUEST_SIGNUP_USER,
  FAILURE_SIGNUP_USER,
  RECEIVE_SIGNUP_USER
} from '../SignUp/actions';

import {
  REQUEST_RESETPASSWORD_USER,
  FAILURE_RESETPASSWORD_USER,
  RECEIVE_RESETPASSWORD_USER
} from '../ForgotPassword/actions';

import {
  ACCESS_TOKEN_NAME,
  ACCESS_HANDLE_NAME,
  ACCESS_USER_NAME
} from '../../common/utils/session';

import Storage from '../../common/utils/Storage';

export class LoginState {
  accessToken: string;
  isFetching: boolean;
  userId: string;
  handle: string;
  developerMode: boolean;
  name: string;
  deviceId: string;

  constructor() {
    this.accessToken = '';
    this.isFetching = false;
    this.userId = '';
    this.handle = '';
    this.developerMode = false;
    this.name = '';
    this.deviceId = '';
  }
}

export const initialState = new LoginState();

export const LoginReducer = (
  state: LoginState = initialState,
  action: IAction<any>
): LoginState => {
  switch (action.type) {
    case RECEIVE_LOGIN_USER:
      Storage.setItem(ACCESS_TOKEN_NAME, action.data.accessToken);
      Storage.setItem(ACCESS_HANDLE_NAME, action.data.handle);
      Storage.setItem(ACCESS_USER_NAME, action.data.name);

      return {
        ...state,
        accessToken: action.data.accessToken,
        userId: action.data.id,
        name: action.data.name,
        isFetching: false,
        handle: action.data.handle
      };

    case REQUEST_LOGIN_USER:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_LOGIN_USER:
      return {
        ...state,
        isFetching: false
      };

    case RECIEVE_REGISTER_DEVICE: {
      Storage.setItem(ACCESS_TOKEN_NAME, action.data.deviceToken);

      return {
        ...state,
        deviceId: action.data.deviceId
      };
    }

    case REMOVE_SESSION:
      Storage.clear([IS_ONBOARDING_PASSED]);
      return new LoginState();

    case REQUEST_SIGNUP_USER:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_SIGNUP_USER:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_SIGNUP_USER:
      Storage.setItem(ACCESS_TOKEN_NAME, action.data.accessToken);
      Storage.setItem(ACCESS_HANDLE_NAME, action.data.handle);

      return {
        ...state,
        accessToken: action.data.accessToken,
        isFetching: false,
        userId: action.data.id,
        handle: action.data.handle
      };

    case REQUEST_RESETPASSWORD_USER:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_RESETPASSWORD_USER:
      return {
        ...state,
        isFetching: false
      };

    case FAILURE_RESETPASSWORD_USER:
      return {
        ...state,
        isFetching: false
      };

    case SET_USER_ID:
      return {
        ...state,
        userId: action.data
      };
    case SET_HANDLE_NAME:
      return {
        ...state,
        handle: action.data
      };
    case SET_USER_NAME:
      return {
        ...state,
        name: action.data
      };
    case SET_DEVELOPER_MODE:
      Storage.setItem('developerMode', action.data);

      return {
        ...state,
        developerMode: action.data
      };
    default:
      return state;
  }
};
