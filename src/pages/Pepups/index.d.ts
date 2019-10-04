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
  dataInfo: any
}

export type PepupsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>
  categories: Array<Category>;
  categoryId: string;
}

export type PepupsScreenDispatchProps = {
  getAllActiveCategories: () => Promise<any>;
  getCelebsByCategory: (categoryid: string) => Promise<any>;
};

export type PepupItemsProps = {
  setCategory: (categoryid: string) => void;
  celebs: Array<Celeb>;
  openPepupModal: () => void;
  categoryId: string;
  getCelebsByCategory: (id: string) => Promise<any>;
  getCeleb: (celebId: string) => Promise<any>;
  isFetching: boolean;
};

export type PepupsScreenProps = PepupsScreenStateProps &
  PepupsScreenDispatchProps;
