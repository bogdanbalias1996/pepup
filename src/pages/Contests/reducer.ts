import { IAction } from "../../coreTypes";
import { OPEN_CONTEST_MODAL, CLOSE_CONTEST_MODAL, RECEIVE_ALL_CONTESTS, RECEIVE_CONTEST } from "./actions";
import { Contest } from ".";

export class ContestState {
  showModal: boolean;
  contests: Array<Contest>;
  contestData: Contest | null;

  constructor() {
    this.showModal = false;
    this.contests = [];
    this.contestData = null;
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
        showModal: true
      };
    case CLOSE_CONTEST_MODAL:
      return {
        ...state,
        showModal: false
      };
    case RECEIVE_ALL_CONTESTS:
      return {
        ...state,
        contests: action.data
      };
    case RECEIVE_CONTEST:
      return {
        ...state,
        contestData: action.data
      }
    default:
      return state;
  }
};
