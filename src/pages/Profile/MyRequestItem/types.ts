import { Celeb } from '../../Pepups/types';

export interface MyRequestItemProps {
  getPepupNotification: (id: string ) => void;
  openVideoModal: (videoLink: string) => void;
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
