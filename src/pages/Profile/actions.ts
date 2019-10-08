import {Dispatch} from 'redux';
import {ApiOperation} from '../../api/api';
import {request} from '../../api/network';
import {IAction} from '../../coreTypes';

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const receiveUserProfile = (data): IAction<string> => {
  return {
    type: RECEIVE_USER_PROFILE,
    data,
  };
};

export const OPEN_VIDEO_RECORD_MODAL = 'OPEN_VIDEO_RECORD_MODAL';
export const CLOSE_VIDEO_RECORD_MODAL = 'CLOSE_VIDEO_RECORD_MODAL';
export const openVideoRecordModal = (): IAction<undefined> => {
  return {
    type: OPEN_VIDEO_RECORD_MODAL,
    data: undefined,
  };
};
export const closeVideoRecordModal = (): IAction<undefined> => {
  return {
    type: CLOSE_VIDEO_RECORD_MODAL,
    data: undefined,
  };
};

export const getProfile = (userId: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetProfile,
      params: {
        userId,
      },
    })
      .then(res => {
        dispatch(receiveUserProfile(res));
      })
      .catch(err => {
        console.error(JSON.stringify(err, null, 2));
      });
  };
};
