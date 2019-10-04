import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { ResetpassScreenFromData } from './'
import { navigate } from '../../navigationService'
import { IAction } from '../../coreTypes';
import { Dispatch } from 'redux';


export const REQUEST_RESETPASSWORD_USER = "REQUEST_RESETPASSWORD_USER ";
export const requestResetPasswordUser = (): IAction<undefined> => {
  return {
    type: REQUEST_RESETPASSWORD_USER,
    data: undefined
  };
};

export const RECEIVE_RESETPASSWORD_USER = "RECEIVE_RESETPASSWORD_USER";
export const receiveResetPasswordUser = (): IAction<undefined> => {
  return {
    type: RECEIVE_RESETPASSWORD_USER,
    data: undefined
  };
};

export const FAILURE_RESETPASSWORD_USER = "FAILURE_RESETPASSWORD_USER";
export const failureResetPasswordUser = (): IAction<undefined> => {
  return {
    type: FAILURE_RESETPASSWORD_USER,
    data: undefined
  };
};

export const resetPassword = (payload: ResetpassScreenFromData, setErrors: any) => {
  return (dispatch: Dispatch) => {
    const { emailId } = payload;
    dispatch(requestResetPasswordUser());
    request({
      operation: ApiOperation.ResetPass,
      variables: {
        emailId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => {
        dispatch(receiveResetPasswordUser())
        navigate({
          routeName: "CheckInbox",
          params: { emailId }
        });
      })
      .catch((err) => {
        const { error = 'Email does not exist' } = err.response.body
        console.error(JSON.stringify(err, null, 2))
        dispatch(failureResetPasswordUser())
        setErrors({
          'emailId': error
        })
      })
  }
}
