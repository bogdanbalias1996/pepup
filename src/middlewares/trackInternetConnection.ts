import { Store, Middleware, Dispatch } from 'redux';
import { openError } from '../pages/ErrorModal/actions';
import { OPEN_ERROR } from '../pages/ErrorModal/actions';
import { SET_INTERNET_CONNECTION } from '../utils/connectionCheck/actions';
import { IAction } from '../coreTypes';

export const trackConnection: TrackConnectionMiddleware = (store: Store) => (
  next: any,
) => (action: any) => {
  console.log('ACTION: ', action);
  const lastApiAction: any = typeof action === 'function' ? action : null;
  const isOnline =
    action.type === SET_INTERNET_CONNECTION
      ? action.data
      : store.getState().ConnectionState.isOnline;
    
  if (
    !isOnline &&
    action.type !== OPEN_ERROR &&
    action.type !== SET_INTERNET_CONNECTION
  ) {
    store.dispatch(
      openError({
        type: 'connectionFail',
        onPress: () => {
          console.log('ONPRESS: ', lastApiAction)
          lastApiAction ? store.dispatch((() => lastApiAction) as any) : null;
        },
      }),
    );
  } else {
    next(action);
  }
};

export type TrackConnectionMiddleware<S = {}> = Middleware<
  Dispatch<any>,
  S,
  Dispatch<any>
>;
