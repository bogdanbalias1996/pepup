import { Pepup } from '../types';
import { Celeb } from '../../Pepups/types';

export interface MyRequestItemProps {
  item: {
    status: string;
    celebInfo: Celeb;
    requestedOnDt: string;
    request: string;
  };
}
