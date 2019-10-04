import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Text, View, Keyboard, Image, TouchableOpacity } from 'react-native';
import { LoginScreenProps, LoginScreenFromData } from './';
import styles from './Login.styles';
import { loginUser } from './actions';

import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { TextInputStyled } from '../../components/TextInputStyled/TextInputStyled';
import { TextInputPassword } from '../../components/TextInputStyled/TextInputPassword';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { IGlobalState } from '../../coreTypes';

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.LoginState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (data: LoginScreenFromData, setErrors: any, navigation: any) =>
    dispatch(loginUser(data, setErrors, navigation) as any)
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const Component: React.SFC<LoginScreenProps> = ({
  navigation,
  loginUser,
  isFetching
}): JSX.Element => {
  const handleSubmit = (values: LoginScreenFromData, { setErrors }: any) => {
    loginUser(values, setErrors, navigation);
    Keyboard.dismiss();
  };

  return (
    <PepupBackground style={styles.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../assets/logo2x.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.wrapContent}>
          <Text style={styles.title}>Sign In</Text>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
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
                    name="email"
                    label="Email"
                    keyboardType="email-address"
                    formProps={props}
                  />
                  <TextInputPassword
                    name="password"
                    label="Password"
                    formProps={props}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.btnForgetPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <ButtonStyled
                    style={styles.btnSubmit}
                    onPress={() => handleSubmit()}
                    text="Log In"
                    loader={isFetching}
                  />
                </View>
              );
            }}
          </Formik>
          <TouchableOpacity
            style={styles.createAccountContainer}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.createAccountText}>
              Don’t have an account?{' '}
              <Text style={styles.createAccountLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.loginWithText}>Log In with</Text>
          <View style={styles.wrapSocialBtns}>
            <ButtonStyled
              style={styles.fbButton}
              onPress={() => alert('ok')}
              type="blue"
              text="Facebook"
              iconName="facebook"
            />
            <ButtonStyled
              style={styles.googleButton}
              onPress={() => alert('ok')}
              type="orange"
              text="Google"
              iconName="google"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </PepupBackground>
  );
};

Component.displayName = 'LoginScreen';

export const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
