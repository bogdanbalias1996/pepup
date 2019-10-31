import { IAction, IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { RequestPepupScreenFromData } from '../../components/ModalPepupReq';
import { getStore } from '../../configureStore';
import { Review, Category, Celeb, CelebsResponseType } from '.';
import { PostReviewFormProps } from '../../components/ModalReviewForm';
import { openAlert, closeAlert } from '../Alert/actions';
import { openError, closeError } from '../ErrorModal/actions';
import { navigate } from '../../navigationService';
import { UserRequest } from '../Profile';


export const OPEN_PEPUP_MODAL = "OPEN_PEPUP_MODAL";
export const openPepupModal = (): IAction<undefined> => {
  return {
    type: OPEN_PEPUP_MODAL,
    data: undefined
  };
};

export const CLOSE_PEPUP_MODAL = "CLOSE_PEPUP_MODAL";
export const closePepupModal = (): IAction<undefined> => {
  return {
    type: CLOSE_PEPUP_MODAL,
    data: undefined
  };
};

export const OPEN_PEPUP_REQ_MODAL = "OPEN_PEPUP_REQ_MODAL";
export const openPepupReqModal = (): IAction<undefined> => {
  return {
    type: OPEN_PEPUP_REQ_MODAL,
    data: undefined
  };
};

export const CLOSE_PEPUP_REQ_MODAL = "CLOSE_PEPUP_REQ_MODAL";
export const closePepupReqModal = (): IAction<undefined> => {
  return {
    type: CLOSE_PEPUP_REQ_MODAL,
    data: undefined
  };
};

export const RECEIVE_ALL_ACTIVE_CATEGORIES = "RECEIVE_ALL_ACTIVE_CATEGORIES";
export const receiveAllActiveCategories = (data: Array<Category>): IAction<Array<Category>> => {
  return {
    type: RECEIVE_ALL_ACTIVE_CATEGORIES,
    data
  };
};


export const REQUEST_ALL_ACTIVE_CATEGORIES = "REQUEST_ALL_ACTIVE_CATEGORIES";
export const requestAllActiveCategories = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_ACTIVE_CATEGORIES,
    data: undefined
  };
};


export const FAILURE_ALL_ACTIVE_CATEGORIES = "FAILURE_ALL_ACTIVE_CATEGORIES";
export const failureAllActiveCategories = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_ACTIVE_CATEGORIES,
    data: undefined
  };
};

export const getAllActiveCategories = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllActiveCategories());
    request({
      operation: ApiOperation.GetAllActiveCategories
    })
      .then(res => {
        dispatch(receiveAllActiveCategories(res));
      })
      .catch(err => {
        dispatch(failureAllActiveCategories());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getAllActiveCategories() as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_CELEBS_BY_CATEGORY = 'RECEIVE_CELEBS_BY_CATEGORY';
export const receiveCelebsByCategory = (
  data: CelebsResponseType
): IAction<CelebsResponseType> => {
  return {
    type: RECEIVE_CELEBS_BY_CATEGORY,
    data
  };
};

export const REQUEST_CELEBS_BY_CATEGORY = 'REQUEST_CELEBS_BY_CATEGORY';
export const requestCelebsByCategory = (): IAction<undefined> => {
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
    dispatch(requestCelebsByCategory());
    request({
      operation: ApiOperation.GetCelebsByCategory,
      params: {
        categoryId
      }
    })
      .then(res => {
        dispatch(receiveCelebsByCategory({
          categoryId,
          data: res
        }));
        if (!res.length) {
          dispatch(
            openError({
              type: 'noResults',
              onPress: () => {
                dispatch(getCelebsByCategory(categoryId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureCelebsByCategory());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getCelebsByCategory(categoryId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_CELEB = 'RECEIVE_CELEB';
export const receiveCeleb = (data: Celeb): IAction<Celeb> => {
  return {
    type: RECEIVE_CELEB,
    data
  };
};

export const REQUEST_CELEB = 'REQUEST_CELEB';
export const requestCeleb = (): IAction<undefined> => {
  return {
    type: REQUEST_CELEB,
    data: undefined
  };
};

export const FAILURE_CELEB = 'FAILURE_CELEB';
export const failureCeleb = (): IAction<undefined> => {
  return {
    type: FAILURE_CELEB,
    data: undefined
  };
};

export const getCeleb = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestCeleb());
    request({
      operation: ApiOperation.GetCelebById,
      params: {
        userId
      }
    })
      .then(res => {
        dispatch(receiveCeleb(res));
        if (Object.keys(res).length === 0) {
          dispatch(
            openError({
              type: 'itemUnavailable',
              onPress: () => {
                dispatch(getCeleb(userId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureCeleb());
        dispatch(closePepupModal());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(closeError());
              dispatch(getCeleb(userId) as any);
              navigate({ routeName: 'Main' });
            }
          })
        );
      });
  };
};

export const REQUEST_PEPUP = 'REQUEST_PEPUP';
export const requestPepup = (): IAction<undefined> => {
  return {
    type: REQUEST_PEPUP,
    data: undefined
  };
};

export const RECEIVE_PEPUP = 'RECEIVE_PEPUP';
export const receivePepup = (data:string): IAction<string> => {
  return {
    type: RECEIVE_PEPUP,
    data
  };
};

export const FAILURE_REQ_PEPUP = 'FAILURE_REQ_PEPUP';
export const failureReqPepup = (): IAction<undefined> => {
  return {
    type: FAILURE_REQ_PEPUP,
    data: undefined
  };
};

export const sendRequestForPepup = (
  payload: RequestPepupScreenFromData,
  setErrors: any
) => {
  return (dispatch: Dispatch) => {
    const { name, text, shareCheckbox } = payload;
    const store = getStore().getState().PepupState;
    const { selectedCategory } = store;
    const userId = store.celebData.mappedUserId;

    dispatch(requestPepup());
    request({
      operation: ApiOperation.RequestPepup,
      variables: {
        requestedFor: name,
        request: text,
        requestedOf: userId,
        category: selectedCategory,
        share: shareCheckbox
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receivePepup(res));
        dispatch(
          openAlert({
            title: 'Request Submitted',
            text:
              'Awesome! Your Pepup should be ready in less than 7 days. Track status in your Profile, under My Requests.',
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closePepupReqModal());
              dispatch(closePepupModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureReqPepup());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(sendRequestForPepup(payload, setErrors) as any);
            }
          })
        );
        const {
          error = 'Please fill the fields correctly'
        } = err.response.body;
        setErrors({
          request: error,
          requestedFor: error
        });
      });
  };
};

export const SET_CATEGORY = 'SET_CATEGORY';
export const setCategory = (data: string): IAction<string> => {
  return {
    type: SET_CATEGORY,
    data
  };
};

export const OPEN_VIDEO_MODAL = 'OPEN_VIDEO_MODAL';
export const openVideoModal = (data: string): IAction<string> => {
  return {
    type: OPEN_VIDEO_MODAL,
    data
  };
};

export const CLOSE_VIDEO_MODAL = 'CLOSE_VIDEO_MODAL';
export const closeVideoModal = (): IAction<undefined> => {
  return {
    type: CLOSE_VIDEO_MODAL,
    data: undefined
  };
};

export const OPEN_REVIEWS_MODAL = 'OPEN_REVIEWS_MODAL';
export const openReviewsModal = (): IAction<undefined> => {
  return {
    type: OPEN_REVIEWS_MODAL,
    data: undefined
  };
};

export const CLOSE_REVIEWS_MODAL = 'CLOSE_REVIEWS_MODAL';
export const closeReviewsModal = (): IAction<undefined> => {
  return {
    type: CLOSE_REVIEWS_MODAL,
    data: undefined
  };
};

export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const receiveAllReviews = (data: Review): IAction<Review> => {
  return {
    type: RECEIVE_ALL_REVIEWS,
    data
  };
};

export const REQUEST_ALL_REVIEWS = 'REQUEST_ALL_REVIEWS';
export const requestAllReviews = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_REVIEWS,
    data: undefined
  };
};

export const FAILURE_ALL_REVIEWS = 'FAILURE_ALL_REVIEWS';
export const failureAllReviews = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_REVIEWS,
    data: undefined
  };
};

export const getAllReviews = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllReviews());
    request({
      operation: ApiOperation.GetAllReviews,
      params: {
        userId
      }
    })
      .then(res => {
        dispatch(receiveAllReviews(res));
        if (!res.length) {
          dispatch(
            openError({
              type: 'noResults',
              onPress: () => {
                dispatch(getAllReviews(userId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureAllReviews());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getAllReviews(userId) as any);
            }
          })
        );
      });
  };
};

export const OPEN_POST_REVIEW_MODAL = 'OPEN_POST_REVIEW_MODAL';
export const openPostReviewModal = (): IAction<undefined> => {
  return {
    type: OPEN_POST_REVIEW_MODAL,
    data: undefined
  };
};

export const CLOSE_POST_REVIEW_MODAL = 'CLOSE_POST_REVIEW_MODAL';
export const closePostReviewModal = (): IAction<undefined> => {
  return {
    type: CLOSE_POST_REVIEW_MODAL,
    data: undefined
  };
};

export const REQUEST_REVIEW = 'REQUEST_REVIEW';
export const requestReview = (): IAction<undefined> => {
  return {
    type: REQUEST_REVIEW,
    data: undefined
  };
};

export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const receiveReview = (): IAction<undefined> => {
  return {
    type: RECEIVE_REVIEW,
    data: undefined
  };
};

export const FAILURE_REVIEW = 'FAILURE_REVIEW';
export const failureReview = (): IAction<undefined> => {
  return {
    type: FAILURE_REVIEW,
    data: undefined
  };
};

export const postReview = (payload: PostReviewFormProps, setErrors: any) => {
  return (dispatch: Dispatch, getState: () => IGlobalState) => {
    const { review, rating } = payload;
    const store = getState().PepupState;
    const userId = store.celebData.userInfo.id;

    dispatch(requestReview());
    request({
      operation: ApiOperation.PostReview,
      variables: {
        review,
        rating,
        celebId: userId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveReview());
        dispatch(
          openAlert({
            title: 'Review Submitted',
            text:
              'Thanks for your review. Your review will be featured on PV Sindhu’s page. How exciting!',
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closePostReviewModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureReview());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(postReview(payload, setErrors) as any);
            }
          })
        );
        const {
          error = 'Please fill review form and rate celebrity'
        } = err.response.body;
        setErrors({
          review: error,
          rating: error
        });
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
export const receivePepupNotification = (data: UserRequest): IAction<UserRequest> => {
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
        console.log(JSON.stringify(err,null, 2));
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

export const FAILURE_FEATURED_CELEBS = 'FAILURE_FEATURED_CELEBS';
export const failureFeaturedCelebs = (): IAction<any> => {
  return {
    type: FAILURE_FEATURED_CELEBS,
    data: undefined
  };
};

export const getFeaturedCelebs = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestCelebsByCategory());

    request({
      operation: ApiOperation.GetFeaturedCelebs
    })
      .then(res => {
        dispatch(receiveCelebsByCategory({
          categoryId: 'featured',
          data: res
        }));
        if (!res.length) {
          dispatch(
            openError({
              type: 'noResults',
              onPress: () => {
                dispatch(getFeaturedCelebs() as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureFeaturedCelebs());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getFeaturedCelebs() as any);
            }
          })
        );
      });
  };
};
