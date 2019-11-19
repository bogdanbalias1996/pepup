import { Pepup } from '../types';
import { Celeb } from '../../Pepups/types';

export interface MyRequestItemProps {
  getPepupNotification: (id: string ) => void;
  openVideoModal: (videoLink: string) => void;
  item: {
    status: string;
    celebInfo: Celeb;
    requestedOnDt: string;
    request: string;
  };
}
