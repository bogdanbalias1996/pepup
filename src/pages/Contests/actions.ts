import { Dispatch } from 'redux'
import { ApiOperation } from '../../api/api'
import { request } from '../../api/network'
import { IAction } from '../../coreTypes'

export const OPEN_CONTEST_MODAL = "OPEN_CONTEST_MODAL";
export const CLOSE_CONTEST_MODAL = "CLOSE_CONTEST_MODAL";

export const openContestModal = ():IAction<undefined> => {
  return {
    type: OPEN_CONTEST_MODAL,
    data: undefined
  };
};
export const closeContestModal = ():IAction<undefined> => {
  return {
    type: CLOSE_CONTEST_MODAL,
    data: undefined
  };
};

export const RECEIVE_ALL_CONTESTS = "RECEIVE_ALL_CONTESTS";
export const receiveAllContests = (data): IAction<any> => {
  return {
    type: RECEIVE_ALL_CONTESTS,
    data: data
  };
};

export const getAllContests = () => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetAllContests,
    })
      .then(res => {
        dispatch(receiveAllContests(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};

export const RECEIVE_CONTEST = "RECEIVE_CONTEST";
export const receiveContest = (data): IAction<any> => {
  return {
    type: RECEIVE_CONTEST,
    data: data
  };
};

export const getContest = (contestId: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetContest,
      params: {
        contestId
      }
    })
      .then(res => {
        dispatch(receiveContest(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};
