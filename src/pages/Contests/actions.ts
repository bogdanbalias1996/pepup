import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction } from '../../coreTypes';
import { Contest, ContestResponseType } from './types';
import { openError, closeError } from '../ErrorModal/actions';
import { navigate } from '../../navigationService';
import { openAlert, closeAlert } from '../Alert/actions';

export const OPEN_CONTEST_MODAL = 'OPEN_CONTEST_MODAL';
export const CLOSE_CONTEST_MODAL = 'CLOSE_CONTEST_MODAL';
export const OPEN_CONTEST_TEST_MODAL = 'OPEN_CONTEST_TEST_MODAL';
export const CLOSE_CONTEST_TEST_MODAL = 'CLOSE_CONTEST_TEST_MODAL';

export const openContestModal = (): IAction<undefined> => {
  return {
    type: OPEN_CONTEST_MODAL,
    data: undefined
  };
};
export const closeContestModal = (): IAction<undefined> => {
  return {
    type: CLOSE_CONTEST_MODAL,
    data: undefined
  };
};

export const RECEIVE_ALL_CONTESTS = 'RECEIVE_ALL_CONTESTS';
export const receiveAllContests = (
  data: ContestResponseType
): IAction<ContestResponseType> => {
  return {
    type: RECEIVE_ALL_CONTESTS,
    data
  };
};

export const REQUEST_ALL_CONTESTS = 'REQUEST_ALL_CONTESTS';
export const requestAllContests = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_CONTESTS,
    data: undefined
  };
};

export const FAILURE_ALL_CONTESTS = 'FAILURE_ALL_CONTESTS';
export const failureAllContests = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_CONTESTS,
    data: undefined
  };
};

export const getContestsByCategory = (categoryId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllContests());

    request({
      operation: ApiOperation.GetContestsByCategory,
      params: {
        category: categoryId
      }
    })
      .then(res => {
        dispatch(
          receiveAllContests({
            categoryId,
            data: res
          })
        );

        if (!res.length) {
          dispatch(
            openError({
              type: 'noResults',
              onPress: () => {
                dispatch(getContestsByCategory(categoryId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureAllContests());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getContestsByCategory(categoryId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_CONTEST = 'RECEIVE_CONTEST';
export const receiveContest = (data: Contest): IAction<Contest> => {
  return {
    type: RECEIVE_CONTEST,
    data
  };
};

export const REQUEST_CONTEST = 'REQUEST_CONTEST';
export const requestContest = (): IAction<undefined> => {
  return {
    type: REQUEST_CONTEST,
    data: undefined
  };
};

export const FAILURE_CONTEST = 'FAILURE_CONTEST';
export const failureContest = (): IAction<undefined> => {
  return {
    type: FAILURE_CONTEST,
    data: undefined
  };
};

export const getContest = (contestId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestContest());
    request({
      operation: ApiOperation.GetContest,
      params: {
        contestId
      }
    })
      .then(res => {
        dispatch(receiveContest(res));
        if (Object.keys(res).length === 0) {
          dispatch(
            openError({
              type: 'itemUnavailable',
              onPress: () => {
                dispatch(getContest(contestId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureContest());
        dispatch(closeContestModal());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(closeError());
              dispatch(getContest(contestId) as any);
              navigate({ routeName: 'Main' });
            }
          })
        );
      });
  };
};

export const openContestQuizModal = (): IAction<undefined> => {
  return {
    type: OPEN_CONTEST_TEST_MODAL,
    data: undefined
  };
};
export const closeContestQuizModal = (): IAction<undefined> => {
  return {
    type: CLOSE_CONTEST_TEST_MODAL,
    data: undefined
  };
};

export const RECEIVE_SUBMIT_ENTRY = 'RECEIVE_SUBMIT_ENTRY';
export const receiveSubmitEntry = (data: any) => {
  return {
    type: RECEIVE_SUBMIT_ENTRY,
    data
  };
};

export const REQUEST_SUBMIT_ENTRY = 'REQUEST_SUBMIT_ENTRY';
export const requestSubmitEntry = (): IAction<undefined> => {
  return {
    type: REQUEST_SUBMIT_ENTRY,
    data: undefined
  };
};

export const FAILURE_SUBMIT_ENTRY = 'FAILURE_SUBMIT_ENTRY';
export const failureSubmitEntry = (): IAction<undefined> => {
  return {
    type: FAILURE_SUBMIT_ENTRY,
    data: undefined
  };
};

export const submitEnrty = (
  values: any,
  id: string,
  type: string,
  contestType: string
) => {
  const { media, ...rest } = values;
  const responses =
    contestType === 'PHOTO'
      ? Object.values(rest).map(answer => ({ question: answer }))
      : Object.keys(rest).map(key => ({
          question: key,
          selectedOption: rest[key]
        }));

  const getVariables = () => {
    if (contestType === 'PHOTO') {
      return {
        entry: JSON.stringify({ submissionEntry: { responses: responses } }),
        mediaData: {
          name: media[0].mediaItem.id,
          uri: media[0].mediaItem.uri
        },
        mediaType: type
      };
    } else {
      return {
        entry: JSON.stringify({ submissionEntry: { answers: responses } })
      };
    }
  };

  return (dispatch: Dispatch) => {
    dispatch(requestSubmitEntry());
    request({
      operation: ApiOperation.SubmitEntryContest,
      variables: getVariables(),
      params: {
        contestId: id
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch(receiveSubmitEntry(res));
        dispatch(
          openAlert({
            title: 'Entry Submitted',
            text:
              'Your entry to the contest has been submitted. Look out for further details in your email. ',
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closeContestQuizModal());
              dispatch(closeContestModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureSubmitEntry());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(submitEnrty(values, id, type, contestType) as any);
            }
          })
        );
      });
  };
};
