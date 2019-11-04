import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
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
  id: string,
  fulfilled: boolean,
  featured: boolean,
  request: string,
  category: string,
  requestFor: string,
  requestDenied: boolean,
  sharePublicly: boolean,
  requestedOf: string,
  requestedBy: string,
  requestedOn: number,
  markedForDelete: boolean,
}

export type UserRequest = {
  id: string,
  fulfilled: boolean,
  status: string,
  paymentStatus: string,
  featured: boolean,
  request: string,
  category: string,
  requestFor: string,
  requestDenied: boolean,
  sharePublicly: boolean,
  requestedOf: string,
  requestedBy: string,
  markedForDelete: boolean,
  mediaBasePath: string,
  requestedByInfo: any,
  celebInfo: Celeb,
  requestedOnDt: string
}

export type ProfileScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
  handle: string;
  profileData: Profile | null;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;
  isFetching: boolean;
};

export type ProfileScreenDispatchProps = {
  getProfile: (handle: string) => Promise<any>;
  videoRecordModalOpen: () => void;
  fulfillPepupRequest: (video: any) => void;
  updateCelebIntroVideo: (celebId: string, video: any) => void;
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
  openNotifyModal: () => void;
  videoRecordModalOpen: () => void;
  getPepupNotification: (id:string) => Promise<any>;
};

export type HistoryItemsProps = {
  pepups: Array<Pepup>;
  profileData: Profile | null;
  celebData: Celeb | null;
  isFetching: boolean,
  getCeleb: (id: string) => Promise<any>
  getAllPepups: () => Promise<any>;
}

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;

export type HeaderProps = {
}
