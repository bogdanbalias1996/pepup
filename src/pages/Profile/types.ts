import { NavigationScreenProp } from 'react-navigation';
import { Celeb } from '../Pepups/types';
import { VideoType } from '../../components/ModalRecordVideo';
import { ComponentType } from 'react';

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
  id: string;
  fulfilled: boolean;
  featured: boolean;
  request: string;
  category: string;
  requestFor: string;
  requestDenied: boolean;
  sharePublicly: boolean;
  requestedOf: string;
  requestedBy: string;
  requestedOn: number;
  markedForDelete: boolean;
};

export type UserRequest = {
  id: string;
  fulfilled: boolean;
  status: string;
  paymentStatus: string;
  featured: boolean;
  request: string;
  category: string;
  requestFor: string;
  requestDenied: boolean;
  sharePublicly: boolean;
  requestedOf: string;
  requestedBy: string;
  markedForDelete: boolean;
  mediaBasePath: string;
  requestedByInfo: any;
  celebInfo: Celeb;
  requestedOnDt: string;
};

export type ProfileScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
  handle: string;
  profileData: Profile | null;
  userPepups: Array<Pepup>;
  celebPepups: Array<Pepup>;
  pepups: Array<Pepup>;
  isFetching: boolean;
  isCelebrity: boolean;
  data: {
    [key in ProfileTabType]: Array<any>;
  };
};

export interface ProfileScreenState {
  activeTabIndex: number;
}

export type ProfileScreenDispatchProps = {
  getProfile: (handle: string) => Promise<any>;
  videoRecordModalOpen: () => void;
  fulfillPepupRequest: (video: any) => void;
  updateCelebIntroVideo: (celebId: string, video: any) => void;
  getUserPepups: (id: string) => Promise<any>;
  getCelebPepups: (id: string) => Promise<any>;
};

export type MyRequestsProps = {
  userPepups: Array<Pepup>;
  getStatusUser?: () => void;
  isFetching: boolean;
  userId: string;
  getUserPepups: (id: string) => Promise<any>;
};

export type NotificationItemsProps = {
  isFetching: boolean;
};

export type FanRequestsProps = {
  celebPepups: Array<Pepup>;
  getStatusCeleb?: () => void;
  isFetching: boolean;
  userId: string;
  pepupId?: string;
  getCelebPepups: (id: string) => Promise<any>;
  openNotifyModal: () => void;
  getPepupNotification: (id: string) => Promise<any>;
  videoRecordModalOpen: (entityId: string, videoType: VideoType) => void;
};

export type HistoryItemsProps = {
  pepups: Array<Pepup>;
  profileData: Profile | null;
  celebData: Celeb | null;
  isFetching: boolean;
  getCeleb: (id: string) => Promise<any>;
  getAllPepups: () => Promise<any>;
};

export type ProfileScreenProps = ProfileScreenStateProps &
  ProfileScreenDispatchProps;

export type ProfileTabType = 'My Requests' | 'Fan Requests' | 'Notifications';

export type ProfileTabConfig = {
  title: ProfileTabType;
  [key: string]: any;
};
