import { IAction } from '../../coreTypes';

import {
  RECEIVE_USER_PROFILE,
  RECEIVE_USER_PEPUPS,
  REQUEST_USER_PEPUPS,
  FAILURE_USER_PEPUPS,
  RECEIVE_CELEB_PEPUPS,
  REQUEST_CELEB_PEPUPS,
  FAILURE_CELEB_PEPUPS,
  RECEIVE_ALL_PEPUPS,
  REQUEST_ALL_PEPUPS,
  FAILURE_ALL_PEPUPS,
  RECEIVE_ACCEPT,
  REQUEST_ACCEPT,
  FAILURE_ACCEPT,
  RECEIVE_DENY,
  REQUEST_DENY,
  FAILURE_DENY
} from './actions';
import { Profile, Pepup } from '.';
import {
  RECEIVE_EDIT_USER,
  REQUEST_EDIT_USER,
  FAILURE_EDIT_USER
} from '../EditProfile/actions';
import { REMOVE_SESSION } from '../Login/actions';

export class ProfileState {
  profileData: Profile | null;
  isFetching: boolean;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;

  isVideoRecordModalVisible: boolean;
  recordedVideo: any;

  constructor() {
    this.profileData = null;
    this.isFetching = false;
    this.userPepups = [];
    this.celebPepups = [];
    this.pepups = [];
    this.isVideoRecordModalVisible = false;
    this.recordedVideo = undefined;
  }
}

export const initialState = new ProfileState();

export const ProfileReducer = (
  state: ProfileState = initialState,
  action: IAction<any>
): ProfileState => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return {
        ...state,
        profileData: action.data
      };
    case RECEIVE_EDIT_USER:
      return {
        ...state,
        profileData: action.data,
        isFetching: false
      };

    case REQUEST_EDIT_USER:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_EDIT_USER:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_USER_PEPUPS:
      return {
        ...state,
        userPepups: action.data,
        isFetching: false
      };

    case REQUEST_USER_PEPUPS:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_USER_PEPUPS:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_CELEB_PEPUPS:
      return {
        ...state,
        celebPepups: action.data,
        isFetching: false
      };

    case REQUEST_CELEB_PEPUPS:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_CELEB_PEPUPS:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_ALL_PEPUPS:
      return {
        ...state,
        pepups: action.data,
        isFetching: false
      };
    case REQUEST_ALL_PEPUPS:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_ALL_PEPUPS:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_ACCEPT:
      return {
        ...state,
        isFetching: false
      };
    case REQUEST_ACCEPT:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_ACCEPT:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_DENY:
      return {
        ...state,
        isFetching: false
      };
    case REQUEST_DENY:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_DENY:
      return {
        ...state,
        isFetching: false
      };
    case REMOVE_SESSION:
      return new ProfileState();
    default:
      return state;
  }
};
