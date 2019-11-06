import * as React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, TouchableOpacity, Image, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dispatch } from 'redux';

import styles from './ForgotPassword.styles';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { TextInputStyled } from '../../components/TextInputStyled/TextInputStyled';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { navigate } from '../../navigationService';
import { ResetpassScreenFromData, ResetpassScreenProps } from './';
import { resetPassword } from './actions';
import { IGlobalState } from '../../coreTypes';

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.LoginState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (data: ResetpassScreenFromData, setErrors: any) =>
    dispatch(resetPassword(data, setErrors) as any)
});

const ForgotPassSchema = Yup.object().shape({
  emailId: Yup.string()
    .email('Invalid email')
    .required('Email is required')
});

export class Component extends React.PureComponent<ResetpassScreenProps> {
  handleSubmit = (values: ResetpassScreenFromData, { setErrors }: any) => {
    this.props.resetPassword(values, setErrors);
    Keyboard.dismiss();
  };

  render() {
    const { isFetching } = this.props;

    return (
      <PepupBackground style={styles.background}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../../assets/logo2x.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapContent}>
            <View style={{ width: '100%' }}>
              <Text style={styles.title}>Forgot password?</Text>
              <Text style={styles.description}>
                Don’t worry.{'\n'} Resetting your password is easy, just tell us
                the email address you registered with Pepup.
              </Text>

              <Formik
                initialValues={{
                  emailId: ''
                }}
                validationSchema={ForgotPassSchema}
                onSubmit={this.handleSubmit}>
                {(props: any) => {
                  const { handleSubmit, errors, touched } = props;

                  const formattedErrorString = Object.keys(errors)
                    .reduce((acc: Array<string>, key: string) => {
                      const value = (errors as any)[key];
                      if ((touched as any)[key] && acc.indexOf(value) < 0) {
                        acc.push(value);
                      }
                      return acc;
                    }, [])
                    .join('. ');

                  return (
                    <View style={styles.form}>
                      {Boolean(formattedErrorString) && (
                        <View style={styles.formErrorContainer}>
                          <Text style={styles.formError}>
                            {formattedErrorString}
                          </Text>
                        </View>
                      )}
                      <TextInputStyled
                        name="emailId"
                        label="Email"
                        formProps={props}
                        keyboardType="email-address"
                      />

                      <ButtonStyled
                        style={styles.btnSubmit}
                        onPress={() => handleSubmit()}
                        text="Submit"
                        loader={isFetching}
                      />
                    </View>
                  );
                }}
              </Formik>

              <View style={styles.createAccountContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigate({ routeName: 'Login' });
                  }}>
                  <Text style={styles.createAccountText}>
                    Go back to{' '}
                    <Text style={styles.createAccountLink}>Login</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </PepupBackground>
    );
  }
}

export const ForgotPasswordScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
