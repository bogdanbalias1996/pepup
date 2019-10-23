import {NavigationScreenProp, NavigationScreenOptions} from 'react-navigation';
import { Celeb } from '../Pepups';

export type Profile = {
  email: string;
  fbConnected: boolean;
  flagged: boolean;
  followerCnt: number;
  following: boolean;
  followingCnt: number;
  handle: string;
  id: string;
  icon: string;
  name: string;
  profileInfo: Object;
  role: string;
  status: string;
  twitterConnected: boolean;
  verified: boolean;
};

export type Pepup = {
  
}

export type ProfileScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
  handle: string;
  profileData: Profile;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;
  isFetching: boolean;
};

export type ProfileScreenDispatchProps = {
  getProfile: (handle: string) => Promise<any>;
  openVideoRecordModal: () => void;
  fulfillPepupRequest: (video: any) => void;
  getUserPepups: (id: string) => Promise<any>;
  openPepupModal: () => void;
  getCeleb: (id: string) => Promise<any>;
};

export type NotificationItemsProps = {
  userPepups: Array<Pepup>;
  getStatusUser?: () => void;
  isFetching: boolean,
  userId: string,
  getUserPepups: (id: string) => Promise<any>;
};

export type FanRequestsProps = {
  celebPepups: Array<Pepup>
  getStatusCeleb?: () => void;
  isFetching: boolean,
  userId: string,
  getCelebPepups: (id: string) => Promise<any>;
};

export type HistoryItemsProps = {
  pepups: Array<Pepup>;
  profileData: Profile;
  celebData: Celeb;
  isFetching: boolean,
  getCeleb: (id:string) => Promise<any>
  getAllPepups: () => Promise<any>;
}

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;

export type HeaderProps = {
}
