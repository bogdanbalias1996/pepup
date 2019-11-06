import { IAction } from '../../coreTypes';
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
  CLOSE_VIDEO_MODAL,
  OPEN_REVIEWS_MODAL,
  CLOSE_REVIEWS_MODAL,
  RECEIVE_ALL_REVIEWS,
  REQUEST_ALL_REVIEWS,
  FAILURE_ALL_REVIEWS,
  OPEN_POST_REVIEW_MODAL,
  CLOSE_POST_REVIEW_MODAL,
  RECEIVE_REVIEW,
  REQUEST_REVIEW,
  FAILURE_REVIEW,
  REQUEST_ALL_ACTIVE_CATEGORIES,
  FAILURE_ALL_ACTIVE_CATEGORIES,
  REQUEST_CELEB,
  FAILURE_CELEB,
  FAILURE_FEATURED_CELEBS
} from './actions';
import { Category, Celeb, Review } from '.';
import { UserRequest } from '../Profile';

export class PepupState {
  isModalShown: boolean;
  isModalReqShown: boolean;
  isVideoModalShown: boolean;
  categories: Array<Category>;
  celebs: { [key: string]: Celeb };
  celebData: Celeb | null;
  isFetching: boolean;
  isFetchingCat: boolean;
  isFetchingCeleb: boolean;
  selectedCategory: string;
  isModalReviewShown: boolean;
  reviews: Array<Review>;
  isModalPostReviewShown: boolean;
  videoUrl: string;

  constructor() {
    this.isModalShown = false;
    this.isModalReqShown = false;
    this.categories = [];
    this.celebs = {};
    this.celebData = null;
    this.isFetching = false;
    this.isFetchingCat = false;
    this.isFetchingCeleb = false;
    this.selectedCategory = '';
    this.isVideoModalShown = false;
    this.isModalReviewShown = false;
    this.reviews = [];
    this.isModalPostReviewShown = false;
    this.videoUrl = '';
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
        isModalShown: true
      };
    case CLOSE_PEPUP_MODAL:
      return {
        ...state,
        isModalShown: false
      };
    case OPEN_PEPUP_REQ_MODAL:
      return {
        ...state,
        isModalReqShown: true
      };
    case CLOSE_PEPUP_REQ_MODAL:
      return {
        ...state,
        isModalReqShown: false
      };
    case RECEIVE_ALL_ACTIVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
        isFetchingCat: false
      };
    case REQUEST_ALL_ACTIVE_CATEGORIES:
      return {
        ...state,
        isFetchingCat: true
      };
    case FAILURE_ALL_ACTIVE_CATEGORIES:
      return {
        ...state,
        isFetchingCat: false
      };
    case RECEIVE_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: false,
        celebs: {
          ...state.celebs,
          [(action.data.categoryId || '').toLowerCase()]: action.data.data
        }
      };
    case REQUEST_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_CELEBS_BY_CATEGORY:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_CELEB:
      return {
        ...state,
        celebData: action.data,
        isFetchingCeleb: false
      };
    case REQUEST_CELEB:
      return {
        ...state,
        isFetchingCeleb: true
      };
    case FAILURE_CELEB:
      return {
        ...state,
        isFetchingCeleb: false
      };
    case RECEIVE_PEPUP:
      return {
        ...state,
        isFetching: false
      };
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
      };
    case OPEN_VIDEO_MODAL:
      return {
        ...state,
        isVideoModalShown: true,
        videoUrl: action.data
      };
    case CLOSE_VIDEO_MODAL:
      return {
        ...state,
        isVideoModalShown: false,
        videoUrl: ''
      };
    case OPEN_REVIEWS_MODAL:
      return {
        ...state,
        isModalReviewShown: true
      };
    case CLOSE_REVIEWS_MODAL:
      return {
        ...state,
        isModalReviewShown: false
      };
    case RECEIVE_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.data,
        isFetching: false
      };
    case REQUEST_ALL_REVIEWS:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_ALL_REVIEWS:
      return {
        ...state,
        isFetching: false
      };
    case OPEN_POST_REVIEW_MODAL:
      return {
        ...state,
        isModalPostReviewShown: true
      };
    case CLOSE_POST_REVIEW_MODAL:
      return {
        ...state,
        isModalPostReviewShown: false
      };
    case RECEIVE_REVIEW:
      return {
        ...state,
        isFetching: false,
        isModalPostReviewShown: false
      };
    case REQUEST_REVIEW:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_REVIEW:
      return {
        ...state,
        isFetching: false
      };
    case FAILURE_FEATURED_CELEBS:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
