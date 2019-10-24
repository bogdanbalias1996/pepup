import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dispatch } from "redux";
import { View, Text, TouchableOpacity, Image, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { TextInputPassword } from "../../components/TextInputStyled/TextInputPassword";
import { TextInputStyled } from "../../components/TextInputStyled/TextInputStyled";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { _retrieveData } from "../../common/utils/helpers";

import { signupUser } from "./actions";
import styles from "./SignUp.styles";
import { SignupScreenFromData, SignupScreenProps } from "./";
import { IGlobalState } from "../../coreTypes";

const mapStateToProps = ( state: IGlobalState ) => ({
  isFetching: state.LoginState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signupUser: (data: SignupScreenFromData, setErrors: any, navigation: any) =>
    dispatch(signupUser(data, setErrors, navigation) as any)
});

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required")
});

export const Component : React.SFC<SignupScreenProps> = ({
  navigation,
  isFetching,
  signupUser
}): JSX.Element => {
  const handleSubmit = (values: SignupScreenFromData, { setErrors }: any) => {
    signupUser(values, setErrors, navigation);
    Keyboard.dismiss();
  };

  return (
    <PepupBackground style={{ paddingTop: 0 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
          <View style={{flexGrow: 1, alignItems: "center", justifyContent: "center", paddingBottom: 20}}>
            <Image
              source={require("../../../assets/logo2x.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapContent}>
          <Text style={styles.title}>Sign Up</Text>
          <Formik
            initialValues={{
              email: "",
              name: "",
              password: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
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
                .join(". ");

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
                  <TextInputStyled
                    name="name"
                    label="Full name"
                    formProps={props}
                  />

                  <TextInputPassword
                    name="password"
                    label="Password"
                    formProps={props}
                  />

                  <ButtonStyled
                    style={styles.btnSubmit}
                    onPress={() => handleSubmit()}
                    text="Sign Up"
                    loader={isFetching}
                  />
                </View>
              );
            }}
          </Formik>
          <TouchableOpacity
            style={styles.createAccountContainer}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.createAccountText}>
              Already have an account?{" "}
              <Text style={styles.createAccountLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.loginWithText}>Sign Up with</Text>
          <View style={styles.wrapSocialBtns}>
            <ButtonStyled
              style={{ flex: 1 }}
              onPress={() => alert("ok")}
              type="blue"
              text="Facebook"
              iconName="facebook"
            />
            <ButtonStyled
              style={{ marginLeft: 10, flex: 1 }}
              onPress={() => alert("ok")}
              type="orange"
              text="Google"
              iconName="google"
            />
          </View> */}
        </View>
      </KeyboardAwareScrollView>
    </PepupBackground>
  );
};

Component.displayName = "SignUp";

export const SignUpScreen = connect(mapStateToProps, mapDispatchToProps)(Component);
