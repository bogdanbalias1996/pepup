import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type Category = {
  id: string;
  description: string;
  active: boolean;
}

export type Celeb = {
  id: string,
  fee: number,
  billRate: number,
  commission: number,
  data: any
  profitable: boolean,
  dndActive: boolean,
  active: boolean,
  mappedUserId: string,
  totalPepupsRequested: number,
  totalPepupsFulfilled: number,
  reviews: number,
  rating: number,
  userInfo: any,
  mediaBasePath: string,
  dataInfo: any,
  isChecked?: boolean,
  weightedRating: string,
  celebId: string
}

export type CelebsResponseType = {
  categoryId: string;
  data: Celeb[];
}

export type Review = {
  id: string,
  review: string,
  rating: number,
  submittedBy: string,
  submittedOn: number,
  submittedFor: string,
  reviewedEntityType: string,
  submitterUserInfo: any
}

export type PepupsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>
  categories: Array<Category>;
  categoryId: string;
  isFetchingCat: boolean;
}

export type PepupsScreenDispatchProps = {
  getAllActiveCategories: () => Promise<any>;
};

export type PepupsItemsScreenStateProps = {
  celebs: Array<Celeb>;
  isFetching: boolean;
}

export type PepupItemsProps = {
  getFeaturedCelebs: () => Promise<any>
  setCategory: (categoryid: string) => void;
  celebs: { [key: string]: Array<Celeb> };
  openPepupModal: () => void;
  categoryId: string;
  getCelebsByCategory: (id: string) => Promise<any>;
  getCeleb: (userId: string) => Promise<any>;
  isFetching: boolean;
};

export type PepupsScreenProps = PepupsScreenStateProps &
  PepupsScreenDispatchProps;
