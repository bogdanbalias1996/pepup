import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type Event = {
  active: boolean;
  coverImage: string;
  createdOn: number;
  creator: string;
  currency: string;
  data: string;
  eventLoc: string;
  featured: boolean;
  id: string;
  markedForDelete: boolean;
  mediaBasePath: string;
  organizerLogo: string;
  pricePerSeat: number;
  remainingSeats: number;
  soldSeats: number;
  startDt: string;
  title: string;
  totalSeats: number;
  dataInfo: any;
  creatorInfo: any;
  createdOnDt: string;
};

export type EventsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  events: Array<Event>;
  isFetching: boolean;
};

export type EventsScreenDispatchProps = {
  getEventsByCategory: (categoryId: string) => Promise<void>
};

export type EventItemsProps = {
  events: Array<Event>;
  categoryId: string;
  getEventsByCategory: (id: string) => Promise<any>;
  openEventModal: () => void;
  getEvent: (eventId: string) => Promise<any>;
  isFetching: boolean;
  route: {
    key: string;
  }
};

export type EventsResponseType = {
  categoryId: string;
  data: Event[];
};

export type EventsScreenProps = EventsScreenStateProps &
  EventsScreenDispatchProps;
