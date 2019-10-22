import { SuperAgentRequest } from 'superagent'

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
  GetAllEvents,
  GetEvent,
  GetAllContests,
  GetContest,
  EditProfile,
  GetAllActiveCategories,
  GetActiveCategory,
  GetCelebsByCategory,
  GetCelebById,
  RequestPepup,
  GetAllReviews,
  PostReview,
  FulfillRequestPepup,
  GetUserPepups,
  GetCelebPepups,
  GetAllPepups
}

export interface INetwork<C> {
  getHttpInstance: (config: C) => SuperAgentRequest
  request: <T, U>(operation: T, params?: Object, data?: U, urlParams?: Object) => Promise<any>
}

export interface IApi<U> {
  readonly operation: U
  readonly params: Object | undefined
  readonly data: any | undefined
  readonly urlParams: Object | undefined
  readonly variables: any
  getMethod: () => ApiMethod
  getUrl: () => string
  getParams: () => Object | undefined
  getData: () => any | undefined
  isProtected: () => boolean
}

export interface IError {
  status: number
  code: number[]
  title: string
  details: any
  chainedErrors: any
}

export interface ICitiznApi {
  operation: ApiOperation
  params?: Object | undefined
  data?: any
  urlParams?: Object
  headers?: Object
  queryType?: string
  variables?: any
}

export class CitiznApi implements IApi<ApiOperation> {
  readonly operation: ApiOperation
  readonly params: Object | undefined
  readonly data: any | undefined
  readonly urlParams: Object | undefined
  readonly queryType: string | undefined
  readonly variables: any
  readonly headers: Object | undefined

  constructor(options: ICitiznApi) {
    const { operation, params, data, urlParams, queryType, variables, headers } = options

    this.operation = operation
    this.params = params
    this.data = data
    this.urlParams = urlParams
    this.queryType = queryType
    this.variables = variables
    this.headers = headers
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
        return ApiMethod.POST

      case ApiOperation.GetProfile:
      case ApiOperation.GetAllEvents:
      case ApiOperation.GetEvent:
      case ApiOperation.GetAllContests:
      case ApiOperation.GetContest:
      case ApiOperation.GetAllActiveCategories:
      case ApiOperation.GetActiveCategory:
      case ApiOperation.GetCelebsByCategory:
      case ApiOperation.GetCelebById:
      case ApiOperation.GetAllReviews:
      case ApiOperation.GetUserPepups:
      case ApiOperation.GetCelebPepups:
      case ApiOperation.GetAllPepups:  
        return ApiMethod.GET

      default:
        return ApiMethod.UNKNOWN
    }
  }

  getUrl(): string {
    const host = 'http://dev.pepupyo.com/mz'
    const {
      userId, eventId, contestId, categoryId, handle
    } = (this.getParams() || {}) as any

    switch (this.operation) {
      case ApiOperation.LogIn:
        return `${host}/user/login`
      case ApiOperation.SignUp:
        return `${host}/user/register`
      case ApiOperation.ResetPass:
        return `${host}/user/reset-password`
      case ApiOperation.GetProfile:
        return `${host}/user/profile/${handle}`
      case ApiOperation.GetAllEvents:
        return `${host}/pepup/event/all`
      case ApiOperation.GetEvent:
        return `${host}/pepup/event/${eventId}`
      case ApiOperation.GetAllContests:
        return `${host}/pepup/contest/all`
      case ApiOperation.GetContest:
        return `${host}/pepup/contest/${contestId}`
      case ApiOperation.EditProfile:
        return `${host}/user/update-details`
      case ApiOperation.GetAllActiveCategories:
        return `${host}/pepup/celeb/categories/active`
      case ApiOperation.GetCelebsByCategory:
        return `${host}/pepup/celeb/category/${categoryId}`
      case ApiOperation.GetCelebById:
        return `${host}/pepup/celeb/${userId}`
      case ApiOperation.RequestPepup:
        return `${host}/pepup/create`
      case ApiOperation.GetAllReviews:
        return `${host}/pepup/celeb/reviews/${userId}`
      case ApiOperation.PostReview:
        return `${host}/pepup/celeb/post-review`
      case ApiOperation.FulfillRequestPepup:
        return `${host}/pepup/celeb/fulfill-pepup-request`
      case ApiOperation.GetUserPepups:
        return `${host}/pepup/user-requests/${userId}`
      case ApiOperation.GetCelebPepups:
        return `${host}/pepup/celeb-requests/${userId}`
      case ApiOperation.GetAllPepups:
        return `${host}/pepup/all` 
      default:
        return ''
    }
  }

  getParams(): Object | undefined {
    return this.params
  }

  getData(): any | undefined {
    return this.variables
  }

  getUrlParams(): Object {
    return this.urlParams || {}
  }

  isProtected(): boolean {
    switch (this.operation) {
      case ApiOperation.LogIn:
      case ApiOperation.SignUp:
      case ApiOperation.ResetPass:
        return false

      case ApiOperation.EditProfile:
      case ApiOperation.GetProfile:
      case ApiOperation.GetAllEvents:
      case ApiOperation.GetEvent:
      case ApiOperation.GetAllContests:
      case ApiOperation.GetContest:
      case ApiOperation.GetAllActiveCategories:
      case ApiOperation.GetActiveCategory:
      case ApiOperation.GetCelebsByCategory:
      case ApiOperation.GetCelebById:
      case ApiOperation.RequestPepup:
      case ApiOperation.GetAllReviews:
      case ApiOperation.PostReview:
      case ApiOperation.FulfillRequestPepup:
      case ApiOperation.GetUserPepups:
      case ApiOperation.GetCelebPepups:
      case ApiOperation.GetAllPepups:  
        return true

      default:
        return false
    }
  }

  getHeaders(): Object {
    return this.headers || {}
  }
}
