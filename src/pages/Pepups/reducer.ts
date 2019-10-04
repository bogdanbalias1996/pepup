import { IAction } from "../../coreTypes";
import {
  OPEN_PEPUP_MODAL,
  CLOSE_PEPUP_MODAL,
  OPEN_PEPUP_REQ_MODAL,
  CLOSE_PEPUP_REQ_MODAL,
  RECEIVE_ALL_ACTIVE_CATEGORIES,
  RECEIVE_CELEBS_BY_CATEGORY,
  RECEIVE_CELEB,
  RECEIVE_PEPUP,
  REQUEST_PEPUP,
  FAILURE_REQ_PEPUP,
  REQUEST_CELEBS_BY_CATEGORY,
  FAILURE_CELEBS_BY_CATEGORY,
  SET_CATEGORY,
  OPEN_VIDEO_MODAL,
  CLOSE_VIDEO_MODAL
} from "./actions";
import { Category, Celeb } from ".";

export class PepupState {
  showModal: boolean;
  showModalReq: boolean;
  isVideoModalShown: boolean;
  categories: Array<Category>;
  celebs: Array<Celeb>;
  celebData: Celeb | null;
  isFetching: boolean;
  selectedCategory: string;

  constructor() {
    this.showModal = false;
    this.showModalReq = false;
    this.categories = [];
    this.celebs = [];
    this.celebData = null;
    this.isFetching = false;
    this.selectedCategory = '';
    this.isVideoModalShown = false;
  }
}

export const initialState = new PepupState();

export const PepupReducer = (
  state: PepupState = initialState,
  action: IAction<any>
): PepupState => {
  switch (action.type) {
    case OPEN_PEPUP_MODAL:
      return {
        ...state,
        showModal: true
      };
    case CLOSE_PEPUP_MODAL:
      return {
        ...state,
        showModal: false
      };
    case OPEN_PEPUP_REQ_MODAL:
      return {
        ...state,
        showModalReq: true
      };
    case CLOSE_PEPUP_REQ_MODAL:
      return {
        ...state,
        showModalReq: false
      };
    case RECEIVE_ALL_ACTIVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    case RECEIVE_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: false,
        celebs: action.data
      }
    case REQUEST_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: true
      }
    case FAILURE_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: false
      }
    case RECEIVE_CELEB:
      return {
        ...state,
        celebData: action.data
      }
    case RECEIVE_PEPUP:
      return {
        ...state,
        isFetching: false,
        showModalReq: false,
        showModal: false
      }
    case REQUEST_PEPUP:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_REQ_PEPUP:
      return {
        ...state,
        isFetching: false
      };
    case SET_CATEGORY:  
      return {
        ...state,
        selectedCategory: action.data
      }
    case OPEN_VIDEO_MODAL:
      return {
        ...state,
        isVideoModalShown: true
      };
    case CLOSE_VIDEO_MODAL:
      return {
        ...state,
        isVideoModalShown: false
      };
    default:
      return state;
  }
};
