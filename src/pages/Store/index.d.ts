import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type StoreScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
}

export type StoreScreenDispatchProps = {};

export type StoreItemsProps = {
  data: any;
  openStoreModal: () => void;
  filterValue: any;
  setFilterValue: (val: any) => void;
};

export type StoreScreenProps = StoreScreenStateProps & StoreScreenDispatchProps;
