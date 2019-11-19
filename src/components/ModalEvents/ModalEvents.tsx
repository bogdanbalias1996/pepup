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
import ModalSelector from 'react-native-modal-selector';

import {
  closeEventModal,
  setQuantity,
  purchaseEventTicket
} from '../../pages/Events/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalEventsProps, ModalEventsFromDataProps } from '.';
import styles from './ModalEvents.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import { Event } from '../../pages/Events/types';
import { PepupModal } from '../PepupModal/PepupModal';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';
import FastImage from 'react-native-fast-image';

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.EventState.isModalShown,
  eventData: state.EventState.eventData,
  isFetching: state.EventState.isFetching,
  quantity: state.EventState.selectedQuantity,
  isFetchingEvent: state.EventState.isFetchingEvent
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeEventModal: () => dispatch(closeEventModal()),
  setQuantity: (val: string) => dispatch(setQuantity(val) as any),
  purchaseEventTicket: (id: string, qnt: ModalEventsFromDataProps) =>
    dispatch(purchaseEventTicket(id, qnt) as any)
});

const quantityOptions = [
  { key: 1, label: '1' },
  { key: 2, label: '2' },
  { key: 3, label: '3' },
  { key: 4, label: '4' },
  { key: 5, label: '5' }
];

export class Component extends React.PureComponent<ModalEventsProps> {
  state = {
    heightDescription: 0
  };

  renderItem = ({ item }: any) => {
    const { eventData } = this.props;

    return (
      eventData && (
        <Card style={styles.imageCarouselWrap} radius={8}>
          <CardGradient style={{ borderRadius: 8 }} />
          <FastImage
            style={styles.imageCarousel}
            source={{
              uri: `${eventData.mediaBasePath}${item.link}`,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Card>
      )
    );
  };

  render() {
    const {
      closeEventModal,
      isModalShown,
      eventData,
      quantity,
      setQuantity,
      isFetchingEvent,
      isFetching,
      purchaseEventTicket
    } = this.props;

    return (
      <PepupModal
        visible={isModalShown}
        isLoading={isFetchingEvent}
        onRequestClose={() => closeEventModal()}
        heightContent={this.state.heightDescription}>
        {!!eventData && Object.keys(eventData).length !== 0 && (
          <View style={styles.wrapModalContent}>

            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeEventModal()}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              <View style={styles.scrollContent}>
                <View
                  onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    Object.keys(eventData).length !== 0 &&
                      this.setState({ heightDescription: height + 20 });
                  }}>

                  <View style={styles.wrapTitle}>
                    <Image
                      style={styles.imageLogo}
                      source={{
                        uri: eventData.mediaBasePath + eventData.organizerLogo
                      }}
                      resizeMode="contain"
                    />
                    <Text style={styles.title}>{eventData.title}</Text>
                  </View>

                  <Text style={[styles.text, styles.infoText]}>
                    {eventData.dataInfo.details}
                  </Text>

                  <View style={styles.infoBlock}>
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
                      <Text style={styles.infoLabel}>Date</Text>
                      <Text style={styles.infoValue}>
                        {eventData.startDt}
                      </Text>
                    </View>
                    <View style={[styles.infoItem, { marginBottom: 5 }]}>
                      <Text style={styles.infoLabel}>Entries</Text>
                      <Text style={styles.infoValue}>
                        {eventData.soldSeats}
                      </Text>
                    </View>

                    <View style={[styles.infoLocation, { marginBottom: 5 }]}>
                      <Text style={styles.infoLabel}>Location</Text>
                      <Text style={styles.infoLocationValue}>
                        {eventData.eventLoc}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.imgSet}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={eventData.dataInfo.images}
                      renderItem={this.renderItem}
                      keyExtractor={(item: Event) => item.id}
                      style={styles.carousel}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <View style={styles.changeItem}>
                <Text
                  numberOfLines={1}
                  style={[styles.infoLabel, styles.infoLabelQnt]}>
                  Choose quantity
                </Text>
                <ModalSelector
                  data={quantityOptions}
                  initValue={'0'}
                  onChange={(option: { label: any }) => {
                    setQuantity(option.label);
                  }}
                  cancelStyle={styles.modalCancelStyle}
                  overlayStyle={styles.modalOverlayStyle}
                  cancelTextStyle={styles.modalCancelTextStyle}
                  cancelContainerStyle={styles.modalCancelContainerStyle}
                  optionContainerStyle={styles.modalOptionContainer}
                  optionTextStyle={styles.modalOptionTextStyle}
                  optionStyle={styles.modalOptionStyle}
                  selectStyle={styles.selector}
                  cancelText="x"
                />
              </View>
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={() => purchaseEventTicket(eventData.id, quantity)}
                text="Buy Tickets"
                loader={isFetching}
              />
            </View>
          </View>
        )}
        <SuccessfulAlert />
        <ErrorModal />
      </PepupModal>
    );
  }
}

export const ModalEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
