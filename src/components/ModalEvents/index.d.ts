import { Event } from '../../pages/Events/types';

export type ModalEventsProps = {
  closeEventModal: () => void;
  isModalShown: boolean;
  eventData: Event | null;
  setQuantity: (val: string) => void;
  quantity: string;
  isFetchingEvent: boolean;
  isFetching: boolean;
  purchaseEventTicket: (id: string, quantity: string) => Promise<any>;
};

export type ModalEventsFromDataProps = {
  quantity: string;
};
