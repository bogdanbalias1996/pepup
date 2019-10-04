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
  organizerLogo: string,
  pricePerSeat: number,
  remainingSeats: number,
  soldSeats: number,
  startDate: number,
  title: string,
  totalSeats: number,
}

export type EventsScreenStateProps = {
  navigation: NavigationScreenProp<any, any>;
  events: Array<Event>;
}

export type EventsScreenDispatchProps = {
  getAllEvents: () => Promise<any>;
};

export type EventItemsProps = {
  data: any;
  openEventModal: () => void;
  getEvent: (eventId: string) => Promise<any>;
};

export type EventsScreenProps = EventsScreenStateProps &
  EventsScreenDispatchProps;
