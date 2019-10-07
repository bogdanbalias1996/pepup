import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Keyboard, ScrollView} from 'react-native';

import {PepupBackground} from '../../components/PepupBackground/PepupBackground';
import {HeaderRounded} from '../../components/HeaderRounded/HeaderRounded';
import styles from './EditProfile.styles';
import {Dispatch} from 'redux';
import {IGlobalState} from '../../coreTypes';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInputStyledForEdit} from '../../components/TextInputStyled/TextInputStyledForEdit';
import {ButtonStyled} from '../../components/ButtonStyled/ButtonStyled';
import {EditProfileScreenProps, EditProfileScreenFromData} from '.';
import {editProfile} from './actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {navigate} from '../../navigationService';
import {Icon} from '../../components/Icon/Icon';
import {colorBlack} from '../../variables';

const Header = props => (
  <HeaderRounded {...props} title={'Profile'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null,
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
  profileData: state.ProfileState.profileData,
  isFetching: state.ProfileState.isFetching,
  userId: state.LoginState.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editProfile: (data: EditProfileScreenFromData, setErrors: any) =>
    dispatch(editProfile(data, setErrors) as any),
});

const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

export class Component extends React.PureComponent<EditProfileScreenProps> {
  static navigationOptions = ({navigation}) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />,
  });

  state = {
    birthdayDatePickerVisible: false,
  };

  handleSubmit = (values: EditProfileScreenFromData, {setErrors}: any) => {
    const {editProfile, userId} = this.props;

    editProfile(
      {
        ...values,
        userId,
      },
      setErrors,
    );
    Keyboard.dismiss();
  };

  render() {
    const {profileData, isFetching} = this.props;
    return (
      <PepupBackground>
        <Header />
        <View style={styles.wrapContent}>
          <Formik
            initialValues={{
              email: profileData.email,
              name: profileData.name,
              newPasswd: '',
              dob: '',
              profileInfo: {
                country: '',
                city: '',
                phoneNumber: '',
              },
            }}
            validationSchema={EditSchema}
            onSubmit={this.handleSubmit}>
            {(props: any) => {
              const {handleSubmit, errors, touched, setFieldValue} = props;

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
                  <View style={{flexGrow: 1}}>
                    <ScrollView>
                      <TextInputStyledForEdit
                        name="name"
                        label="full name"
                        formProps={props}
                      />

                      <TouchableOpacity
                        onPress={() =>
                          this.setState({birthdayDatePickerVisible: true})
                        }>
                        <TextInputStyledForEdit
                          name="dob"
                          pointerEvents="none"
                          editable={false}
                          label="birthday"
                          formProps={props}
                        />
                      </TouchableOpacity>
                      <DateTimePicker
                        mode="date"
                        isVisible={this.state.birthdayDatePickerVisible}
                        onConfirm={date => {
                          this.setState({birthdayDatePickerVisible: false});
                          setFieldValue(
                            'dob',
                            format(date, 'd MMM yyyy').toString(),
                          );
                        }}
                        onCancel={() =>
                          this.setState({birthdayDatePickerVisible: false})
                        }
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                        }}>
                        <View style={{width: '50%'}}>
                          <TextInputStyledForEdit
                            name="profileInfo.city"
                            label="city"
                            formProps={props}
                          />
                        </View>
                        <View style={{width: '50%'}}>
                          <TextInputStyledForEdit
                            name="profileInfo.country"
                            label="country"
                            formProps={props}
                          />
                        </View>
                      </View>

                      <TextInputStyledForEdit
                        name="email"
                        label="email"
                        keyboardType="email-address"
                        formProps={props}
                      />

                      <TextInputStyledForEdit
                        name="profileInfo.phoneNumber"
                        label="phone"
                        keyboardType="phone-pad"
                        formProps={props}
                      />

                      <TextInputStyledForEdit
                        name="newPasswd"
                        label="new password"
                        keyboardType="numeric"
                        secure={true}
                        formProps={props}
                      />
                    </ScrollView>
                  </View>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={styles.btnCancel}
                      onPress={() => navigate({routeName: 'Profile'})}>
                      <Icon size={24} name="cancel" color={colorBlack} />
                    </TouchableOpacity>
                    <ButtonStyled
                      textBold={true}
                      style={styles.btnSubmit}
                      onPress={() => handleSubmit()}
                      text="SAVE"
                      loader={isFetching}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </PepupBackground>
    );
  }
}

export const EditProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
