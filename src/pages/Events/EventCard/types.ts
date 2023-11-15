import { Event } from '../types';

export interface EventCardProps {
  item: Event;
  openEventModal: () => void;
  getEvent: (id: string | number) => void;
}
