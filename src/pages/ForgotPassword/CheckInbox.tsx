import * as React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dispatch } from "redux";
import styles from "./ForgotPassword.styles";
import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { navigate } from "../../navigationService";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { resetPassword } from "./actions";
import { ResetpassScreenFromData, ResetpassScreenProps } from "./";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (data: ResetpassScreenFromData, setErrors: any) =>
    dispatch(resetPassword(data, setErrors) as any)
});

export class Component extends React.PureComponent<ResetpassScreenProps> {
  render() {
    const { resetPassword, navigation } = this.props;

    return (
      <PepupBackground style={styles.background}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View
            style={styles.imageWrapper}
          >
            <Image
              source={require("../../../assets/logo2x.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapContent}>
            <View style={{ width: "100%" }}>
              <Text style={styles.title}>Check your Inbox</Text>
              <Text style={styles.description}>
                We have sent instructions to{" "}
                <Text style={styles.createAccountEmail}>
                    {navigation.state.params && navigation.state.params.emailId}
                </Text>
                {"\n"}. Please follow these instructions to set your new
                password.
              </Text>
              <ButtonStyled
                style={styles.btnSubmit}
                onPress={() => {
                  navigate({ routeName: "Login" });
                }}
                text="Back to login"
              />

              <View style={styles.createAccountContainer}>
                <TouchableOpacity
                  onPress={() => resetPassword( {emailId: navigation.state.params.emailId} ) }
                >
                  <Text style={styles.resetText}>
                    Didn’t receive the email yet? Please check your spam folder
                    or click{" "}
                    <Text style={styles.createAccountLink}>
                      Resend Instructions
                    </Text>
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

export const CheckInboxScreen = connect(
  null,
  mapDispatchToProps
)(Component);
