import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { LoginScreenFromData, AuthResponse } from './';
import { IAction } from '../../coreTypes';
import { navigate } from '../../navigationService';

export const REQUEST_LOGIN_USER = 'REQUEST_LOGIN_USER';
export const requestLogInUser = (): IAction<undefined> => {
  return {
    type: REQUEST_LOGIN_USER,
    data: undefined
  };
};

export const FAILURE_LOGIN_USER = 'FAILURE_LOGIN_USER';
export const failureLogInUser = (): IAction<undefined> => {
  return {
    type: FAILURE_LOGIN_USER,
    data: undefined
  };
};

export const RECEIVE_LOGIN_USER = 'RECEIVE_LOGIN_USER';
export const receiveLoginUser = (data: AuthResponse): IAction<AuthResponse> => {
  return {
    type: RECEIVE_LOGIN_USER,
    data
  };
};

export const RECEIVE_SESSION_FROM_LOCAL_STORAGE =
  'RECEIVE_SESSION_FROM_LOCAL_STORAGE';
export const receiveSessionFromLocalStorage = (
  session: AuthResponse
): IAction<AuthResponse> => {
  return {
    type: RECEIVE_SESSION_FROM_LOCAL_STORAGE,
    data: session
  };
};

export const REMOVE_SESSION = 'REMOVE_SESSION';
export const removeSession = (): IAction<undefined> => {
  return {
    type: REMOVE_SESSION,
    data: undefined
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    dispatch(removeSession());
    navigate({ routeName: 'Login' });
  };
};

export const loginUser = (
  payload: LoginScreenFromData,
  setErrors: any,
  navigation: any
) => {
  return (dispatch: Dispatch) => {
    const { email, password } = payload;

    // Temporary solution for tracking error states
    const headers = email ? null : { Prefer: 'status=400' };
    dispatch(requestLogInUser());
    request({
      operation: ApiOperation.LogIn,
      variables: {
        email,
        password
      },
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveLoginUser(res));
        navigate({ routeName: 'Profile' });
      })
      .catch(err => {
        const {
          error = 'The email/password combination are incorrect'
        } = err.response.body;
        dispatch(failureLogInUser());
        setErrors({
          email: error,
          password: error
        });
      });
  };
};

export const SET_USER_ID = 'SET_USER_ID';
export const setUserId = (data): IAction<string> => {
  return {
    type: SET_USER_ID,
    data: data
  };
};