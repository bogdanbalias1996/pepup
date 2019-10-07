import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type Contest = {
  id: string,
  active: boolean,
  featured: boolean,
  title: string,
  type: string,
  organizerLogo: string,
  entries: number,
  data: string,
  contestImage: string,
  creator: string,
  createdOn: number,
  endDate: number,
  prize: string,
  currency: string,
  markedForDelete: boolean
}

export type ContestsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  contests: Array<Contest>,
  isFetching: boolean
}

export type ContestsScreenDispatchProps = {
  getAllContests: () => Promise<any>;
};

export type ContestItemsProps = {
  data: any;
  openContestModal: () => void;
  getContest: (contestId: string) => Promise<any>;
  isFetching: boolean
};

export type ContestsScreenProps = ContestsScreenStateProps &
  ContestsScreenDispatchProps;
