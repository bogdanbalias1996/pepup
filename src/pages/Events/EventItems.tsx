import * as React from 'react';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import {Text, View, FlatList, StyleSheet, Image} from 'react-native';
import format from 'date-fns/format';

import {openEventModal, getEvent, getAllEvents} from './actions';
import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import {EventItemsProps} from './';
import {
  colorTextGray,
  colorBlack,
  defaultFont,
  semiboldFont,
  colorBlueberry,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {Loader} from '../../components/Loader/Loader';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openEventModal: () => dispatch(openEventModal()),
  getAllEvents: () => dispatch(getAllEvents() as any),
  getEvent: (val: string) => dispatch(getEvent(val) as any),
});

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.EventState.isFetching,
  events: state.EventState.events
});

export class Component extends React.PureComponent<EventItemsProps> {
  componentDidMount() {
    const {getAllEvents} = this.props;
    getAllEvents();
  }

  renderItem = ({item}: any) => {
    const {openEventModal, getEvent, isFetching} = this.props;
    const getModal = () => {
      openEventModal();
      getEvent(item.id);
    };

    return (
      <Loader size="large" color={colorBlueberry} isDataLoaded={!isFetching}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.text}>
              {`${item.soldSeats} going • ${item.remainingSeats} spots left`}
            </Text>
            <Text style={styles.text}>{format(item.startDate, 'H:mm')}</Text>
          </View>
          <View style={styles.wrapTitle}>
            <Image
              style={styles.imageLogo}
              source={{uri: item.creatorInfo.icon}}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.avatar && (
            <Image
              style={styles.avatar}
              source={item.avatar}
              resizeMode="cover"
            />
          )}
          <ButtonStyled
            type="border"
            onPress={() => getModal()}
            text="View Details"
          />
        </View>
      </Loader>
    );
  };

  render() {
    const {isFetching, events} = this.props;
    console.log(events)
    return (
      <Loader isDataLoaded={!isFetching} color={colorBlueberry} size="large">
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </Loader>
    );
  }
}

export const EventItems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

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
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 24,
    alignItems: 'center',
  },
  imageLogo: {
    width: 72,
    height: '100%',
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24,
  },
  avatar: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    marginBottom: 16,
  },
});
