import { Dispatch } from 'redux'
import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { EditProfileScreenFromData } from './'
import { navigate } from '../../navigationService'
import { IAction } from "../../coreTypes";
import { AuthResponse } from '../Login';
import { openAlert, closeAlert } from '../Alert/actions'

export const REQUEST_EDIT_USER = "REQUEST_EDIT_USER";
export const requestEditUser = (): IAction<undefined> => {
  return {
    type: REQUEST_EDIT_USER,
    data: undefined
  };
};

export const RECEIVE_EDIT_USER = "RECEIVE_EDIT_USER";
export const receiveEditUser = (data: AuthResponse): IAction<AuthResponse> => {
  return {
    type: RECEIVE_EDIT_USER,
    data
  };
};

export const FAILURE_EDIT_USER = "FAILURE_EDIT_USER";
export const failureEditUser = (): IAction<undefined> => {
  return {
    type: FAILURE_EDIT_USER,
    data: undefined
  };
};

export const editProfile = (payload: EditProfileScreenFromData, setErrors: any) => {
  return (dispatch: Dispatch) => {
    const { email, newPasswd, name, dob, userId, profileInfo } = payload;

    dispatch(requestEditUser());
    request({
      operation: ApiOperation.EditProfile,
      variables: {
        email,
        newPasswd,
        name,
        dob,
        userId,
        profileInfo
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        dispatch(receiveEditUser(res));
        dispatch(openAlert({
          title: 'Changes Saved',
          text: 'Updates to your profile have been saved.',
          onPress: () => {
            dispatch(closeAlert());
            navigate({ routeName: 'PROFILE' })
          }
        }));
      })
      .catch((err) => {
        dispatch(failureEditUser());
        const { error = 'These fields are not valid' } = err.response.body
        setErrors({
          'email': error,
          'name': error
        })
      })
  }
}