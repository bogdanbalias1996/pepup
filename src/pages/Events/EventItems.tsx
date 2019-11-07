import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import { openEventModal, getEvent, getEventsByCategory } from './actions';
import { EventItemsProps, Event } from './';
import {
  colorTextGray,
  colorBlack,
  defaultFont,
  colorBlueberry,
  boldFont
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';

export class Component extends React.Component<EventItemsProps> {
  keyExstractor = (item: Event) => item.id;

  extractEventsByCategory(celebs: { [key: string]: Array<Event> }, category: string): Event[]  {
    const categoryName = category.toLowerCase();
    const categoryEvent = celebs[categoryName] || [];

    return categoryEvent;
  }

  shouldComponentUpdate(nextProps: EventItemsProps): boolean {
    const oldEvents = this.extractEventsByCategory(this.props.events, this.props.route.key);
    const newEvents = this.extractEventsByCategory(nextProps.events, nextProps.route.key);

    // TODO: implement shallow compersion by id
    return newEvents.length !== oldEvents.length;
  }

  renderItem = ({ item }: any) => {
    const { openEventModal, getEvent } = this.props;
    const getModal = () => {
      openEventModal();
      getEvent(item.id);
    };

    return (
      <TouchableOpacity onPress={getModal} activeOpacity={1}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.text}>
              {`${item.soldSeats} going • ${item.remainingSeats} spots left`}
            </Text>
            <Text style={styles.text}>{item.startDt}</Text>
          </View>
          <View style={styles.wrapTitle}>
            <Image
              style={styles.imageLogo}
              source={{ uri: item.mediaBasePath + item.organizerLogo }}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.coverImage && (
            <Image
              style={styles.avatar}
              source={{ uri: item.mediaBasePath + item.coverImage }}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { events, route } = this.props;

    const eventsArr = this.extractEventsByCategory(events, route.key.toLowerCase());

    return (
      <Loader
        isDataLoaded={Boolean(eventsArr.length)}
        color={colorBlueberry}
        size="large">
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={eventsArr}
          renderItem={this.renderItem}
          keyExtractor={this.keyExstractor}
        />
      </Loader>
    );
  }
}


const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.EventState.isFetching,
  events: state.EventState.events
});

const mapDispatchToProps = {
  openEventModal,
  getEventsByCategory,
  getEvent
};

export const EventItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 24,
    alignItems: 'center'
  },
  imageLogo: {
    width: 72,
    height: '100%',
    marginRight: 16
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24
  },
  avatar: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    marginBottom: 16
  }
});
