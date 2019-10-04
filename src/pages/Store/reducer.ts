import { IAction } from "../../coreTypes";
import {
  OPEN_STORE_MODAL,
  CLOSE_STORE_MODAL,
  SET_FILTER_VALUE
} from "./actions";

export class StoreState {
  showModal: boolean;
  filterValue: any;

  constructor() {
    this.showModal = false;
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
        showModal: true
      };
    case CLOSE_STORE_MODAL:
      return {
        ...state,
        showModal: false
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
