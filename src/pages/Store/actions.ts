import { IAction } from "../../coreTypes";

export const OPEN_STORE_MODAL = "OPEN_STORE_MODAL";
export const CLOSE_STORE_MODAL = "CLOSE_STORE_MODAL";
export const SET_FILTER_VALUE = "SET_FILTER_VALUE";

export const openStoreModal = ():IAction<undefined> => {
  return {
    type: OPEN_STORE_MODAL,
    data: undefined
  };
};
export const closeStoreModal = ():IAction<undefined> => {
  return {
    type: CLOSE_STORE_MODAL,
    data: undefined
  };
};
export const setFilterValue = data => {
  return {
    type: SET_FILTER_VALUE,
    data
  };
};
