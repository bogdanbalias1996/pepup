import { Dispatch } from 'redux'
import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { IAction } from '../../coreTypes'
import { Contest } from '.';
import { openError, closeError } from '../ErrorModal/actions';
import { navigate } from '../../navigationService';

export const OPEN_CONTEST_MODAL = "OPEN_CONTEST_MODAL";
export const CLOSE_CONTEST_MODAL = "CLOSE_CONTEST_MODAL";
export const OPEN_CONTEST_TEST_MODAL = "OPEN_CONTEST_TEST_MODAL";
export const CLOSE_CONTEST_TEST_MODAL = "CLOSE_CONTEST_TEST_MODAL";

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

export const RECEIVE_ALL_CONTESTS = "RECEIVE_ALL_CONTESTS";
export const receiveAllContests = (data:Array<Contest>): IAction<Array<Contest>> => {
  return {
    type: RECEIVE_ALL_CONTESTS,
    data
  };
};

export const REQUEST_ALL_CONTESTS = "REQUEST_ALL_CONTESTS";
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

export const getAllContests = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllContests());
    request({
      operation: ApiOperation.GetAllContests,
    })
      .then(res => {
        dispatch(receiveAllContests(res));
        if (!res.length) {
          dispatch(openError({
            type: 'noResults',
            onPress: () => { dispatch(getAllContests() as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureAllContests());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getAllContests() as any) }
        }))
      });
  };
};

export const RECEIVE_CONTEST = "RECEIVE_CONTEST";
export const receiveContest = (data: Contest): IAction<Contest> => {
  return {
    type: RECEIVE_CONTEST,
    data
  };
};

export const REQUEST_CONTEST = "REQUEST_CONTEST";
export const requestContest = (): IAction<undefined> => {
  return {
    type: REQUEST_CONTEST,
    data: undefined
  };
};

export const FAILURE_CONTEST = "FAILURE_CONTEST";
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
        if (res = {}) {
          dispatch(openError({
            type: 'itemUnavailable',
            onPress: () => { dispatch(getContest(contestId) as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureContest());
        dispatch(openError({
          type: 'unknown',
          onPress: () => {
            dispatch(closeError());
            dispatch(closeContestModal());
            navigate({ routeName: 'Main' });
          }
        }))
      });
  };
};

export const openContestTestModal = (): IAction<undefined> => {
  return {
    type: OPEN_CONTEST_TEST_MODAL,
    data: undefined
  };
};
export const closeContestTestModal = (): IAction<undefined> => {
  return {
    type: CLOSE_CONTEST_TEST_MODAL,
    data: undefined
  };
};
