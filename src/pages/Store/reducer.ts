import { IAction } from "../../coreTypes";
import {
  OPEN_STORE_MODAL,
  CLOSE_STORE_MODAL,
  SET_FILTER_VALUE,
  RECEIVE_PRODUCTS_CATEGORIES,
  REQUEST_PRODUCTS_CATEGORIES,
  FAILURE_PRODUCTS_CATEGORIES,
  RECEIVE_PRODUCTS_CATEGORY_TYPE,
  REQUEST_PRODUCTS_CATEGORY_TYPE,
  FAILURE_PRODUCTS_CATEGORY_TYPE,
  RECEIVE_PRODUCT,
  REQUEST_PRODUCT,
  FAILURE_PRODUCT,
} from "./actions";
import { ProdCategory, Product } from ".";

export class StoreState {
  isModalShown: boolean;
  filterValue: any;
  prodCategories: Array<ProdCategory>;
  isFetchingCat: boolean;
  isFetching: boolean;
  prodCatType: string;
  goods: Array<Product>;
  dataType: ProdCategory | null;
  prodData: Product | null;

  constructor() {
    this.isModalShown = false;
    this.filterValue = { key: "1", text: "All" };
    this.prodCategories = [];
    this.isFetchingCat = false;
    this.prodCatType = '';
    this.goods = [];
    this.prodData = null;
    this.isFetching = false;
    this.dataType = null;
  }
}

export const initialState = new StoreState();

export const StoreReducer = (
  state: StoreState = initialState,
  action: IAction<any>
): StoreState => {
  switch (action.type) {
    case OPEN_STORE_MODAL:
      return {
        ...state,
        isModalShown: true
      };
    case CLOSE_STORE_MODAL:
      return {
        ...state,
        isModalShown: false
      };
    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.data
      };
    case RECEIVE_PRODUCTS_CATEGORIES:
      return {
        ...state,
        prodCategories: action.data,
        isFetchingCat: false
      };
    case REQUEST_PRODUCTS_CATEGORIES:
      return {
        ...state,
        isFetchingCat: true
      };
    case FAILURE_PRODUCTS_CATEGORIES:
      return {
        ...state,
        isFetchingCat: false
      };
    case RECEIVE_PRODUCTS_CATEGORY_TYPE:
      return {
        ...state,
        dataType: action.data,
        goods: action.data.productItems,
        isFetching: false
      };
    case REQUEST_PRODUCTS_CATEGORY_TYPE:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_PRODUCTS_CATEGORY_TYPE:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_PRODUCT:
      return {
        ...state,
        prodData: action.data,
        isFetching: false
      }
    case REQUEST_PRODUCT:
      return {
        ...state,
        isFetching: true
      }
    case FAILURE_PRODUCT:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
};
