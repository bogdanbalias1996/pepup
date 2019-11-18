import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction, IGlobalState } from '../../coreTypes';
import { openError, closeError } from '../ErrorModal/actions';
import { openAlert, closeAlert } from '../Alert/actions';
import { closeVideoModal } from '../Pepups/actions';
import { navigate } from '../../navigationService';
import {
  videoRecordModalClose,
  videoRecordModalUpload
} from '../RecordVideo/actions';
import { Pepup, UserRequest, NotificationItem } from './types';

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const receiveUserProfile = (data: string): IAction<string> => ({
  type: RECEIVE_USER_PROFILE,
  data
});

export const initialLoadProfile = () => async (
  dispatch: Dispatch,
  getState: () => IGlobalState
) => {
  try {
    const handle = getState().LoginState.handle;

    const userProfile = await request({
      operation: ApiOperation.GetProfile,
      params: {
        handle
      }
    });

    dispatch(receiveUserProfile(userProfile));
  } catch (err) {}
};

export const getProfile = (handle: string) => async (dispatch: Dispatch) => {
  try {
    const userProfile = await request({
      operation: ApiOperation.GetProfile,
      params: {
        handle
      }
    });

    dispatch(receiveUserProfile(userProfile));
  } catch (err) {
    dispatch(
      openError({
        type: 'unknown',
        onPress: () => {
          dispatch(closeError());
          navigate({ routeName: 'Login' });
        }
      })
    );
  }
};

export const fulfillPepupRequest = (entityId: string, video: any) => {
  return (dispatch: Dispatch) => {
    const { uri, codec = 'mp4' } = video;
    const type = `video/${codec}`;

    dispatch(videoRecordModalUpload(true));
    request({
      operation: ApiOperation.FulfillRequestPepup,
      variables: {
        pepupId: entityId,
        video: {
          name: `pepup-${entityId}.mp4`,
          type,
          uri
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch(videoRecordModalUpload(false));
        dispatch(videoRecordModalClose());
        dispatch(
          openAlert({
            title: 'Pepup Sent',
            text: res.sharePublicly
              ? `This Pepup is now on it’s way to ${res.requestedByInfo.name}. It will also be featured on your page.`
              : `This Pepup is now on it’s way to ${res.requestedByInfo.name}. It won't be featured on your page.`,
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closeVideoModal());
            }
          })
        );
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2))
        dispatch(videoRecordModalUpload(false));
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(fulfillPepupRequest(entityId, video) as any);
            }
          })
        );
      });
  };
};

export const updateCelebIntroVideo = (celebId: string, video: any) => {
  return (dispatch: Dispatch) => {
    const { uri, codec = 'mp4' } = video;
    const type = `video/${codec}`;

    dispatch(videoRecordModalUpload(true));
    request({
      operation: ApiOperation.UpdateCelebIntroVideo,
      variables: {
        celebId,
        video: {
          name: `intro-video-${celebId}.mp4`,
          type,
          uri
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch(videoRecordModalUpload(false));
        dispatch(videoRecordModalClose());
        dispatch(
          openAlert({
            title: 'Changes saved',
            text: 'Updates to your profile have been saved.',
            onPress: () => {
              dispatch(closeAlert());
            }
          })
        );
      })
      .catch(err => {
        dispatch(videoRecordModalUpload(false));
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(fulfillPepupRequest(celebId, video) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_USER_PEPUPS = 'RECEIVE_USER_PEPUPS';
export const receiveUserPepups = (
  data: Array<Pepup>
): IAction<Array<Pepup>> => {
  return {
    type: RECEIVE_USER_PEPUPS,
    data
  };
};

export const REQUEST_USER_PEPUPS = 'REQUEST_USER_PEPUPS';
export const requestUserPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_USER_PEPUPS,
    data: undefined
  };
};

export const FAILURE_USER_PEPUPS = 'FAILURE_USER_PEPUPS';
export const failureUserPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_USER_PEPUPS,
    data: undefined
  };
};

export const getUserPepups = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestUserPepups());
    request({
      operation: ApiOperation.GetUserPepups,
      params: {
        userId
      }
    })
      .then(res => {
        dispatch(receiveUserPepups(res));
      })
      .catch(err => {
        dispatch(failureUserPepups());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getUserPepups(userId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_CELEB_PEPUPS = 'RECEIVE_CELEB_PEPUPS';
export const receiveCelebPepups = (
  data: Array<Pepup>
): IAction<Array<Pepup>> => {
  return {
    type: RECEIVE_CELEB_PEPUPS,
    data
  };
};

export const REQUEST_CELEB_PEPUPS = 'REQUEST_CELEB_PEPUPS';
export const requestCelebPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_CELEB_PEPUPS,
    data: undefined
  };
};

export const FAILURE_CELEB_PEPUPS = 'FAILURE_CELEB_PEPUPS';
export const failureCelebPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_CELEB_PEPUPS,
    data: undefined
  };
};

export const getCelebPepups = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestCelebPepups());
    request({
      operation: ApiOperation.GetCelebPepups,
      params: {
        userId
      }
    })
      .then(res => {
        dispatch(receiveCelebPepups(res));
      })
      .catch(err => {
        dispatch(failureCelebPepups());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getCelebPepups(userId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_ALL_PEPUPS = 'RECEIVE_ALL_PEPUPS';
export const receiveAllPepups = (data: Array<Pepup>): IAction<Array<Pepup>> => {
  return {
    type: RECEIVE_ALL_PEPUPS,
    data
  };
};

export const REQUEST_ALL_PEPUPS = 'REQUEST_ALL_PEPUPS';
export const requestAllPepups = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_PEPUPS,
    data: undefined
  };
};

export const FAILURE_ALL_PEPUPS = 'FAILURE_ALL_PEPUPS';
export const failureAllPepups = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_PEPUPS,
    data: undefined
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
      })
      .catch(err => {
        dispatch(failureAllPepups());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getAllPepups() as any);
            }
          })
        );
      });
  };
};

export const REQUEST_ACCEPT = 'REQUEST_ACCEPT';
export const requestAccept = (): IAction<undefined> => {
  return {
    type: REQUEST_ACCEPT,
    data: undefined
  };
};

export const RECEIVE_ACCEPT = 'RECEIVE_ACCEPT';
export const receiveAccept = (data: UserRequest): IAction<UserRequest> => {
  return {
    type: RECEIVE_ACCEPT,
    data
  };
};

export const FAILURE_ACCEPT = 'FAILURE_ACCEPT';
export const failureAccept = (): IAction<undefined> => {
  return {
    type: FAILURE_ACCEPT,
    data: undefined
  };
};

export const acceptPepupRequest = (pepupId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestAccept());
    request({
      operation: ApiOperation.AcceptRequest,
      params: {
        pepupId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveAccept(res));
        dispatch(
          openAlert({
            title: 'Request Accepted',
            text: `Yay! ${res.requestedByInfo.name} will be happy to receive the Pepup.`,
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closeNotifyModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureAccept());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(acceptPepupRequest(pepupId) as any);
            }
          })
        );
      });
  };
};

export const REQUEST_DENY = 'REQUEST_DENY';
export const requestDeny = (): IAction<undefined> => {
  return {
    type: REQUEST_DENY,
    data: undefined
  };
};

export const RECEIVE_DENY = 'RECEIVE_DENY';
export const receiveDeny = (data: UserRequest): IAction<UserRequest> => {
  return {
    type: RECEIVE_DENY,
    data
  };
};

export const FAILURE_DENY = 'FAILURE_DENY';
export const failureDeny = (): IAction<undefined> => {
  return {
    type: FAILURE_DENY,
    data: undefined
  };
};

export const denyPepupRequest = (pepupId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestDeny());
    request({
      operation: ApiOperation.DenyRequest,
      params: {
        pepupId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveDeny(res));
        dispatch(
          openAlert({
            title: 'Request Rejected',
            text: `Sorry to hear this! ${res.requestedByInfo.name} will be sad to know you won’t be able to complete the Pepup.`,
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closeNotifyModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureDeny());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(denyPepupRequest(pepupId) as any);
            }
          })
        );
      });
  };
};

export const OPEN_NOTIFY_MODAL = 'OPEN_NOTIFY_MODAL';
export const CLOSE_NOTIFY_MODAL = 'CLOSE_NOTIFY_MODAL';
export const openNotifyModal = (): IAction<undefined> => {
  return {
    type: OPEN_NOTIFY_MODAL,
    data: undefined
  };
};
export const closeNotifyModal = (): IAction<undefined> => {
  return {
    type: CLOSE_NOTIFY_MODAL,
    data: undefined
  };
};

export const RECEIVE_PEPUP_NOTIFICATION = 'RECEIVE_PEPUP_NOTIFICATION';
export const receivePepupNotification = (
  data: UserRequest
): IAction<UserRequest> => {
  return {
    type: RECEIVE_PEPUP_NOTIFICATION,
    data
  };
};

export const REQUEST_PEPUP_NOTIFICATION = 'REQUEST_PEPUP_NOTIFICATION';
export const requestPepupNotification = (): IAction<undefined> => {
  return {
    type: REQUEST_PEPUP_NOTIFICATION,
    data: undefined
  };
};

export const FAILURE_PEPUP_NOTIFICATION = 'FAILURE_PEPUP_NOTIFICATION';
export const failurePepupNotification = (): IAction<undefined> => {
  return {
    type: FAILURE_PEPUP_NOTIFICATION,
    data: undefined
  };
};

export const getPepupNotification = (pepupId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPepupNotification());
    request({
      operation: ApiOperation.GetPepupById,
      params: {
        pepupId
      }
    })
      .then(res => {
        dispatch(receivePepupNotification(res));
      })
      .catch(err => {
        dispatch(failurePepupNotification());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(closeError());
              dispatch(getPepupNotification(pepupId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
export const receiveNotifications = (
  data: Array<NotificationItem>
): IAction<Array<NotificationItem>> => {
  return {
    type: RECEIVE_NOTIFICATIONS,
    data
  };
};

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS';
export const requestNotifications = (): IAction<undefined> => {
  return {
    type: REQUEST_NOTIFICATIONS,
    data: undefined
  };
};

export const FAILURE_NOTIFICATIONS = 'FAILURE_NOTIFICATIONS';
export const failureNotifications = (): IAction<undefined> => {
  return {
    type: FAILURE_NOTIFICATIONS,
    data: undefined
  };
};

export const getNotifications = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestNotifications());
    request({
      operation: ApiOperation.GetNotifications
    })
      .then(res => {
        dispatch(receiveNotifications(res));
      })
      .catch(err => {
        dispatch(failureNotifications());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getNotifications() as any);
            }
          })
        );
      });
  };
};
