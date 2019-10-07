import { IAction } from "../../coreTypes";
import { OPEN_CONTEST_MODAL, CLOSE_CONTEST_MODAL, RECEIVE_ALL_CONTESTS, RECEIVE_CONTEST, OPEN_CONTEST_TEST_MODAL, CLOSE_CONTEST_TEST_MODAL, REQUEST_ALL_CONTESTS, FAILURE_ALL_CONTESTS, REQUEST_CONTEST, FAILURE_CONTEST } from "./actions";
import { Contest } from ".";

export class ContestState {
  isModalShown: boolean;
  isModalTestShown: boolean;
  contests: Array<Contest>;
  contestData: Contest | null;
  isFetching: boolean;

  constructor() {
    this.isModalShown = false;
    this.contests = [];
    this.contestData = null;
    this.isModalTestShown = false;
    this.isFetching = false;
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
        contests: action.data,
        isFetching: false
      };
    case RECEIVE_CONTEST:
      return {
        ...state,
        contestData: action.data,
        isFetching: false
      }
    case REQUEST_CONTEST:
      return {
        ...state,
        isFetching: true
      }
    case FAILURE_CONTEST:
      return {
        ...state,
        isFetching: false
      }
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
    default:
      return state;
  }
};
