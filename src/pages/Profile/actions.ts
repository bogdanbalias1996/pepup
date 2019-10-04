import { Dispatch } from 'redux'
import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { IAction } from '../../coreTypes'

export const RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE";
export const receiveUserProfile = (data): IAction<any> => {
  return {
    type: RECEIVE_USER_PROFILE,
    data
  };
};

export const getProfile = (userId: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetProfile,
      params: {
        userId
      }
    })
      .then(res => {
        dispatch(receiveUserProfile(res));
      })
      .catch(err => {
        console.error(JSON.stringify(err, null, 2));
      });
  };
};