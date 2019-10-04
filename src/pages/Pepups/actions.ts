import { IAction } from "../../coreTypes";
import { Dispatch } from "redux";
import { ApiOperation } from "../../api/api";
import { request } from "../../api/network";
import { RequestPepupProps } from "../../components/ModalPepupReq";
import { navigate } from "../../navigationService";
import { getStore } from '../../configureStore';

export const OPEN_PEPUP_MODAL = "OPEN_PEPUP_MODAL";
export const CLOSE_PEPUP_MODAL = "CLOSE_PEPUP_MODAL";
export const OPEN_PEPUP_REQ_MODAL = "OPEN_PEPUP_REQ_MODAL";
export const CLOSE_PEPUP_REQ_MODAL = "CLOSE_PEPUP_REQ_MODAL";

export const openPepupModal = (): IAction<undefined> => {
  return {
    type: OPEN_PEPUP_MODAL,
    data: undefined
  };
};
export const closePepupModal = (): IAction<undefined> => {
  return {
    type: CLOSE_PEPUP_MODAL,
    data: undefined
  };
};
export const openPepupReqModal = (): IAction<undefined> => {
  return {
    type: OPEN_PEPUP_REQ_MODAL,
    data: undefined
  };
};
export const closePepupReqModal = (): IAction<undefined> => {
  return {
    type: CLOSE_PEPUP_REQ_MODAL,
    data: undefined
  };
};
export const RECEIVE_ALL_ACTIVE_CATEGORIES = "RECEIVE_ALL_ACTIVE_CATEGORIES";
export const receiveAllActiveCategories = (data): IAction<any> => {
  return {
    type: RECEIVE_ALL_ACTIVE_CATEGORIES,
    data: data
  };
};

export const getAllActiveCategories = () => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetAllActiveCategories
    })
      .then(res => {
        dispatch(receiveAllActiveCategories(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};

export const RECEIVE_CELEBS_BY_CATEGORY = 'RECEIVE_CELEBS_BY_CATEGORY';
export const receiveCelebsByCategory = (data): IAction<any> => {
  return {
    type: RECEIVE_CELEBS_BY_CATEGORY,
    data: data
  };
};

export const REQUEST_CELEBS_BY_CATEGORY = 'REQUEST_CELEBS_BY_CATEGORY';
export const requestCelebsByCategory = (): IAction<any> => {
  return {
    type: REQUEST_CELEBS_BY_CATEGORY,
    data: undefined
  };
};

export const FAILURE_CELEBS_BY_CATEGORY = 'FAILURE_CELEBS_BY_CATEGORY';
export const failureCelebsByCategory = (): IAction<any> => {
  return {
    type: FAILURE_CELEBS_BY_CATEGORY,
    data: undefined
  };
};

export const getCelebsByCategory = (categoryId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestCelebsByCategory())
    request({
      operation: ApiOperation.GetCelebsByCategory,
      params: {
        categoryId
      }
    })
      .then(res => {
        dispatch(receiveCelebsByCategory(res));
      })
      .catch(err => {
        dispatch(failureCelebsByCategory())
        console.log(JSON.stringify(err, null, 2));
      });
  };
};

export const RECEIVE_CELEB = "RECEIVE_CELEB";
export const receiveCeleb = (data): IAction<any> => {
  return {
    type: RECEIVE_CELEB,
    data: data
  };
};

export const getCeleb = (celebId: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetCelebById,
      params: {
        celebId
      }
    })
      .then(res => {
        dispatch(receiveCeleb(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};

export const REQUEST_PEPUP = "REQUEST_PEPUP";
export const requestPepup = (): IAction<undefined> => {
  return {
    type: REQUEST_PEPUP,
    data: undefined
  };
};

export const RECEIVE_PEPUP = "RECEIVE_PEPUP";
export const receivePepup = (): IAction<undefined> => {
  return {
    type: RECEIVE_PEPUP,
    data: undefined
  };
};

export const FAILURE_REQ_PEPUP = "FAILURE_REQ_PEPUP";
export const failureReqPepup = (): IAction<undefined> => {
  return {
    type: FAILURE_REQ_PEPUP,
    data: undefined
  };
};

export const sendRequestForPepup = (payload: RequestPepupProps, setErrors: any) => {
  return (dispatch: Dispatch) => {
    const { name, text, shareCheckbox } = payload;
    const store = getStore().getState().PepupState;
    const { selectedCategory } = store;
    const celebId = store.celebData.id;

    // Temporary solution for tracking error states
    const headers = name ? null : { 'Prefer': 'status=400' }
    dispatch(requestPepup());
    request({
      operation: ApiOperation.RequestPepup,
      variables: {
        requestedFor: name,
        request: text,
        requestedOf: celebId,
        category: selectedCategory,
        share: shareCheckbox
      },
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => {
        dispatch(receivePepup());
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2))
        dispatch(failureReqPepup());
        const { error = 'Please fill the fields correctly' } = err.response.body
        setErrors({
          'request': error,
          'requestedFor': error
        })
      })
  }
}

export const SET_CATEGORY = "SET_CATEGORY";
export const setCategory = (data): IAction<any> => {
  return {
    type: SET_CATEGORY,
    data
  };
};

export const OPEN_VIDEO_MODAL = 'OPEN_VIDEO_MODAL';
export const CLOSE_VIDEO_MODAL = 'CLOSE_VIDEO_MODAL';
export const openVideoModal = (): IAction<undefined> => {
  return {
    type: OPEN_VIDEO_MODAL,
    data: undefined
  };
};
export const closeVideoModal = (): IAction<undefined> => {
  return {
    type: CLOSE_VIDEO_MODAL,
    data: undefined
  };
};
