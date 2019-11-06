import { IAction } from '../../coreTypes';
import {
  OPEN_EVENT_MODAL,
  CLOSE_EVENT_MODAL,
  RECEIVE_ALL_EVENTS,
  RECEIVE_EVENT,
  REQUEST_ALL_EVENTS,
  FAILURE_ALL_EVENTS,
  REQUEST_EVENT,
  FAILURE_EVENT,
  SET_QUANTITY,
  RECEIVE_EVENT_PURCHASE,
  REQUEST_EVENT_PURCHASE,
  FAILURE_EVENT_PURCHASE
} from './actions';
import { Event } from '.';
export class EventState {
  isModalShown: boolean;
  events: Array<Event>;
  eventData: Event | null;
  isFetching: boolean;
  selectedQuantity: string;
  isFetchingEvent: boolean;

  constructor() {
    this.isModalShown = false;
    this.events = [];
    this.eventData = null;
    this.isFetching = false;
    this.selectedQuantity = '';
    this.isFetchingEvent = false;
  }
}

export const initialState = new EventState();

export const EventReducer = (
  state: EventState = initialState,
  action: IAction<any>
): EventState => {
  switch (action.type) {
    case OPEN_EVENT_MODAL:
      return {
        ...state,
        isModalShown: true
      };
    case CLOSE_EVENT_MODAL:
      return {
        ...state,
        isModalShown: false
      };
    case RECEIVE_ALL_EVENTS:
      return {
        ...state,
        events: {
          ...state.events,
          [(action.data.categoryId || '').toLowerCase()]: action.data.data
        },
        isFetching: false
      };
    case REQUEST_ALL_EVENTS:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_ALL_EVENTS:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_EVENT:
      return {
        ...state,
        eventData: action.data,
        isFetchingEvent: false
      };
    case REQUEST_EVENT:
      return {
        ...state,
        isFetchingEvent: true
      };
    case FAILURE_EVENT:
      return {
        ...state,
        isFetchingEvent: false
      };
    case SET_QUANTITY:
      return {
        ...state,
        selectedQuantity: action.data
      };
    case RECEIVE_EVENT_PURCHASE:
      return {
        ...state,
        isFetching: false
      };
    case REQUEST_EVENT_PURCHASE:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_EVENT_PURCHASE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
