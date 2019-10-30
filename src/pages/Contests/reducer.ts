import { IAction } from '../../coreTypes';
import {
  OPEN_CONTEST_MODAL,
  CLOSE_CONTEST_MODAL,
  RECEIVE_ALL_CONTESTS,
  RECEIVE_CONTEST,
  OPEN_CONTEST_TEST_MODAL,
  CLOSE_CONTEST_TEST_MODAL,
  REQUEST_ALL_CONTESTS,
  FAILURE_ALL_CONTESTS,
  REQUEST_CONTEST,
  FAILURE_CONTEST,
  RECEIVE_SUBMIT_ENTRY,
  REQUEST_SUBMIT_ENTRY,
  FAILURE_SUBMIT_ENTRY
} from './actions';
import { Contest } from '.';
import { BlockOverflowProperty } from 'csstype';

export class ContestState {
  isModalShown: boolean;
  isModalTestShown: boolean;
  contests: Array<Contest>;
  contestData: Contest | null;
  isFetching: boolean;
  isFetchingContest: boolean;
  submitEntryData: any;

  constructor() {
    this.isModalShown = false;
    this.contests = [];
    this.contestData = null;
    this.isModalTestShown = false;
    this.isFetching = false;
    this.isFetchingContest = false;
    this.submitEntryData = {};
  }
}

export const initialState = new ContestState();

export const ContestReducer = (
  state: ContestState = initialState,
  action: IAction<any>
): ContestState => {
  switch (action.type) {
    case OPEN_CONTEST_MODAL:
      return {
        ...state,
        isModalShown: true
      };
    case CLOSE_CONTEST_MODAL:
      return {
        ...state,
        isModalShown: false
      };
    case REQUEST_ALL_CONTESTS:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_ALL_CONTESTS:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_ALL_CONTESTS:
      return {
        ...state,
        contests: {
          ...state.contests,
          [action.data.categoryId as string]: action.data.data
        },
        isFetching: false
      };
    case RECEIVE_CONTEST:
      return {
        ...state,
        contestData: action.data,
        isFetchingContest: false
      };
    case REQUEST_CONTEST:
      return {
        ...state,
        isFetchingContest: true
      };
    case FAILURE_CONTEST:
      return {
        ...state,
        isFetchingContest: false
      };
    case OPEN_CONTEST_TEST_MODAL:
      return {
        ...state,
        isModalTestShown: true
      };
    case CLOSE_CONTEST_TEST_MODAL:
      return {
        ...state,
        isModalTestShown: false
      };
    case REQUEST_SUBMIT_ENTRY:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_SUBMIT_ENTRY:
      return {
        ...state,
        isFetching: false,
        submitEntryData: action.data
      };
    case FAILURE_SUBMIT_ENTRY:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
