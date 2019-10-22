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
import {
  EditProfileScreenProps,
  EditProfileScreenFromData,
  EditProfileScreenFromFormik,
} from '.';
import {editProfile} from './actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {navigate} from '../../navigationService';
import {Icon} from '../../components/Icon/Icon';
import {colorBlack, colorTextGray} from '../../variables';
import {ModalRecordVideo} from '../../components/ModalRecordVideo/ModalRecordVideo';
import { openVideoRecordModal } from '../Profile/actions';

const Header = (
  props: JSX.IntrinsicAttributes & {
    navigation: any;
    title?: any;
    getLeftComponent?: (() => null) | undefined;
    getRightComponent?: (() => null) | undefined;
  },
) => <HeaderRounded {...props} title={'Profile'.toUpperCase()} />;

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
  openVideoRecordModal: () => dispatch(openVideoRecordModal()),
});

const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

export class Component extends React.PureComponent<EditProfileScreenProps> {
  static navigationOptions = ({navigation}: any) => ({
    header: (
      props: JSX.IntrinsicAttributes & Pick<any, string | number | symbol>,
    ) => <ConnectedHeader {...props} navigation={navigation} />,
  });

  state = {
    birthdayDatePickerVisible: false,
  };

  handleSubmit = (values: EditProfileScreenFromFormik, {setErrors}: any) => {
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
    const {profileData, isFetching, openVideoRecordModal} = this.props;
    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Formik
            initialValues={{
              email: profileData.email,
              name: profileData.name,
              newPasswd: '',
              dob: '',
              profileInfo: {
                address: '',
                country: '',
                city: '',
                phoneNumber: '',
                intro: '',
                bio: '',
                introVideo: '',
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
                  <View style={styles.scrollview}>
                    <ScrollView>
                      <TextInputStyledForEdit
                        name="name"
                        label="full name"
                        formProps={props}
                      />
                      <TextInputStyledForEdit
                        name="profileInfo.intro"
                        label="intro"
                        formProps={props}
                      />
                      <TextInputStyledForEdit
                        name="profileInfo.bio"
                        label="bio"
                        formProps={props}
                        multiline={true}
                        numberOfLines={3}
                        inputStyle={{height: 120}}
                      />
                      <TouchableOpacity onPress={() => openVideoRecordModal()}>
                        <TextInputStyledForEdit
                          name="profileInfo.introVideo"
                          pointerEvents="none"
                          editable={false}
                          label="click to record intro video"
                          formProps={props}
                          iconName="video-camera"
                          iconColor={colorTextGray}
                        />
                      </TouchableOpacity>
                      <View style={styles.private}>
                        <Text style={styles.privateTitle}>
                          PRIVATE INFORMATION
                        </Text>
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
                        <TextInputStyledForEdit
                          name="profileInfo.address"
                          label="address"
                          formProps={props}
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
                      </View>
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

export const EditProfileCelebScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);