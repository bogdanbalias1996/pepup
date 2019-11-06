import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction } from '../../coreTypes';
import { Event, EventsResponseType } from '.';
import { openError, closeError } from '../ErrorModal/actions';
import { navigate } from '../../navigationService';
import { openAlert, closeAlert } from '../Alert/actions';
import { ModalEventsFromDataProps } from '../../components/ModalEvents';

export const OPEN_EVENT_MODAL = 'OPEN_EVENT_MODAL';
export const CLOSE_EVENT_MODAL = 'CLOSE_EVENT_MODAL';

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

export const RECEIVE_ALL_EVENTS = 'RECEIVE_ALL_EVENTS';
export const receiveAllEvents = (
  data: EventsResponseType
): IAction<EventsResponseType> => {
  return {
    type: RECEIVE_ALL_EVENTS,
    data
  };
};

export const REQUEST_ALL_EVENTS = 'REQUEST_ALL_EVENTS';
export const requestAllEvents = (): IAction<undefined> => {
  return {
    type: REQUEST_ALL_EVENTS,
    data: undefined
  };
};

export const FAILURE_ALL_EVENTS = 'FAILURE_ALL_EVENTS';
export const failureAllEvents = (): IAction<undefined> => {
  return {
    type: FAILURE_ALL_EVENTS,
    data: undefined
  };
};

export const getEventsByCategory = (categoryId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestAllEvents());
    request({
      operation: ApiOperation.GetEventsByCategory,
      params: {
        category: categoryId
      }
    })
      .then(res => {
        dispatch(
          receiveAllEvents({
            categoryId,
            data: res
          })
        );
        if (!res.length) {
          dispatch(
            openError({
              type: 'noResults',
              onPress: () => {
                dispatch(getEventsByCategory(categoryId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureAllEvents());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(getEventsByCategory(categoryId) as any);
            }
          })
        );
      });
  };
};

export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const receiveEvent = (data: Event): IAction<Event> => {
  return {
    type: RECEIVE_EVENT,
    data
  };
};

export const REQUEST_EVENT = 'REQUEST_EVENT';
export const requestEvent = (): IAction<undefined> => {
  return {
    type: REQUEST_EVENT,
    data: undefined
  };
};

export const FAILURE_EVENT = 'FAILURE_EVENT';
export const failureEvent = (): IAction<undefined> => {
  return {
    type: FAILURE_EVENT,
    data: undefined
  };
};

export const getEvent = (eventId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(requestEvent());
    request({
      operation: ApiOperation.GetEvent,
      params: {
        eventId
      }
    })
      .then(res => {
        dispatch(receiveEvent(res));
        if (Object.keys(res).length === 0) {
          dispatch(
            openError({
              type: 'itemUnavailable',
              onPress: () => {
                dispatch(getEvent(eventId) as any);
              }
            })
          );
        }
      })
      .catch(err => {
        dispatch(failureEvent());
        dispatch(
          openError({
            type: 'unknown',
            onPress: () => {
              dispatch(closeError());
              dispatch(closeEventModal());
              navigate({ routeName: 'Main' });
            }
          })
        );
      });
  };
};

export const SET_QUANTITY = 'SET_QUANTITY';
export const setQuantity = (data: string): IAction<string> => {
  return {
    type: SET_QUANTITY,
    data
  };
};

export const REQUEST_EVENT_PURCHASE = 'REQUEST_EVENT_PURCHASE';
export const requestEventPurchase = (): IAction<undefined> => {
  return {
    type: REQUEST_EVENT_PURCHASE,
    data: undefined
  };
};

export const RECEIVE_EVENT_PURCHASE = 'RECEIVE_EVENT_PURCHASE';
export const receiveEventPurchase = (data: boolean): IAction<boolean> => {
  return {
    type: RECEIVE_EVENT_PURCHASE,
    data
  };
};

export const FAILURE_EVENT_PURCHASE = 'FAILURE_EVENT_PURCHASE';
export const failureEventPurchase = (): IAction<undefined> => {
  return {
    type: FAILURE_EVENT_PURCHASE,
    data: undefined
  };
};

export const purchaseEventTicket = (
  eventId: string,
  payload: ModalEventsFromDataProps
) => {
  return (dispatch: Dispatch) => {
    const { quantity } = payload;

    dispatch(requestEventPurchase());
    request({
      operation: ApiOperation.BuyEventTicket,
      params: {
        eventId
      },
      variables: {
        quantity
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        dispatch(receiveEventPurchase(res));
        dispatch(
          openAlert({
            title: 'Purchase Successful',
            text:
              'Thanks for purchasing the ticket. Look out for further details in your email. Don’t forget to bookmark your calendar!',
            onPress: () => {
              dispatch(closeAlert());
              dispatch(closeEventModal());
            }
          })
        );
      })
      .catch(err => {
        dispatch(failureEventPurchase());
        dispatch(
          openError({
            type: 'paymentFail',
            onPress: () => {
              dispatch(purchaseEventTicket(eventId, payload) as any);
            }
          })
        );
      });
  };
};
