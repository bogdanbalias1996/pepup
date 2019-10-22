import { IAction } from '../../coreTypes';
import {
  RECEIVE_LOGIN_USER,
  REMOVE_SESSION,
  REQUEST_LOGIN_USER,
  FAILURE_LOGIN_USER,
  SET_USER_ID
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
  setLocalStorage,
  clearLocalStorage,
  ACCESS_TOKEN_NAME
} from '../../common/utils/session';

export class LoginState {
  accessToken: string;
  isFetching: boolean;
  userId: string;
  handle: string;

  constructor() {
    this.accessToken = '';
    this.isFetching = false;
    this.userId = '';
    this.handle ='';
  }
}

export const initialState = new LoginState();

export const LoginReducer = (
  state: LoginState = initialState,
  action: IAction<any>
): LoginState => {
  switch (action.type) {
    case RECEIVE_LOGIN_USER:
      setLocalStorage(action.data.accessToken, ACCESS_TOKEN_NAME);

      return {
        ...state,
        accessToken: action.data.accessToken,
        userId: action.data.id,
        isFetching: false,
        handle: action.data.handle,
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
      clearLocalStorage();
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
      setLocalStorage(action.data.accessToken, ACCESS_TOKEN_NAME);

      return {
        ...state,
        accessToken: action.data.accessToken,
        isFetching: false,
        userId: action.data.id
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

    default:
      return state;
  }
};
