import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Keyboard, ScrollView} from 'react-native';

import {PepupBackground} from '../../components/PepupBackground/PepupBackground';
import {HeaderRounded} from '../../components/HeaderRounded/HeaderRounded';
import styles from './ErrorState.styles';
import {Dispatch} from 'redux';
import {IGlobalState} from '../../coreTypes';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInputStyledForEdit} from '../../components/TextInputStyled/TextInputStyledForEdit';
import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import {ErrorStateProps} from '.';
import {navigate} from '../../navigationService';
import {colorBlack} from '../../variables';

const Header = props => (
  <HeaderRounded {...props} title={'Title'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null,
)(Header);

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export class Component extends React.PureComponent<ErrorStateProps> {
  static navigationOptions = ({navigation}: any) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />,
  });

  state = {
    birthdayDatePickerVisible: false,
  };

  handleSubmit = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <PepupBackground>
        <Header />
        <View style={styles.wrapContent}>
            <Image
                source={requ}
                style={styles.image}
            />

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
      </PepupBackground>
    );
  }
}

export const EditProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
