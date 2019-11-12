import { UserRequest } from '../../pages/Profile/types';

export type PepupNotificationProps = {
  closeNotifyModal: () => void;
  getPepupNotification?: (id: string) => Promise<any>;
  isModalNotifyShown: boolean;
  isFetching: boolean;
  isFetchingNotify: boolean;
  pepupData: UserRequest | null;
  acceptPepupRequest: (id: string) => Promise<any>;
  denyPepupRequest: (id: string) => Promise<any>;
};
