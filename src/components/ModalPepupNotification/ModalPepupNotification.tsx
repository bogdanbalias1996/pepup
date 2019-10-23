import * as React from 'react';
import {Dispatch} from 'redux';
import {TouchableOpacity, Text, View, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';

import {closeNotifyModal} from '../../pages/Pepups/actions';
import {Icon} from '../../components/Icon/Icon';
import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import styles from './ModalPepupNotification.styles';
import {colorBlack} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import { ErrorModal } from '../ErrorState/ErrorState';

const mapStateToProps = (state: IGlobalState) => ({
  isModalReqShown: state.PepupState.isModalReqShown,
  isFetching: state.PepupState.isFetching,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotifyModal: () => dispatch(closeNotifyModal()),
});

export class Component extends React.PureComponent<> {
  handleSubmit = () => {};

  render() {
    const {closeNotifyModal, isModalNotifyShown, isFetching, celebData} = this.props;

    return (
      <Modal
        isOpen={isModalNotifyShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeNotifyModal()}
        style={styles.modal}>
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <View style={styles.wrap}>
            <ScrollView>
              <View>
                <View style={styles.reqTitle}>
                  <Image
                    style={styles.avatar}
                    source={require('../../../assets/mock_avatar.jpg')}
                    resizeMode="cover"
                  />
                  <Text style={[styles.title, {textAlign: 'center'}]}>
                    {'\n'}
                    {celebData.userInfo.name}
                  </Text>
                </View>
              </View>
              <View style={styles.wrap}>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>Requested by</Text>
                  <Text style={styles.reqData}>{}</Text>
                </View>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>This Pepup is for</Text>
                  <Text style={styles.reqData}>{}</Text>
                </View>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>Instructions</Text>
                  <Text style={styles.reqData}>{}</Text>
                </View>
                {celebData.isChecked ? (
                  <Text style={styles.title}>This Pepup will be featured on your profile page</Text>
                ) : (
                  <Text style={styles.title}>This Pepup won't be featured on your profile page</Text>
                )}
              </View>
            </ScrollView>

            <View style={styles.footerWrap}>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => closeNotifyModal()}>
                  <Icon size={24} name="cancel" color={colorBlack} />
                </TouchableOpacity>
                <ButtonStyled
                  style={styles.btnSubmit}
                  onPress={() => alert('q')}
                  text="REJECT"
                  loader={isFetching}
                  type='grey'
                />
                <ButtonStyled
                  style={styles.btnSubmit}
                  onPress={() => handleSubmit()}
                  text="ACCEPT"
                  loader={isFetching}
                />
              </View>
            </View>
          </View>
          ); }}
        </View>
        <ErrorModal />
      </Modal>
    );
  }
}

export const ModalPepupReq = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
