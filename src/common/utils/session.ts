import {getStore} from '../../configureStore';
import AsyncStorage from '@react-native-community/async-storage';
import {removeSession} from '../../pages/Login/actions';
import {navigate} from '../../navigationService';
import {setUserId, setHandleName} from '../../pages/Login/actions';

export const ACCESS_TOKEN_NAME = 'access_token';
const jwtDecode = require('jwt-decode');

export const clearLocalStorage = () => {
  AsyncStorage.clear();
};

export const setLocalStorage = (value: any, itemName: string) => {
  try {
    return AsyncStorage.setItem(itemName, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to set item to localStorage:', e);
    return null;
  }
};

export const getLocalStorage = async (itemName: string) => {
  try {
    const res = await AsyncStorage.getItem(itemName);

    return JSON.parse(res || 'null') as any;
  } catch (e) {
    console.error('Failed to get item from localStorage:', e);
    return null;
  }
};

const isTokenExpired = (expiresAt: number): boolean => {
  // TODO: Add proper time zone comparison
  const now = Math.round(Date.now() / 1000);
  return expiresAt < now;
};

export const getToken = async () => {
  let accessToken: string | null = '';
  let userId: string | null = '';
  let handle: string | null = '';

  try {
    accessToken = getStore().getState().LoginState.accessToken;
    userId = getStore().getState().LoginState.userId;
    handle = getStore().getState().LoginState.handle;

    if (!accessToken) {
      const token = await getLocalStorage(ACCESS_TOKEN_NAME);
      accessToken = token;
    }
    if (!userId) {
      let decoded = jwtDecode(accessToken);

      getStore().dispatch(setUserId(decoded.id));
    }
    if (!handle) {
      const handleStorage = await getLocalStorage('handle_name');

      getStore().dispatch(setHandleName(handleStorage));
    }
  } catch (err) {
    const accessTokenFromLocaleStorage = await getLocalStorage(
      ACCESS_TOKEN_NAME,
    );

    accessToken = accessTokenFromLocaleStorage
      ? accessTokenFromLocaleStorage.token
      : '';
  }
  return accessToken;
};

export const authenticate = async () => {
  const token = await getToken();

  if (!token) {
    getStore().dispatch(removeSession());
    navigate({routeName: 'Auth'});
    return;
  } else {
    navigate({routeName: 'Main'});
  }
};
