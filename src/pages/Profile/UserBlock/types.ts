import { Profile } from '../types';

export interface UserBlockProps {
  isCelebrity: boolean;
  profileData: Profile;
  openPepupModal: () => void;
  getCeleb: (id: string) => void;
}
