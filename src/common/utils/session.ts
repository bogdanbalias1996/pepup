import { getStore } from '../../configureStore';
import AsyncStorage from '@react-native-community/async-storage';
import {
  removeSession,
  setDeveloperMode,
  setUserName
} from '../../pages/Login/actions';
import { navigate } from '../../navigationService';
import { setUserId, setHandleName } from '../../pages/Login/actions';
import { IS_ONBOARDING_PASSED } from '../../pages/Onboarding/Onboarding';

import { getProfile } from '../../pages/Profile/actions';

export const ACCESS_TOKEN_NAME = 'access_token';
export const ACCESS_HANDLE_NAME = 'handle_name';
export const ACCESS_USER_NAME = 'user_name';
const jwtDecode = require('jwt-decode');

export const clearLocalStorage = async (omittedNames?: String[]) => {
  try {
    if (!omittedNames) return AsyncStorage.clear();

    const allKeys = await AsyncStorage.getAllKeys();
    const keysToDelete = allKeys.filter(key => !omittedNames.includes(key));

    await AsyncStorage.multiRemove(keysToDelete);
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
    return null;
  }
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
  let name: string | null = '';
  let developerMode: boolean;

  try {
    accessToken = getStore().getState().LoginState.accessToken;
    userId = getStore().getState().LoginState.userId;
    handle = getStore().getState().LoginState.handle;
    name = getStore().getState().LoginState.name;
    developerMode =
      getStore().getState().LoginState.developerMode ||
      (await getLocalStorage('developerMode'));

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
    if (!name) {
      const handleUserName = await getLocalStorage(ACCESS_USER_NAME);
      getStore().dispatch(setUserName(handleUserName));
    }

    getStore().dispatch(setDeveloperMode(developerMode));
  } catch (err) {
    const accessTokenFromLocaleStorage = await getLocalStorage(
      ACCESS_TOKEN_NAME
    );

    accessToken = accessTokenFromLocaleStorage
      ? accessTokenFromLocaleStorage.token
      : '';
  }
  return accessToken;
};

export const authenticate = async () => {
  const token = await getToken();
  const store = getStore();

  if (!token) {
    const isOnboardingPassed = await getLocalStorage(IS_ONBOARDING_PASSED);

    store.dispatch(removeSession());
    navigate({ routeName: isOnboardingPassed ? 'Auth' : 'Onboarding' });
  } else {
    const handle = store.getState().LoginState.handle;

    await store.dispatch(getProfile(handle));

    navigate({ routeName: 'Main' });
  }
};
