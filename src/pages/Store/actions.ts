import { IAction } from "../../coreTypes";
import { ProdCategory, Product } from ".";
import { ApiOperation } from "../../api/api";
import { request } from "../../api/network";
import { Dispatch } from "redux";
import { openError } from "../ErrorModal/actions";

export const OPEN_STORE_MODAL = "OPEN_STORE_MODAL";
export const CLOSE_STORE_MODAL = "CLOSE_STORE_MODAL";
export const SET_FILTER_VALUE = "SET_FILTER_VALUE";

export const openStoreModal = ():IAction<undefined> => {
  return {
    type: OPEN_STORE_MODAL,
    data: undefined
  };
};
export const closeStoreModal = ():IAction<undefined> => {
  return {
    type: CLOSE_STORE_MODAL,
    data: undefined
  };
};
export const setFilterValue = (data: boolean):IAction<boolean> => {
  return {
    type: SET_FILTER_VALUE,
    data
  };
};

export const RECEIVE_PRODUCTS_CATEGORIES = "RECEIVE_PRODUCTS_CATEGORIES";
export const receiveProductsCategories = (data: Array<ProdCategory>): IAction<Array<ProdCategory>> => {
  return {
    type: RECEIVE_PRODUCTS_CATEGORIES,
    data
  };
};
export const REQUEST_PRODUCTS_CATEGORIES = "REQUEST_PRODUCTS_CATEGORIES";
export const requestProductsCategories = (): IAction<undefined> => {
  return {
    type: REQUEST_PRODUCTS_CATEGORIES,
    data: undefined
  };
};
export const FAILURE_PRODUCTS_CATEGORIES = "FAILURE_PRODUCTS_CATEGORIES";
export const failureProductsCategories = (): IAction<undefined> => {
  return {
    type: FAILURE_PRODUCTS_CATEGORIES,
    data: undefined
  };
};

export const getProductsCategories = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestProductsCategories());
    request({
      operation: ApiOperation.GetProductCategories
    })
      .then(res => {
        dispatch(receiveProductsCategories(res));
      })
      .catch(err => {
        dispatch(failureProductsCategories());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getProductsCategories() as any) }
        }))
      });
  };
};

export const RECEIVE_PRODUCTS_CATEGORY_TYPE = "RECEIVE_PRODUCTS_CATEGORY_TYPE";
export const receiveProductsCategoryType = (data: ProdCategory): IAction<ProdCategory> => {
  return {
    type: RECEIVE_PRODUCTS_CATEGORY_TYPE,
    data
  };
};
export const REQUEST_PRODUCTS_CATEGORY_TYPE = "REQUEST_PRODUCTS_CATEGORY_TYPE";
export const requestProductsCategoryType = (): IAction<undefined> => {
  return {
    type: REQUEST_PRODUCTS_CATEGORY_TYPE,
    data: undefined
  };
};
export const FAILURE_PRODUCTS_CATEGORY_TYPE = "FAILURE_PRODUCTS_CATEGORY_TYPE";
export const failureProductsCategoryType = (): IAction<undefined> => {
  return {
    type: FAILURE_PRODUCTS_CATEGORY_TYPE,
    data: undefined
  };
};

export const getProductsCategoryType = (prodCatType: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestProductsCategoryType());
    request({
      operation: ApiOperation.GetProdCategoryByType,
      params: {
        prodCatType
      }
    })
      .then(res => {
        dispatch(receiveProductsCategoryType(res));
      })
      .catch(err => {
        dispatch(failureProductsCategoryType())
        dispatch(openError({
          type: 'unknown',
          onPress: () => {
            dispatch(getProductsCategoryType(prodCatType) as any)
          }
        }))
      });
  };
};

export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const receiveProduct = (data: Product): IAction<Product> => {
  return {
    type: RECEIVE_PRODUCT,
    data
  };
};

export const REQUEST_PRODUCT = "REQUEST_PRODUCT";
export const requestProduct = (): IAction<undefined> => {
  return {
    type: REQUEST_PRODUCT,
    data: undefined
  };
};

export const FAILURE_PRODUCT = "FAILURE_PRODUCT";
export const failureProduct = (): IAction<undefined> => {
  return {
    type: FAILURE_PRODUCT,
    data: undefined
  };
};

export const getProduct = (productId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestProduct())
    request({
      operation: ApiOperation.GetProductById,
      params: {
        productId
      }
    })
      .then(res => {
        dispatch(receiveProduct(res));
        if (Object.keys(res).length === 0) {
          dispatch(openError({
            type: 'itemUnavailable',
            onPress: () => { dispatch(getProduct(productId) as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureProduct())
        dispatch(openError({
          type: 'unknown',
          onPress: () => {
            dispatch(getProduct(productId) as any);
          }
        }))
      });
  };
};

