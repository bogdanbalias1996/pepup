import { Dispatch } from 'redux'
import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { SignupScreenFromData, AuthResponse } from './'
import { navigate } from '../../navigationService'
import { IAction } from "../../coreTypes";

export const REQUEST_SIGNUP_USER = "REQUEST_SIGNUP_USER";
export const requestSignUpUser = (): IAction<undefined> => {
  return {
    type: REQUEST_SIGNUP_USER,
    data: undefined
  };
};

export const RECEIVE_SIGNUP_USER = "RECEIVE_SIGNUP_USER";
export const receiveSignUpUser = (data: AuthResponse): IAction<AuthResponse> => {
  return {
    type: RECEIVE_SIGNUP_USER,
    data
  };
};

export const FAILURE_SIGNUP_USER = "FAILURE_SIGNUP_USER";
export const failureSignUpUser = (): IAction<undefined> => {
  return {
    type: FAILURE_SIGNUP_USER,
    data: undefined
  };
};

export const signupUser = (payload: SignupScreenFromData, setErrors: any, navigation: any) => {
  return (dispatch: Dispatch) => {
    const { email, password, name } = payload

    // Temporary solution for tracking error states
    const headers = email ? null : { 'Prefer': 'status=400' }
    dispatch(requestSignUpUser());
    request({
      operation: ApiOperation.SignUp,
      variables: {
        email,
        password,
        name
      },
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => {
        dispatch(receiveSignUpUser(res));
        navigate({ routeName: 'Profile' });
      })
      .catch((err) => {
        dispatch(failureSignUpUser());
        const { error = 'This email is already registered' } = err.response.body
        setErrors({
          'email': error,
          'password': error,
          'name': error
        })
      })
  }
}
