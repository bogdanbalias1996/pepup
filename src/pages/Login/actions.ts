import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { LoginScreenFromData, AuthResponse, DeviceResponse } from './';
import { IAction } from '../../coreTypes';
import { navigate } from '../../navigationService';
import { openError } from '../ErrorModal/actions';
import DeviceInfo from 'react-native-device-info';
import { getStore } from '../../configureStore';

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

export const REQUEST_REGISTER_DEVICE = 'REQUEST_REGISTER_DEVICE';
const requestRegisterDevice = (): IAction<undefined> => {
  return {
    type: REQUEST_REGISTER_DEVICE,
    data: undefined
  };
};

export const FAILURE_REGISTER_DEVICE = 'FAILURE_REGISTER_DEVICE';
const failureRegisterDevice = (): IAction<undefined> => {
  return {
    type: FAILURE_REGISTER_DEVICE,
    data: undefined
  };
};

export const RECIEVE_REGISTER_DEVICE = 'RECIEVE_REGISTER_DEVICE';
const recieveRegisterDevice = (
  data: DeviceResponse
): IAction<DeviceResponse> => {
  return {
    type: RECIEVE_REGISTER_DEVICE,
    data
  };
};

const registerDevice = () => {
  return (dispatch: Dispatch) => {
    const timezone = new Date().getTimezoneOffset() / 60;
    const deviceType = DeviceInfo.getSystemName();
    const os = DeviceInfo.getSystemVersion();
    const appVersion = DeviceInfo.getVersion();
    const token = getStore().getState().LoginState.accessToken;

    dispatch(requestRegisterDevice());

    request({
      operation: ApiOperation.RegisterDevice,
      variables: {
        token,
        timezone,
        os,
        appVersion,
        deviceType
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => dispatch(recieveRegisterDevice(res)))
      .catch(err => dispatch(failureRegisterDevice()));
  };
};

export const loginUser = (
  payload: LoginScreenFromData,
  setErrors: any,
  navigation: any
) => {
  return (dispatch: Dispatch) => {
    const { email, password } = payload;

    dispatch(requestLogInUser());
    request({
      operation: ApiOperation.LogIn,
      variables: {
        email,
        password
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveLoginUser(res));
        navigate({ routeName: 'Pepups' });
        dispatch(registerDevice() as any);
      })
      .catch(err => {
        const {
          error = 'The email/password combination are incorrect'
        } = err.response.body;
        dispatch(failureLogInUser());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(loginUser(payload, setErrors, navigation) as any);
            }
          })
        );
        setErrors({
          email: error,
          password: error
        });
      });
  };
};

export const SET_USER_ID = 'SET_USER_ID';
export const setUserId = (data: string): IAction<string> => {
  return {
    type: SET_USER_ID,
    data
  };
};

export const SET_HANDLE_NAME = 'SET_HANDLE_NAME';
export const setHandleName = (data: string): IAction<string> => {
  return {
    type: SET_HANDLE_NAME,
    data
  };
};

export const SET_USER_NAME = 'SET_USER_NAME';
export const setUserName = (data: string): IAction<string> => {
  return {
    type: SET_USER_NAME,
    data
  };
};

export const SET_DEVELOPER_MODE = 'SET_DEVELOPER_MODE';
export const setDeveloperMode = (data: boolean) => {
  return {
    type: SET_DEVELOPER_MODE,
    data
  };
};
