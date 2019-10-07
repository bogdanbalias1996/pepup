import { IAction } from "../../coreTypes";
import { OPEN_EVENT_MODAL, CLOSE_EVENT_MODAL, RECEIVE_ALL_EVENTS, RECEIVE_EVENT, REQUEST_ALL_EVENTS, FAILURE_ALL_EVENTS, REQUEST_EVENT, FAILURE_EVENT } from "./actions";
import { Event } from ".";
export class EventState {
  isModalShown: boolean;
  events: Array<Event>;
  eventData: Event | null;
  isFetching: boolean;


  constructor() {
    this.isModalShown = false;
    this.events = [];
    this.eventData = null;
    this.isFetching = false;
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
        events: action.data,
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
        isFetching: false
      };
    case REQUEST_EVENT:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_EVENT:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

