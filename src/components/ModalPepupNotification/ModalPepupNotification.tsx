import * as React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { closeNotifyModal } from '../../pages/Profile/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import styles from './ModalPepupNotification.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupNotificationProps } from '.';
import { PepupModal } from '../PepupModal/PepupModal';
import {
  acceptPepupRequest,
  denyPepupRequest
} from '../../pages/Profile/actions';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import CardGradient from '../CardGradient';
import Card from '../Card';

const mapStateToProps = (state: IGlobalState) => ({
  isModalNotifyShown: state.ProfileState.isModalNotifyShown,
  isFetchingNotifyA: state.ProfileState.isFetchingNotifyA,
  isFetchingNotifyD: state.ProfileState.isFetchingNotifyD,
  isFetching: state.ProfileState.isFetching,
  pepupData: state.ProfileState.pepupData
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotifyModal: () => dispatch(closeNotifyModal()),
  acceptPepupRequest: (id: string) => dispatch(acceptPepupRequest(id) as any),
  denyPepupRequest: (id: string) => dispatch(denyPepupRequest(id) as any)
});

export class Component extends React.PureComponent<PepupNotificationProps> {
  state = {
    heightDescription: 0
  };

  render() {
    const {
      closeNotifyModal,
      isModalNotifyShown,
      isFetchingNotifyA,
      isFetchingNotifyD,
      isFetching,
      pepupData,
      acceptPepupRequest,
      denyPepupRequest
    } = this.props;

    const normalizedStatus = pepupData && pepupData.status.toLowerCase();

    return (
      pepupData && (
        <PepupModal
          visible={isModalNotifyShown}
          isLoading={isFetching}
          onRequestClose={() => closeNotifyModal()}
          heightContent={this.state.heightDescription}>
          <View style={{ flex: 1, paddingTop: 55 }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeNotifyModal()}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>
            <ScrollView>
              <View
                style={styles.scrollContent}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(pepupData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}>
                <View style={styles.wrap}>
                  <View style={styles.reqTitle}>
                    <Card style={styles.avatar} radius={6}>
                      <CardGradient style={{ borderRadius: 6 }} />
                      <FastImage
                        style={styles.image}
                        source={
                          pepupData.celebInfo.userInfo.icon
                            ? {
                                uri: pepupData.celebInfo.userInfo.icon,
                                priority: FastImage.priority.normal
                              }
                            : require('../../../assets/avatarPlaceholder.png')
                        }
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </Card>
                    <View style={styles.textWrap}>
                      <View style={styles.textBlock}>
                        <Text style={styles.title}>Requested by</Text>
                        <Text style={styles.reqData}>
                          {pepupData.requestedByInfo.name}
                        </Text>
                      </View>
                      <View style={styles.textBlock}>
                        <Text style={styles.title}>This Pepup is for</Text>
                        <Text style={styles.reqData}>
                          {pepupData.requestFor}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.textBlock, {paddingTop: 15}]}>
                    <Text style={styles.title}>Instructions</Text>
                    <Text style={styles.reqData}>
                      {pepupData.request}
                      {'\n'}
                    </Text>
                  </View>
                  <Text style={[styles.reqData, styles.featured]}>
                    {pepupData.sharePublicly ? (
                      <Text style={{flex: 1, alignItems: 'center'}}>
                        <Text>⭐️{' '}</Text>
                        <Text>This Pepup will be featured on your page.</Text>
                      </Text>
                    ) : (
                      "This Pepup won't be featured on your profile page."
                    )}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <ButtonStyled
                style={[styles.btnSubmit, styles.btnReject]}
                onPress={() =>
                  normalizedStatus !== 'rejected' &&
                  denyPepupRequest(pepupData.id)
                }
                text="REJECT"
                loader={isFetchingNotifyD}
                type="grey"
              />
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={() =>
                  pepupData.status.toLowerCase() !== 'accepted' &&
                  acceptPepupRequest(pepupData.id)
                }
                text="ACCEPT"
                loader={isFetchingNotifyA}
              />
            </View>
          </View>
          <ErrorModal />
          <SuccessfulAlert />
        </PepupModal>
      )
    );
  }
}

export const ModalPepupNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
