import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type Profile = {
  email: string,
  fbConnected: boolean,
  flagged: boolean,
  followerCnt: number,
  following: boolean,
  followingCnt: number,
  handle: string,
  id: string,
  name: string,
  profileInfo: Object,
  rode: string,
  status: string,
  twitterConnected: boolean,
  verified: boolean
}

export type ProfileScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
  profileData: Profile;
}

export type ProfileScreenDispatchProps = {
  getProfile: (id: string) => Promise<any>;
};

export type NotificationItemsProps = {
  data: any;
};

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;
