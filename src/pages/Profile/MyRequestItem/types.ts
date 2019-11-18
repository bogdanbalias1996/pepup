import { Celeb } from '../../Pepups/types';

export interface MyRequestItemProps {
  item: {
    status: string;
    celebInfo: Celeb;
    dataInfo: any;
    mediaBasePath: string;
    id: string;
    requestedOnDt: string;
    request: string;
  };
  openVideoModal: (link: string) => void;
  getPepupNotification: (id: string) => Promise<any>;
}
