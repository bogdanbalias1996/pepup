import { Dispatch } from "redux";
import { ApiOperation } from "../../api/api";
import { request } from "../../api/network";
import { IAction } from "../../coreTypes";
import { Event } from ".";
import { openError, closeError } from "../ErrorModal/actions";
import { navigate } from "../../navigationService";

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
export const receiveAllEvents = (data: Array<Event>): IAction<Array<Event>> => {
  return {
    type: RECEIVE_ALL_EVENTS,
    data
  };
};

export const REQUEST_ALL_EVENTS = "REQUEST_ALL_EVENTS";
export const requestAllEvents = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_EVENTS,
    data: undefined
  };
};

export const FAILURE_ALL_EVENTS = "FAILURE_ALL_EVENTS";
export const failureAllEvents = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_EVENTS,
    data: undefined
  };
};

export const getAllEvents = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllEvents());
    request({
      operation: ApiOperation.GetAllEvents
    })
      .then(res => {
        console.log('RES', res)
        dispatch(receiveAllEvents(res));
        if (!res.length) {
          dispatch(openError({
            type: 'noResults',
            onPress: () => { dispatch(getAllEvents() as any) }
          }))
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err,2,null))
        dispatch(failureAllEvents());
        dispatch(openError({
          type: 'unknown',
          onPress: () => { dispatch(getAllEvents() as any) }
        }))
      });
  };
};

export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const receiveEvent = (data: Event): IAction<Event> => {
  return {
    type: RECEIVE_EVENT,
    data
  };
};

export const REQUEST_EVENT = "REQUEST_EVENT";
export const requestEvent = (): IAction<undefined> => {
  return {
    type: REQUEST_EVENT,
    data: undefined
  };
};

export const FAILURE_EVENT = "FAILURE_EVENT";
export const failureEvent = (): IAction<undefined> => {
  return {
    type: FAILURE_EVENT,
    data: undefined
  };
};

export const getEvent = (eventId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestEvent())
    request({
      operation: ApiOperation.GetEvent,
      params: {
        eventId
      }
    })
      .then(res => {
        dispatch(receiveEvent(res));
        if (Object.keys(res).length === 0) {
          dispatch(openError({
            type: 'itemUnavailable',
            onPress: () => { dispatch(getEvent(eventId) as any) }
          }))
        }
      })
      .catch(err => {
        dispatch(failureEvent())
        dispatch(openError({
          type: 'unknown',
          onPress: () => {
            dispatch(closeError());
            dispatch(closeEventModal());
            navigate({ routeName: 'Main' });
          }
        }))
      });
  };
};
