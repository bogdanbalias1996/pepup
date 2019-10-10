import * as React from 'react';
import {Dispatch} from 'redux';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';

import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import {ErrorStateProps} from './';
import styles from './ErrorState.styles';
import {IGlobalState} from '../../coreTypes';
import {closeError} from '../../pages/ErrorModal/actions';

const mapStateToProps = (state: IGlobalState) => ({
  isErrorShown: state.ErrorState.isErrorShown,
  title: state.ErrorState.title,
  text: state.ErrorState.text,
  onPress: state.ErrorState.onPress,
  buttonText: state.ErrorState.buttonText,
  imgSource: state.ErrorState.imgSource,
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
            <ButtonStyled
              style={styles.btnSubmit}
              onPress={onPress ? () => onPress() : () => closeError()}
              text={buttonText}
            />
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
