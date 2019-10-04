import { IAction } from "../../coreTypes";
import { OPEN_EVENT_MODAL, CLOSE_EVENT_MODAL, RECEIVE_ALL_EVENTS, RECEIVE_EVENT } from "./actions";
import { Event } from ".";
export class EventState {
  showModal: boolean;
  events: Array<Event>;
  eventData: Event | null;
  

  constructor() {
    this.showModal = false;
    this.events = [];
    this.eventData = null;
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
        showModal: true
      };
    case CLOSE_EVENT_MODAL:
      return {
        ...state,
        showModal: false
      };
    case RECEIVE_ALL_EVENTS:
      return {
        ...state,
        events: action.data
      };
    case RECEIVE_EVENT:
      return {
        ...state,
        eventData: action.data
      }  
    default:
      return state;
  }
};

