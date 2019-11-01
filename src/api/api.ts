import { SuperAgentRequest } from 'superagent';

export enum ApiMethod {
  UNKNOWN = 1,
  GET,
  POST,
  PUT,
  PATCH,
  DELETE
}

export enum ApiOperation {
  LogIn,
  SignUp,
  ResetPass,
  GetProfile,
  GetEventsByCategory,
  GetEvent,
  GetContestsByCategory,
  GetContest,
  EditProfile,
  GetAllActiveCategories,
  GetProductCategories,
  GetActiveCategory,
  GetCelebsByCategory,
  GetCelebById,
  RequestPepup,
  GetAllReviews,
  PostReview,
  FulfillRequestPepup,
  GetUserPepups,
  GetCelebPepups,
  GetAllPepups,
  SubmitEntryContest,
  GetFeaturedCelebs,
  GetProdCategoryByType,
  GetProductById,
  BuyEventTicket,
  UpdateCelebIntroVideo,
  GetPepupById
}

export interface INetwork<C> {
  getHttpInstance: (config: C) => SuperAgentRequest;
  request: <T, U>(
    operation: T,
    params?: Object,
    data?: U,
    urlParams?: Object
  ) => Promise<any>;
}

export interface IApi<U> {
  readonly operation: U;
  readonly params: Object | undefined;
  readonly data: any | undefined;
  readonly urlParams: Object | undefined;
  readonly variables: any;
  getMethod: () => ApiMethod;
  getUrl: () => string;
  getParams: () => Object | undefined;
  getData: () => any | undefined;
  isProtected: () => boolean;
}

export interface IError {
  status: number;
  code: number[];
  title: string;
  details: any;
  chainedErrors: any;
}

export interface ICitiznApi {
  operation: ApiOperation;
  params?: Object | undefined;
  data?: any;
  urlParams?: Object;
  headers?: Object;
  queryType?: string;
  variables?: any;
}

export class CitiznApi implements IApi<ApiOperation> {
  readonly operation: ApiOperation;
  readonly params: Object | undefined;
  readonly data: any | undefined;
  readonly urlParams: Object | undefined;
  readonly queryType: string | undefined;
  readonly variables: any;
  readonly headers: Object | undefined;

  constructor(options: ICitiznApi) {
    const {
      operation,
      params,
      data,
      urlParams,
      queryType,
      variables,
      headers
    } = options;

    this.operation = operation;
    this.params = params;
    this.data = data;
    this.urlParams = urlParams;
    this.queryType = queryType;
    this.variables = variables;
    this.headers = headers;
  }

  getMethod(): ApiMethod {
    switch (this.operation) {
      case ApiOperation.LogIn:
      case ApiOperation.SignUp:
      case ApiOperation.ResetPass:
      case ApiOperation.EditProfile:
      case ApiOperation.RequestPepup:
      case ApiOperation.PostReview:
      case ApiOperation.FulfillRequestPepup:
      case ApiOperation.SubmitEntryContest:
      case ApiOperation.BuyEventTicket:
      case ApiOperation.UpdateCelebIntroVideo:
        return ApiMethod.POST;

      case ApiOperation.GetProfile:
      case ApiOperation.GetEventsByCategory:
      case ApiOperation.GetEvent:
      case ApiOperation.GetContestsByCategory:
      case ApiOperation.GetContest:
      case ApiOperation.GetAllActiveCategories:
      case ApiOperation.GetProductCategories:
      case ApiOperation.GetActiveCategory:
      case ApiOperation.GetCelebsByCategory:
      case ApiOperation.GetCelebById:
      case ApiOperation.GetAllReviews:
      case ApiOperation.GetUserPepups:
      case ApiOperation.GetCelebPepups:
      case ApiOperation.GetAllPepups:
      case ApiOperation.GetFeaturedCelebs:
      case ApiOperation.GetProdCategoryByType:
      case ApiOperation.GetProductById:
      case ApiOperation.GetPepupById:  
        return ApiMethod.GET;

      default:
        return ApiMethod.UNKNOWN;
    }
  }

  getUrl(): string {
    const host = 'https://dev.pepupyo.com/mz';
    const {
      userId,
      eventId,
      contestId,
      categoryId,
      handle,
      prodCatType,
      productId,
      pepupId
    } = (this.getParams() || {}) as any;
    switch (this.operation) {
      case ApiOperation.LogIn:
        return `${host}/user/login`;
      case ApiOperation.SignUp:
        return `${host}/user/register`;
      case ApiOperation.ResetPass:
        return `${host}/user/reset-password`;
      case ApiOperation.GetProfile:
        return `${host}/user/profile/${handle}`;
      case ApiOperation.GetEventsByCategory:
        return `${host}/pepup/event/all/${categoryId}`;
      case ApiOperation.GetEvent:
        return `${host}/pepup/event/${eventId}`;
      case ApiOperation.GetContestsByCategory:
        return `${host}/pepup/contest/all/${categoryId}`;
      case ApiOperation.GetContest:
        return `${host}/pepup/contest/${contestId}`;
      case ApiOperation.EditProfile:
        return `${host}/user/update-details`;
      case ApiOperation.GetAllActiveCategories:
        return `${host}/pepup/celeb/categories/active`;
      case ApiOperation.GetProductCategories:
        return `${host}/products/group/list`;
      case ApiOperation.GetCelebsByCategory:
        return `${host}/pepup/celeb/category/${categoryId}`;
      case ApiOperation.GetCelebById:
        return `${host}/pepup/celeb/${userId}`;
      case ApiOperation.RequestPepup:
        return `${host}/pepup/create`;
      case ApiOperation.GetAllReviews:
        return `${host}/pepup/celeb/reviews/${userId}`;
      case ApiOperation.PostReview:
        return `${host}/pepup/celeb/post-review`;
      case ApiOperation.FulfillRequestPepup:
        return `${host}/pepup/celeb/fulfill-pepup-request`;
      case ApiOperation.SubmitEntryContest:
        return `${host}/pepup/contest/submit-entry/${contestId}`;
      case ApiOperation.GetUserPepups:
        return `${host}/pepup/user-requests/${userId}`;
      case ApiOperation.GetCelebPepups:
        return `${host}/pepup/celeb-requests/${userId}`;
      case ApiOperation.GetAllPepups:
        return `${host}/pepup/all`;
      case ApiOperation.GetFeaturedCelebs:
        return `${host}/pepup/celeb/featured`;
      case ApiOperation.GetProdCategoryByType:
        return `${host}/products/group/type/${prodCatType}`;
      case ApiOperation.GetProductById:
        return `${host}/products/item/${productId}`;
      case ApiOperation.BuyEventTicket:
        return `${host}/pepup/event/purchase-ticket/${eventId}`;
      case ApiOperation.UpdateCelebIntroVideo:
        return `${host}/pepup/celeb/update-intro-video`;
      case ApiOperation.GetPepupById:
        return `${host}/pepup/${pepupId}`;  
      default:
        return '';
    }
  }

  getParams(): Object | undefined {
    return this.params;
  }

  getData(): any | undefined {
    return this.variables;
  }

  getUrlParams(): Object {
    return this.urlParams || {};
  }

  isProtected(): boolean {
    switch (this.operation) {
      case ApiOperation.LogIn:
      case ApiOperation.SignUp:
      case ApiOperation.ResetPass:
        return false;

      case ApiOperation.EditProfile:
      case ApiOperation.GetProfile:
      case ApiOperation.GetEventsByCategory:
      case ApiOperation.GetEvent:
      case ApiOperation.GetContestsByCategory:
      case ApiOperation.GetContest:
      case ApiOperation.GetAllActiveCategories:
      case ApiOperation.GetProductCategories:
      case ApiOperation.GetActiveCategory:
      case ApiOperation.GetCelebsByCategory:
      case ApiOperation.GetCelebById:
      case ApiOperation.RequestPepup:
      case ApiOperation.GetAllReviews:
      case ApiOperation.PostReview:
      case ApiOperation.FulfillRequestPepup:
      case ApiOperation.GetUserPepups:
      case ApiOperation.GetCelebPepups:
      case ApiOperation.SubmitEntryContest:
      case ApiOperation.GetAllPepups:
      case ApiOperation.GetFeaturedCelebs:
      case ApiOperation.GetProdCategoryByType:
      case ApiOperation.GetProductById:
      case ApiOperation.BuyEventTicket:
      case ApiOperation.UpdateCelebIntroVideo:
      case ApiOperation.GetPepupById:  
        return true;

      default:
        return false;
    }
  }

  getHeaders(): Object {
    return this.headers || {};
  }
}
