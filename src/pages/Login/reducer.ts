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
  SET_USER_NAME
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

  constructor() {
    this.accessToken = '';
    this.isFetching = false;
    this.userId = '';
    this.handle = '';
    this.developerMode = false;
    this.name = '';
  }
}

export const initialState = new LoginState();

export const LoginReducer = (
  state: LoginState = initialState,
  action: IAction<any>
): LoginState => {
  switch (action.type) {
    case RECEIVE_LOGIN_USER:
      Storage.set(action.data.accessToken, ACCESS_TOKEN_NAME);
      Storage.set(action.data.handle, ACCESS_HANDLE_NAME);
      Storage.set(action.data.name, ACCESS_USER_NAME);

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
      Storage.set(action.data.accessToken, ACCESS_TOKEN_NAME);
      Storage.set(action.data.handle, ACCESS_HANDLE_NAME);

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
      Storage.set(action.data, 'developerMode');

      return {
        ...state,
        developerMode: action.data
      };
    default:
      return state;
  }
};
