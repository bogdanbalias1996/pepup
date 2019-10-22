import * as React from 'react';
import {Text, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {closeAlert} from '../../pages/Alert/actions';
import {AlertProps} from '.';
import styles from './SuccessfulAlert.styles';
import {IGlobalState} from '../../coreTypes';
import {ButtonStyled} from '../ButtonStyled/ButtonStyled';

const mapStateToProps = (state: IGlobalState) => ({
  isAlertShown: state.AlertState.isAlertShown,
  title: state.AlertState.title,
  text: state.AlertState.text,
  onPress: state.AlertState.onPress
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeAlert: () => dispatch(closeAlert()),
});

export class Component extends React.PureComponent<AlertProps> {
  render() {
    const {title, text, onPress, isAlertShown, closeAlert} = this.props;
    return (
      <Modal
        transparent
        visible={isAlertShown}
        onRequestClose={() => closeAlert()}>
        <View style={styles.modal}>
          <View style={styles.wrapModalContent}>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
            <ButtonStyled
              style={styles.btnSubmit}
              onPress={onPress ? () => onPress() : () => closeAlert()}
              text="OK"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export const SuccessfulAlert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
