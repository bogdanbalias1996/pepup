import {NavigationScreenProp, NavigationScreenOptions} from 'react-navigation';

export type Profile = {
  email: string;
  fbConnected: boolean;
  flagged: boolean;
  followerCnt: number;
  following: boolean;
  followingCnt: number;
  handle: string;
  id: string;
  name: string;
  profileInfo: Object;
  role: string;
  status: string;
  twitterConnected: boolean;
  verified: boolean;
};

export type ProfileScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
  profileData: Profile;
};

export type ProfileScreenDispatchProps = {
  getProfile: (id: string) => Promise<any>;
  openVideoRecordModal: () => void;
  fulfillPepupRequest: (video: any) => void;
};

export type NotificationItemsProps = {
  data: any;
  getStatusUser?: () => void;
};

export type FanRequestsProps = {
  data: any;
  getStatusCeleb?: () => void;
};

export type HistoryItemsProps = {
  data: any;
}

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;

export type HeaderProps = {
  userId: string;
  profileData: Profile;
  getProfile: (id: string) => void;
  openVideoRecordModal: () => void;
}
