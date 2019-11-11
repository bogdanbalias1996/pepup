import * as React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import styles from './EditProfile.styles';
import { Dispatch } from 'redux';
import { IGlobalState } from '../../coreTypes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputStyledForEdit } from '../../components/TextInputStyled/TextInputStyledForEdit';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import {
  EditProfileScreenProps,
  EditProfileScreenFromData,
  EditProfileScreenFromFormik
} from '.';
import { editProfile } from './actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Icon } from '../../components/Icon/Icon';
import { colorTextGrey } from '../../variables';
import { videoRecordModalOpen } from '../RecordVideo/actions';
import { VideoType } from '../../components/ModalRecordVideo/';
import { getCeleb } from '../Pepups/actions';
import { TextInputPasswordForEdit } from '../../components/TextInputStyled/TextInputPasswordForEdit';
import { goBack } from '../../navigationService';

const mapStateToProps = (state: IGlobalState) => ({
  profileData: state.ProfileState.profileData,
  isFetching: state.ProfileState.isFetching,
  userId: state.LoginState.userId,
  celebData: state.PepupState.celebData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editProfile: (data: EditProfileScreenFromData, setErrors: any) =>
    dispatch(editProfile(data, setErrors) as any),
  videoRecordModalOpen: (entityId: string, videoType: VideoType) => dispatch(videoRecordModalOpen(entityId, videoType)),
  getCeleb: (id: string) => dispatch(getCeleb(id) as any)
});

const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
});

export class Component extends React.PureComponent<EditProfileScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        navigation={navigation}
        title={'Profile'.toUpperCase()}
        getLeftComponent={() => {
          return (
            <TouchableOpacity onPress={() => goBack()}>
              <Icon name="left" />
            </TouchableOpacity>
          );
        }}
      />
    )
  });

  state = {
    birthdayDatePickerVisible: false
  };

  componentDidMount() {
    const { getCeleb, userId } = this.props;

    getCeleb(userId);
  }

  handleSubmit = (values: EditProfileScreenFromFormik, { setErrors }: any) => {
    const { editProfile, userId } = this.props;

    editProfile(
      {
        ...values,
        userId
      },
      setErrors
    );

    Keyboard.dismiss();
  };

  render() {
    const {
      profileData,
      isFetching,
      videoRecordModalOpen,
      celebData
    } = this.props;

    return (
      profileData &&
      celebData && (
        <PepupBackground>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.wrapContent}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            enableAutomaticScroll={true}
          >
            <Formik
              initialValues={{
                email: profileData.email,
                name: profileData.name,
                newPasswd: '',
                dob: '',
                city: '',
                address: '',
                country: '',
                phoneNumber: '',
                intro: celebData.dataInfo.intro,
                bio: celebData.dataInfo.who,
                introVideo: ''
              }}
              validationSchema={EditSchema}
              onSubmit={this.handleSubmit}>
              {(props: any) => {
                const { handleSubmit, errors, touched, setFieldValue } = props;

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
                        <View style={styles.scrollContent}>
                          <TextInputStyledForEdit
                            name="name"
                            label="full name"
                            formProps={props}
                            multiline={false}
                          />
                          <TextInputStyledForEdit
                            name="intro"
                            label="intro"
                            formProps={props}
                            multiline={false}
                          />
                          <TextInputStyledForEdit
                            name="bio"
                            label="bio"
                            formProps={props}
                            multiline={true}
                            numberOfLines={3}
                            blurOnSubmit={true}
                            inputStyle={{ height: 120 }}
                          />
                          <TouchableOpacity
                            onPress={() => videoRecordModalOpen(celebData.mappedUserId, 'celebIntroVideo')}>
                            <TextInputStyledForEdit
                              name="introVideo"
                              pointerEvents="none"
                              editable={false}
                              label="click to record intro video"
                              formProps={props}
                              iconName="video-camera"
                              iconColor={colorTextGrey}
                            />
                          </TouchableOpacity>
                          <View style={styles.private}>
                            <Text style={styles.privateTitle}>
                              PRIVATE INFORMATION
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({
                                  birthdayDatePickerVisible: true
                                })
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
                                this.setState({
                                  birthdayDatePickerVisible: false
                                });
                                setFieldValue(
                                  'dob',
                                  format(date, 'd MMM yyyy').toString()
                                );
                              }}
                              onCancel={() =>
                                this.setState({
                                  birthdayDatePickerVisible: false
                                })
                              }
                            />
                            <TextInputStyledForEdit
                              name="address"
                              label="address"
                              formProps={props}
                              multiline={false}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%'
                              }}>
                              <View style={{ width: '50%' }}>
                                <TextInputStyledForEdit
                                  name="city"
                                  label="city"
                                  formProps={props}
                                  multiline={false}
                                />
                              </View>
                              <View style={{ width: '50%' }}>
                                <TextInputStyledForEdit
                                  name="country"
                                  label="country"
                                  formProps={props}
                                  multiline={false}
                                />
                              </View>
                            </View>

                            <TextInputStyledForEdit
                              name="email"
                              label="email"
                              keyboardType="email-address"
                              formProps={props}
                              multiline={false}
                            />

                            <TextInputStyledForEdit
                              name="phoneNumber"
                              label="phone"
                              keyboardType="phone-pad"
                              formProps={props}
                              multiline={false}
                            />

                            <TextInputPasswordForEdit
                              name="newPasswd"
                              label="new password"
                              keyboardType="numeric"
                              formProps={props}
                              multiline={false}
                            />
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                    <View style={styles.footer}>
                      <ButtonStyled
                        style={styles.btnSubmit}
                        onPress={handleSubmit}
                        text="SAVE"
                        loader={isFetching}
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </KeyboardAwareScrollView>
        </PepupBackground>
      )
    );
  }
}

export const EditProfileCelebScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
