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
  rode: string;
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
  fulfillPopupRequest: (video: any) => void;
};

export type NotificationItemsProps = {
  data: any;
  getStatus: () => void;
};

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;

export type HeaderProps = {
  userId: string;
  profileData: Profile;
  getProfile: (id: string) => void;
  openVideoRecordModal: () => void;
}
