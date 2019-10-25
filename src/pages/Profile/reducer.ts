import { IAction } from '../../coreTypes';

import {
  RECEIVE_USER_PROFILE,
  OPEN_VIDEO_RECORD_MODAL,
  CLOSE_VIDEO_RECORD_MODAL,
  RECEIVE_USER_PEPUPS,
  REQUEST_USER_PEPUPS,
  FAILURE_USER_PEPUPS,
  RECEIVE_CELEB_PEPUPS,
  REQUEST_CELEB_PEPUPS,
  FAILURE_CELEB_PEPUPS,
  RECEIVE_ALL_PEPUPS,
  REQUEST_ALL_PEPUPS,
  FAILURE_ALL_PEPUPS,
} from './actions';
import { Profile, Pepup } from '.';
import {
  RECEIVE_EDIT_USER,
  REQUEST_EDIT_USER,
  FAILURE_EDIT_USER,
} from '../EditProfile/actions';

export class ProfileState {
  profileData: Profile | null;
  isFetching: boolean;
  isModalShown: boolean;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;

  constructor() {
    this.profileData = null,
      this.isFetching = false,
      this.isModalShown = false,
      this.userPepups = [],
      this.celebPepups = [],
      this.pepups = []
  }
}

export const initialState = new ProfileState();

export const ProfileReducer = (
  state: ProfileState = initialState,
  action: IAction<any>,
): ProfileState => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return {
        ...state,
        profileData: action.data,
      };
    case RECEIVE_EDIT_USER:
      return {
        ...state,
        profileData: action.data,
        isFetching: false,
      };

    case REQUEST_EDIT_USER:
      return {
        ...state,
        isFetching: true,
      };

    case FAILURE_EDIT_USER:
      return {
        ...state,
        isFetching: false,
      };
    case OPEN_VIDEO_RECORD_MODAL:
      return {
        ...state,
        isModalShown: true,
      };
    case CLOSE_VIDEO_RECORD_MODAL:
      return {
        ...state,
        isModalShown: false,
      };
    case RECEIVE_USER_PEPUPS:
      return {
        ...state,
        userPepups: action.data,
        isFetching: false,
      };

    case REQUEST_USER_PEPUPS:
      return {
        ...state,
        isFetching: true,
      };

    case FAILURE_USER_PEPUPS:
      return {
        ...state,
        isFetching: false,
      };

    case RECEIVE_CELEB_PEPUPS:
      return {
        ...state,
        celebPepups: action.data,
        isFetching: false,
      };

    case REQUEST_CELEB_PEPUPS:
      return {
        ...state,
        isFetching: true,
      };

    case FAILURE_CELEB_PEPUPS:
      return {
        ...state,
        isFetching: false,
      };
    case RECEIVE_ALL_PEPUPS:
      return {
        ...state,
        pepups: action.data,
        isFetching: false,
      };
    case REQUEST_ALL_PEPUPS:
      return {
        ...state,
        isFetching: true,
      };
    case FAILURE_ALL_PEPUPS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
