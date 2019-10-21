import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction } from '../../coreTypes';
import { openError } from '../ErrorModal/actions';

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const receiveUserProfile = (data: string): IAction<string> => {
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

export const getProfile = (handle: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetProfile,
      params: {
        handle,
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

export const fulfillPepupRequest = (video: any) => {
  return (dispatch: Dispatch) => {
    const { uri, codec = 'mp4' } = video;
    request({
      operation: ApiOperation.FulfillRequestPepup,
      variables: {
        pepupId: '4dfbfa42-9728-4c33-ac9c-dd52c4ea79df',
        video: {
          name: 'videoForPepupRequest',
          type: `video/${codec}`,
          uri
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(`SUCCESS VIDEO`)
      })
      .catch(err => {
        console.log(`ERROR VIDEO: `, err)
        console.error(JSON.stringify(err, null, 2));
      });
  }
}

export const RECEIVE_USER_PEPUPS = 'RECEIVE_USER_PEPUPS';
export const receiveUserPepups = (data: Array<any>): IAction<Array<any>> => {
  return {
    type: RECEIVE_USER_PEPUPS,
    data,
  };
};

export const REQUEST_USER_PEPUPS = 'REQUEST_USER_PEPUPS';
export const requestUserPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_USER_PEPUPS,
    data: undefined,
  };
};

export const FAILURE_USER_PEPUPS = 'FAILURE_USER_PEPUPS';
export const failureUserPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_USER_PEPUPS,
    data: undefined,
  };
};

export const getUserPepups = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestUserPepups());
    request({
      operation: ApiOperation.GetUserPepups,
      params: {
        userId,
      },
    })
      .then(res => {
        dispatch(receiveUserPepups(res));
        if(!res.length) {
          dispatch(openError({
            type: 'noResults',
            onPress: () => { dispatch(getAllPepups() as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureUserPepups());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getUserPepups(userId) as any) }
        }))
      });
  };
};

export const RECEIVE_CELEB_PEPUPS = 'RECEIVE_CELEB_PEPUPS';
export const receiveCelebPepups = (data: Array<any>): IAction<Array<any>> => {
  return {
    type: RECEIVE_CELEB_PEPUPS,
    data,
  };
};

export const REQUEST_CELEB_PEPUPS = 'REQUEST_CELEB_PEPUPS';
export const requestCelebPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_CELEB_PEPUPS,
    data: undefined,
  };
};

export const FAILURE_CELEB_PEPUPS = 'FAILURE_CELEB_PEPUPS';
export const failureCelebPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_CELEB_PEPUPS,
    data: undefined,
  };
};

export const getCelebPepups = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestCelebPepups());
    request({
      operation: ApiOperation.GetCelebPepups,
      params: {
        userId,
      },
    })
      .then(res => {
        dispatch(receiveCelebPepups(res));
        if(!res.length) {
          dispatch(openError({
            type: 'noResults',
            onPress: () => { dispatch(getAllPepups() as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureCelebPepups());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getCelebPepups(userId) as any) }
        }))
      });
  };
};

export const RECEIVE_ALL_PEPUPS = 'RECEIVE_ALL_PEPUPS';
export const receiveAllPepups = (data: Array<any>): IAction<Array<any>> => {
  return {
    type: RECEIVE_ALL_PEPUPS,
    data,
  };
};

export const REQUEST_ALL_PEPUPS = 'REQUEST_ALL_PEPUPS';
export const requestAllPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_PEPUPS,
    data: undefined,
  };
};

export const FAILURE_ALL_PEPUPS = 'FAILURE_ALL_PEPUPS';
export const failureAllPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_PEPUPS,
    data: undefined,
  };
};

export const getAllPepups = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllPepups());
    request({
      operation: ApiOperation.GetAllPepups
    })
      .then(res => {
        dispatch(receiveAllPepups(res));
        if(!res.length) {
          dispatch(openError({
            type: 'noResults',
            onPress: () => { dispatch(getAllPepups() as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureAllPepups());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getAllPepups() as any) }
        }))
      });
  };
};
