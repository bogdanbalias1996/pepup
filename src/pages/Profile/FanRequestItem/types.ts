import { Pepup } from '../types';

export interface FanRequestItemProps {
  item: {
    status: string;
    requestedByInfo: {
      name: string;
    };
    requestedOnDt: string;
    request: string;
  };
  openNotifyModal: () => void;
  getPepupNotification: (id: string) => void;
  videoRecordModalOpen: (id: string, type: string) => void;
}
