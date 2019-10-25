import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type StoreScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  prodCategories: Array<ProdCategory>;
  isFetchingCat?: boolean;
  prodCatType: string;
}

export type StoreScreenDispatchProps = {
  getProductsCategories: () => Promise<any>
};

export type StoreItemsProps = {
  openStoreModal: () => void;
  filterValue: any;
  goods: Array<Product>;
  prodCatType: string;
  dataType: ProdCategory;
  getProduct: (val:string) => Promise<any>;
  isFetching: boolean;
  isFetchingCat: boolean;
  setFilterValue: (val: any) => void;
  getProductsCategoryType: (val: string) => Promise<any>;
};

export type ProdCategory = {
  id: string,
  type: string,
  name: string,
  icon: string,
  displayOrder: number,
  enabled: boolean,
  description: string,
  visibility: string,
  markedAsDeleted: boolean,
  mediaBasePath: string,
  productItems?: Array<Product>
}

export type Product = {
  id: string,
  icon: string,
  code: string,
  name: string,
  description: string,
  featured: boolean,
  enabled: boolean,
  visibility: string,
  totalQty: number,
  availableQty: number,
  sellingPrice: number,
  markedPrice: number,
  discount: number,
  defaultCurrency: string,
  markedAsDeleted: boolean,
  dataInfo: any,
  mediaBasePath?: string
}

export type StoreScreenProps = StoreScreenStateProps & StoreScreenDispatchProps;
