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
  FAILURE_DENY,
  RECEIVE_PEPUP_NOTIFICATION,
  REQUEST_PEPUP_NOTIFICATION,
  FAILURE_PEPUP_NOTIFICATION,
  OPEN_NOTIFY_MODAL,
  CLOSE_NOTIFY_MODAL,
  RECEIVE_NOTIFICATIONS,
  REQUEST_NOTIFICATIONS,
  FAILURE_NOTIFICATIONS
} from './actions';
import { Profile, Pepup, UserRequest, NotificationItem } from './types';
import {
  RECEIVE_EDIT_USER,
  REQUEST_EDIT_USER,
  FAILURE_EDIT_USER
} from '../EditProfile/actions';
import { REMOVE_SESSION } from '../Login/actions';
import {
  setLocalStorage,
  ACCESS_TOKEN_NAME,
  ACCESS_HANDLE_NAME,
  ACCESS_USER_NAME
} from '../../common/utils/session';

export class ProfileState {
  profileData: Profile | null;
  isFetching: boolean;
  isFetchingNotifyA: boolean;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;
  pepupData: UserRequest | null;
  isVideoRecordModalVisible: boolean;
  recordedVideo: any;
  isModalNotifyShown: boolean;
  isFetchingNotifyD: boolean;
  notifications: Array<NotificationItem>;

  constructor() {
    this.profileData = null;
    this.isFetching = false;
    this.userPepups = [];
    this.celebPepups = [];
    this.pepups = [];
    this.isVideoRecordModalVisible = false;
    this.recordedVideo = undefined;
    this.isFetchingNotifyA = false;
    this.pepupData = null;
    this.isModalNotifyShown = false;
    this.isFetchingNotifyD = false;
    this.notifications = [];
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
      const { accessToken, ...rest } = action.data;

      setLocalStorage(accessToken, ACCESS_TOKEN_NAME);
      setLocalStorage(rest.handle, ACCESS_HANDLE_NAME);
      setLocalStorage(rest.name, ACCESS_USER_NAME);

      return {
        ...state,
        profileData: rest,
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
      state.celebPepups = state.celebPepups.map((item: UserRequest) => {
        return item.id === action.data.id ? action.data : item;
      });
      return {
        ...state,
        isFetchingNotifyA: false,
        pepupData: action.data
      };
    case REQUEST_ACCEPT:
      return {
        ...state,
        isFetchingNotifyA: true
      };
    case FAILURE_ACCEPT:
      return {
        ...state,
        isFetchingNotifyA: false
      };
    case RECEIVE_DENY:
      state.celebPepups = state.celebPepups.map((item: UserRequest) => {
        return item.id === action.data.id ? action.data : item;
      });
      return {
        ...state,
        isFetchingNotifyD: false,
        pepupData: action.data
      };
    case REQUEST_DENY:
      return {
        ...state,
        isFetchingNotifyD: true
      };
    case FAILURE_DENY:
      return {
        ...state,
        isFetchingNotifyD: false
      };
    case RECEIVE_PEPUP_NOTIFICATION:
      return {
        ...state,
        pepupData: action.data,
        isFetching: false
      };
    case REQUEST_PEPUP_NOTIFICATION:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_PEPUP_NOTIFICATION:
      return {
        ...state,
        isFetching: false
      };
    case OPEN_NOTIFY_MODAL:
      return {
        ...state,
        isModalNotifyShown: true
      };
    case CLOSE_NOTIFY_MODAL:
      return {
        ...state,
        isModalNotifyShown: false
      };
    case REMOVE_SESSION:
      return new ProfileState();
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
        isFetching: false
      };
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_NOTIFICATIONS:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
