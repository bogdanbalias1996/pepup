import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import format from 'date-fns/format';

import { closeEventModal } from '../../pages/Events/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalEventsProps } from '.';
import styles from './ModalEvents.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.EventState.isModalShown,
  eventData: state.EventState.eventData,
  isFetching: state.EventState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeEventModal: () => dispatch(closeEventModal())
});

const media = [
  {
    id: '01',
    avatar: require('../../../assets/mock_avatar.jpg')
  },
  {
    id: '02',
    avatar: require('../../../assets/mock_avatar.jpg')
  },
  {
    id: '03',
    avatar: require('../../../assets/mock_avatar.jpg')
  },
  {
    id: '04',
    avatar: require('../../../assets/mock_avatar.jpg')
  }
];

const THRESHOLD = 350;

export class Component extends React.PureComponent<ModalEventsProps> {
  state = {
    heightDescription: 0
  };

  renderItem = ({ item }) => {
    return (
      <Image
        style={styles.imageCarousel}
        source={item.avatar}
        resizeMode="cover"
      />
    );
  };

  render() {
    const { closeEventModal, isModalShown, eventData } = this.props;

    if (!eventData) return null;

    const parsedEventData = eventData.data ? JSON.parse(eventData.data) : {};

    return (
      <Modal
        position="bottom"
        isOpen={isModalShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeEventModal()}
        style={[
          styles.modal,
          {
            maxHeight: this.state.heightDescription + THRESHOLD,
            height: '100%',
            marginTop: 50
          }
        ]}
      >
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          
            <ScrollView style={styles.scrollView}>
              <View
                style={styles.insidePadding}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  this.setState({ heightDescription: height });
                }}
              >
                <View style={styles.wrapTitle}>
                  <Image
                    style={styles.imageLogo}
                    source={media[0].avatar}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>{eventData.title}</Text>
                </View>
                <Text style={[styles.text, styles.infoText]}>
                  {parsedEventData.details}
                </Text>
                <View style={styles.infoBlock}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Time</Text>
                    <Text style={styles.infoValue}>
                      {format(eventData.startDate, 'H:mm')}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Price</Text>
                    <Text style={styles.infoValue}>
                      {`${eventData.pricePerSeat} ${eventData.currency}`}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Places Left</Text>
                    <Text style={styles.infoValue}>
                      {eventData.remainingSeats}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Participants</Text>
                    <Text style={styles.infoValue}>{eventData.soldSeats}</Text>
                  </View>
                  <View style={styles.infoLocation}>
                    <Text style={styles.infoLabel}>Location</Text>
                    <Text style={styles.infoLocationValue}>
                      {eventData.eventLoc}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.imgSet}>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={media}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                  style={styles.carousel}
                />
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => closeEventModal()}
              >
                <Icon size={24} name="cancel" color={colorBlack} />
              </TouchableOpacity>
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={() => alert('ok')}
                text="Buy Tickets"
              />
            </View>
        </View>
      </Modal>
    );
  }
}

export const ModalEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
