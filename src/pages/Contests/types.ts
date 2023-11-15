import { NavigationScreenProp } from 'react-navigation';

export type Contest = {
  id: string;
  active: boolean;
  featured: boolean;
  title: string;
  type: string;
  organizerLogo: string;
  creator: string;
  entries: number;
  contestImage: string;
  creatorInfo: any;
  dataInfo: any;
  endDt: string;
  prize: string;
  currency: string;
  mediaBasePath: string;
  createdOnDt: string;
  markedForDelete: boolean;
};

export type ContestResponseType = {
  categoryId: string;
  data: Contest[];
};

export type ContestsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  contests: {
    [key: string]: Contest[];
  };
  isFetching: boolean;
  getContestsByCategory: (category: string) => void;
};

export type ContestsScreenDispatchProps = {};

export type ContestsScreenProps = ContestsScreenStateProps &
  ContestsScreenDispatchProps;
