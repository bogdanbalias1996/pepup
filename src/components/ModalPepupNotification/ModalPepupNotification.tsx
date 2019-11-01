import * as React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

import {
  closeNotifyModal,
  getPepupNotification
} from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import styles from './ModalPepupNotification.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupNotificationProps } from '.';
import { PepupModal } from '../PepupModal/PepupModal';

const mapStateToProps = (state: IGlobalState) => ({
  isModalNotifyShown: state.PepupState.isModalNotifyShown,
  isFetching: state.PepupState.isFetching,
  pepupData: state.PepupState.pepupData
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotifyModal: () => dispatch(closeNotifyModal()),
  getPepupNotification: (id: string) =>
    dispatch(getPepupNotification(id) as any)
});

export class Component extends React.PureComponent<PepupNotificationProps> {
  state = {
    heightDescription: 0
  }

  handleSubmit = () => {};

  render() {
    const {
      closeNotifyModal,
      isModalNotifyShown,
      isFetching,
      pepupData
    } = this.props;

    return (
      pepupData && (
        <PepupModal
          visible={isModalNotifyShown}
          isLoading={this.props.isFetching}
          onRequestClose={() => closeNotifyModal()}
          heightContent={this.state.heightDescription}>
            <View style={{flex: 1, paddingTop: 20}}>
              <ScrollView>
              <View
                style={styles.scrollContent}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(pepupData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}>
                <View>
                  <View style={styles.reqTitle}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: pepupData.celebInfo.userInfo.icon }}
                      resizeMode="cover"
                    />
                    <Text style={[styles.title, { textAlign: 'center' }]}>
                      {'\n'}
                      {pepupData.celebInfo.userInfo.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.wrap}>
                  <View style={styles.textBlock}>
                    <Text style={styles.title}>Requested by</Text>
                    <Text style={styles.reqData}>
                      {pepupData.requestedByInfo.name}
                    </Text>
                  </View>
                  <View style={styles.textBlock}>
                    <Text style={styles.title}>This Pepup is for</Text>
                    <Text style={styles.reqData}>{pepupData.requestFor}</Text>
                  </View>
                  <View style={styles.textBlock}>
                    <Text style={styles.title}>Instructions</Text>
                    <Text style={styles.reqData}>{pepupData.request}</Text>
                  </View>
                  <Text style={styles.title}>
                    {pepupData.sharePublicly
                      ? 'This Pepup will be featured on your profile page'
                      : "This Pepup won't be featured on your profile page"}
                  </Text>
                </View>
                </View>
              </ScrollView>
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => closeNotifyModal()}>
                    <Icon size={20} name="cancel" color={colorBlack} />
                  </TouchableOpacity>
                  <ButtonStyled
                    style={[styles.btnSubmit, styles.btnReject]}
                    onPress={() => alert('q')}
                    text="REJECT"
                    loader={isFetching}
                    type="grey"
                  />
                  <ButtonStyled
                    style={styles.btnSubmit}
                    onPress={() => this.handleSubmit()}
                    text="ACCEPT"
                    loader={isFetching}
                  />
                </View>
          </View>
          <ErrorModal />
        </PepupModal>
      )
    );
  }
}

export const ModalPepupNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
