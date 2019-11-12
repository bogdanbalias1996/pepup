import { IGlobalState } from './coreTypes';

export const isUserCelebrity = (state: IGlobalState): boolean => {
  const ROLE_CELEB = 'REGULAR,CELEBRITY';
  const { profileData } = state.ProfileState;

  return Boolean(profileData && profileData.role === ROLE_CELEB);
};
