import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import { IGlobalState, IAction } from "./coreTypes";
import thunk from "redux-thunk";
import {trackConnection} from '../src/middlewares/trackInternetConnection';

import { FontReducer } from "./common/font.reducer";
import { LoginReducer } from "./pages/Login/reducer";
import { PepupReducer } from "./pages/Pepups/reducer";
import { EventReducer } from "./pages/Events/reducer";
import { ContestReducer } from "./pages/Contests/reducer";
import { StoreReducer } from "./pages/Store/reducer";
import { ProfileReducer } from './pages/Profile/reducer';
import { AlertReducer } from './pages/Alert/reducer';
import { ErrorReducer } from './pages/ErrorModal/reducer';
import { ConnectionReducer } from "./utils/connectionCheck/reducer";

const getReducerObject = () => ({
  FontState: FontReducer,
  LoginState: LoginReducer,
  PepupState: PepupReducer,
  EventState: EventReducer,
  ContestState: ContestReducer,
  StoreState: StoreReducer,
  ProfileState: ProfileReducer,
  AlertState: AlertReducer,
  ErrorState: ErrorReducer,
  ConnectionState: ConnectionReducer
});

const configureReducers = () =>
  combineReducers<IGlobalState>(getReducerObject());

const rootReducer = (
  state: IGlobalState,
  action: IAction<any>
): IGlobalState => {
  return configureReducers()(state, action);
};

const store = createStore<IGlobalState, any, any, any>(
  rootReducer as any,
  applyMiddleware(thunk)
);

export const getStore = (): Store<IGlobalState> => {
  if (!store) {
    throw new Error(
      "redux store is not defined, use function withAppStore or withMockStore"
    );
  }
  return store;
};
