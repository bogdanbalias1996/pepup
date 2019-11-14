import * as React from 'react';
import { Text, View, Modal, Switch } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { closeAlert } from '../../pages/Alert/actions';
import { AlertProps, AlertState } from '.';
import styles from './SuccessfulAlert.styles';
import { IGlobalState } from '../../coreTypes';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { colorLightYellow } from '../../variables';
import { setDeveloperMode } from '../../pages/Login/actions';

const mapStateToProps = (state: IGlobalState) => ({
  isAlertShown: state.AlertState.isAlertShown,
  title: state.AlertState.title,
  text: state.AlertState.text,
  onPress: state.AlertState.onPress,
  isDevAlert: state.AlertState.isDevAlert,
  developerMode: state.LoginState.developerMode
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeAlert: () => dispatch(closeAlert()),
  setDeveloperMode: (value: boolean) => dispatch(setDeveloperMode(value))
});

export class Component extends React.PureComponent<AlertProps, AlertState> {
  constructor(props: AlertProps) {
    super(props);

    this.state = {
      isSwitchOn: null
    };
  }

  componentDidUpdate(prevProps: AlertProps, prevState: AlertState) {
    if (prevState.isSwitchOn === null) {
      this.setState({ isSwitchOn: prevProps.developerMode });
    }
  }

  toggleSwitch = () => {
    this.setState({ isSwitchOn: !this.state.isSwitchOn });
  };

  onSubmit = () => {
    const { isDevAlert, setDeveloperMode, onPress, closeAlert } = this.props;
    const { isSwitchOn } = this.state;

    if (isDevAlert) {
      setDeveloperMode(!!isSwitchOn);
      closeAlert();
    } else {
      onPress ? onPress() : closeAlert();
    }
  };

  render() {
    const { title, text, isAlertShown, closeAlert, isDevAlert } = this.props;

    const { isSwitchOn } = this.state;

    return (
      <Modal
        transparent
        visible={isAlertShown}
        onRequestClose={() => closeAlert()}>
        <View style={styles.modal}>
          <View style={styles.wrapModalContent}>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{title}</Text>
              {!isDevAlert ? (
                <Text style={styles.text}>{text}</Text>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={[styles.text, styles.switchLabelText]}>
                    {text}
                  </Text>
                  <Switch
                    trackColor={{ true: colorLightYellow, false: 'grey' }}
                    thumbColor="white"
                    ios_backgroundColor="grey"
                    value={!!isSwitchOn}
                    onValueChange={this.toggleSwitch}
                  />
                </View>
              )}
            </View>
            <ButtonStyled
              style={styles.btnSubmit}
              onPress={this.onSubmit}
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
  mapDispatchToProps
)(Component);
