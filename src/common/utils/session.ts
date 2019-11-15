import jwtDecode from 'jwt-decode';

import { getStore } from '../../configureStore';
import Storage from './Storage';
import {
  removeSession,
  setDeveloperMode,
  setUserName
} from '../../pages/Login/actions';
import { navigate } from '../../navigationService';
import { setUserId, setHandleName } from '../../pages/Login/actions';
import { IS_ONBOARDING_PASSED } from '../../pages/Onboarding/Onboarding';

import { initialLoadProfile } from '../../pages/Profile/actions';

export const ACCESS_TOKEN_NAME = 'access_token';
export const ACCESS_HANDLE_NAME = 'handle_name';
export const ACCESS_USER_NAME = 'user_name';

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
      (await Storage.get('developerMode'));

    if (!accessToken) {
      const token = await Storage.get(ACCESS_TOKEN_NAME);
      accessToken = token;
    }
    if (!userId) {
      let decoded = jwtDecode(accessToken);

      getStore().dispatch(setUserId(decoded.id));
    }
    if (!handle) {
      const handleStorage = await Storage.get('handle_name');

      getStore().dispatch(setHandleName(handleStorage));
    }
    if (!name) {
      const handleUserName = await Storage.get(ACCESS_USER_NAME);
      getStore().dispatch(setUserName(handleUserName));
    }

    getStore().dispatch(setDeveloperMode(developerMode));
  } catch (err) {
    const accessTokenFromLocaleStorage = await Storage.get(ACCESS_TOKEN_NAME);

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
    const isOnboardingPassed = await Storage.get(IS_ONBOARDING_PASSED);

    store.dispatch(removeSession());
    navigate({ routeName: isOnboardingPassed ? 'Auth' : 'Onboarding' });
  } else {
    await store.dispatch(initialLoadProfile() as any);

    navigate({ routeName: 'Main' });
  }
};
