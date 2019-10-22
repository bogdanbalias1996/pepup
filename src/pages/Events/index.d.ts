import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";

export type Event = {
  active: boolean,
  coverImage: string,
  createdOn: number,
  creator: string,
  currency: string,
  data: string,
  eventLoc: string,
  featured: boolean,
  id: string,
  markedForDelete: boolean,
  mediaBasePath: string,
  organizerLogo: string,
  pricePerSeat: number,
  remainingSeats: number,
  soldSeats: number,
  startDt: number,
  title: string,
  totalSeats: number,
  dataInfo: any,
  creatorInfo: any,
  createdOnDt: string
}

export type EventsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  events: Array<Event>;
  isFetching: boolean;
}

export type EventsScreenDispatchProps = {
  getAllEvents: () => Promise<any>;
};

export type EventItemsProps = {
  events: Array<Event>;
  getAllEvents: () => Promise<any>;
  openEventModal: () => void;
  getEvent: (eventId: string) => Promise<any>;
  isFetching: boolean;
};

export type EventsScreenProps = EventsScreenStateProps &
  EventsScreenDispatchProps;
