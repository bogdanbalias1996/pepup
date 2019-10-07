import { IAction } from "../../coreTypes";
import {
  OPEN_STORE_MODAL,
  CLOSE_STORE_MODAL,
  SET_FILTER_VALUE
} from "./actions";

export class StoreState {
  isModalShown: boolean;
  filterValue: any;

  constructor() {
    this.isModalShown = false;
    this.filterValue = { key: "1", text: "All" };
  }
}

export const initialState = new StoreState();

export const StoreReducer = (
  state: StoreState = initialState,
  action: IAction<any>
): StoreState => {
  switch (action.type) {
    case OPEN_STORE_MODAL:
      return {
        ...state,
        isModalShown: true
      };
    case CLOSE_STORE_MODAL:
      return {
        ...state,
        isModalShown: false
      };
    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.data
      };
    default:
      return state;
  }
};
