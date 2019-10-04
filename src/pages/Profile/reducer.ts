import { IAction } from "../../coreTypes";

import { RECEIVE_USER_PROFILE } from "./actions";
import { Profile } from "."
import { RECEIVE_EDIT_USER, REQUEST_EDIT_USER, FAILURE_EDIT_USER } from "../EditProfile/actions";

export class ProfileState {
  profileData: Profile
  isFetching: boolean

  constructor() {
    this.profileData = {
      email: "",
      fbConnected: false,
      flagged: false,
      followerCnt: 0,
      following: false,
      followingCnt: 0,
      handle: "",
      id: "",
      name: "",
      profileInfo: {},
      rode: "",
      status: "",
      twitterConnected: false,
      verified: false
    }
    this.isFetching = false
  }
}

export const initialState = new ProfileState()

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
      }

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

    default:
      return state;
  }
};