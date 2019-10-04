import { Dispatch } from "redux";
import { ApiOperation } from "../../api/api";
import { request } from "../../api/network";
import { IAction } from "../../coreTypes";

export const OPEN_EVENT_MODAL = "OPEN_EVENT_MODAL";
export const CLOSE_EVENT_MODAL = "CLOSE_EVENT_MODAL";

export const openEventModal = (): IAction<undefined> => {
  return {
    type: OPEN_EVENT_MODAL,
    data: undefined
  };
};
export const closeEventModal = (): IAction<undefined> => {
  return {
    type: CLOSE_EVENT_MODAL,
    data: undefined
  };
};

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const receiveAllEvents = (data): IAction<any> => {
  return {
    type: RECEIVE_ALL_EVENTS,
    data: data
  };
};

export const getAllEvents = () => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetAllEvents
    })
      .then(res => {
        dispatch(receiveAllEvents(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};

export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const receiveEvent = (data): IAction<any> => {
  return {
    type: RECEIVE_EVENT,
    data: data
  };
};

export const getEvent = (eventId: string) => {
  return (dispatch: Dispatch) => {
    request({
      operation: ApiOperation.GetEvent,
      params: {
        eventId
      }
    })
      .then(res => {
        dispatch(receiveEvent(res));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
};
