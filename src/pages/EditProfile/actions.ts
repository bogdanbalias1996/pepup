import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { EditProfileScreenFromData } from './';
import { navigate } from '../../navigationService';
import { IAction } from '../../coreTypes';
import { AuthResponse } from '../Login';
import { openAlert, closeAlert } from '../Alert/actions';
import { getStore } from '../../configureStore';

export const REQUEST_EDIT_USER = 'REQUEST_EDIT_USER';
export const requestEditUser = (): IAction<undefined> => {
  return {
    type: REQUEST_EDIT_USER,
    data: undefined
  };
};

export const RECEIVE_EDIT_USER = 'RECEIVE_EDIT_USER';
export const receiveEditUser = (data: AuthResponse): IAction<AuthResponse> => {
  return {
    type: RECEIVE_EDIT_USER,
    data
  };
};

export const FAILURE_EDIT_USER = 'FAILURE_EDIT_USER';
export const failureEditUser = (): IAction<undefined> => {
  return {
    type: FAILURE_EDIT_USER,
    data: undefined
  };
};

export const updateProfilePhoto = photo => dispatch => {
  const { userId } = getStore().getState().LoginState;

  dispatch(requestEditUser());
  request({
    operation: ApiOperation.EditProfile,
    variables: {
      userId,
      photo: {
        name: new Date().getTime(),
        uri: photo.uri
      }
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      dispatch(receiveEditUser(res));
      dispatch(
        openAlert({
          title: 'Changes Saved',
          text: 'Updates to your profile have been saved.',
          onPress: () => {
            dispatch(closeAlert());
            navigate({ routeName: 'Profile' });
          }
        })
      );
    })
    .catch(err => {
      dispatch(failureEditUser());
      console.log('ERROR', JSON.stringify(err, null, 2));
    });
};

export const editProfile = (
  payload: EditProfileScreenFromData,
  setErrors: any
) => {
  return (dispatch: Dispatch) => {
    const {
      email,
      newPasswd,
      name,
      dob,
      userId,
      city,
      country,
      intro,
      bio,
      introVideo,
      address
    } = payload;

    dispatch(requestEditUser());
    request({
      operation: ApiOperation.EditProfile,
      variables: {
        email,
        newPasswd,
        name,
        dob,
        userId,
        profileInfo: {
          city,
          country,
          intro,
          bio,
          address,
          introVideo
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch(receiveEditUser(res));
        dispatch(
          openAlert({
            title: 'Changes Saved',
            text: 'Updates to your profile have been saved.',
            onPress: () => {
              dispatch(closeAlert());
              navigate({ routeName: 'Profile' });
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureEditUser());
        const { error = 'These fields are not valid' } = err.response.body;
        setErrors({
          email: error,
          name: error
        });
      });
  };
};
