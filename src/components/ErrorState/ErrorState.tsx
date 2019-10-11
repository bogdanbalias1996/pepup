import * as React from 'react';
import {Dispatch} from 'redux';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';

import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import {ErrorStateProps} from './';
import styles from './ErrorState.styles';
import {IGlobalState} from '../../coreTypes';
import {closeError} from '../../pages/ErrorModal/actions';
import {Icon} from '../Icon/Icon';
import {colorBlack} from '../../variables';

const mapStateToProps = (state: IGlobalState) => ({
  isErrorShown: state.ErrorState.isErrorShown,
  title: state.ErrorState.title,
  text: state.ErrorState.text,
  onPress: state.ErrorState.onPress,
  buttonText: state.ErrorState.buttonText,
  imgSource: state.ErrorState.imgSource,
  isFetching: state.PepupState.isFetching,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeError: () => dispatch(closeError()),
});

export class Component extends React.PureComponent<ErrorStateProps> {
  render() {
    const {
      closeError,
      isErrorShown,
      title,
      text,
      imgSource,
      onPress,
      isFetching,
      buttonText,
    } = this.props;

    return (
      <Modal
        isOpen={isErrorShown}
        swipeToClose={false}
        position="bottom"
        coverScreen={true}
        useNativeDriver={false}
        onClosed={() => closeError()}
        style={styles.modal}>
        <View style={styles.modal}>
          <View style={styles.wrapModalContent}>
            <View style={styles.imageContainer}>
              <Image
                source={imgSource}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.modalFooter}>
              {buttonText === 'TRY AGAIN' ? (
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => closeError()}>
                  <Icon size={24} name="cancel" color={colorBlack} />
                </TouchableOpacity>
              ) : null}
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={onPress ? () => onPress() : () => closeError()}
                text={buttonText}
                loader={isFetching}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export const ErrorModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
