import * as React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';

import {
  closePepupReqModal,
  sendRequestForPepup
} from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { TextInputBorderStyled } from '../../components/TextInputStyled/TextInputBorderStyled';
import { RequestPepupProps, RequestPepupScreenFromData } from './';
import styles from './ModalPepupReq.styles';
import { colorBlack, boldFont } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { CheckboxStyled } from '../CheckboxStyled/CheckboxStyled';
import { openAlert } from '../../pages/Alert/actions';
import { AlertProps } from '../SuccessfulAlert';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupModal } from '../PepupModal/PepupModal';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

const mapStateToProps = (state: IGlobalState) => ({
  isModalReqShown: state.PepupState.isModalReqShown,
  celebData: state.PepupState.celebData,
  categoryId: state.PepupState.selectedCategory,
  isFetching: state.PepupState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePepupReqModal: () => dispatch(closePepupReqModal()),
  sendRequestForPepup: (data: RequestPepupScreenFromData, setErrors: any) =>
    dispatch(sendRequestForPepup(data, setErrors) as any),
  openAlert: (data: AlertProps) => dispatch(openAlert(data))
});

const RequestSchema = Yup.object().shape({
  name: Yup.string().required('Please type your request'),
  text: Yup.string().required("Please type person's name")
});

export class Component extends React.PureComponent<RequestPepupProps> {
  state = { heightDescription: 0 };

  handleSubmit = (values: RequestPepupScreenFromData, { setErrors }: any) => {
    const { sendRequestForPepup } = this.props;

    sendRequestForPepup(values, setErrors);
  };

  render() {
    const {
      closePepupReqModal,
      isModalReqShown,
      isFetching,
      celebData
    } = this.props;

    const fullName = celebData ? celebData.userInfo.name.split(' ') : ['', ''];

    return (
      celebData && (
        <PepupModal
          visible={isModalReqShown}
          onRequestClose={() => closePepupReqModal()}
          heightContent={this.state.heightDescription}>
          <View style={{ paddingHorizontal: 24, flex: 1, paddingTop: 10 }}>
            <Formik
              initialValues={{
                name: '',
                text: '',
                shareCheckbox: true
              }}
              validationSchema={RequestSchema}
              onSubmit={this.handleSubmit}>
              {(props: any) => {
                const { handleSubmit, setFieldValue, values } = props;

                return (
                  <View style={styles.wrap}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View
                        style={styles.scrollContent}
                        onLayout={event => {
                          const { height } = event.nativeEvent.layout;
                          Object.keys(celebData).length !== 0 &&
                            this.setState({ heightDescription: height });
                        }}>
                        <View style={styles.reqTitle}>
                          <Card style={styles.avatarWrapper}>
                            <CardGradient style={{ borderRadius: 15 }} />
                            <FastImage
                              style={styles.avatar}
                              source={{
                                uri: celebData.userInfo.icon,
                                priority: FastImage.priority.normal
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </Card>
                          <Text
                            style={[
                              styles.title,
                              {
                                textAlign: 'center',
                                fontFamily: boldFont
                              }
                            ]}>
                            {celebData.userInfo.name}
                          </Text>
                        </View>
                        <View style={styles.form}>
                          <View style={{ justifyContent: 'space-between' }}>
                            <View style={styles.inputWrap}>
                              <Text style={styles.subTitle}>
                                This Pepup is for
                              </Text>
                              <TextInputBorderStyled
                                name="name"
                                label="Requested for..."
                                returnKeyType="done"
                                formProps={props}
                                inputStyle={{ height: 42 }}
                              />
                            </View>
                            <View style={styles.inputWrap}>
                              <Text style={styles.subTitle}>
                                Provide specific instructions
                              </Text>
                              <TextInputBorderStyled
                                name="text"
                                label={`Type your request for ${celebData.userInfo.name} here. For eg. You can ask for birthday wishes, motivation, or to wish you the best of luck.`}
                                inputStyle={{ height: 180 }}
                                blurOnSubmit={true}
                                returnKeyType="done"
                                multiline={true}
                                numberOfLines={5}
                                formProps={props}
                              />
                              <View style={styles.checkboxWrap}>
                                <CheckboxStyled
                                  checked={values.shareCheckbox}
                                  onPress={() =>
                                    setFieldValue(
                                      'shareCheckbox',
                                      !values.shareCheckbox
                                    )
                                  }
                                />
                                <Text
                                  style={[
                                    styles.subTitle,
                                    styles.checkText
                                  ]}>{`Feature video on ${celebData.userInfo.name}'s Pepup Page`}</Text>
                              </View>
                              <Text style={styles.disclaimerText}>
                                NOTE: We will only charge you when we fulfill
                                your Pepup request. Your Pepup will be ready
                                within 7 days.
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                    <View style={styles.modalFooter}>
                      <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => closePepupReqModal()}>
                        <Icon size={20} name="cancel" color={colorBlack} />
                      </TouchableOpacity>
                      <ButtonStyled
                        style={styles.btnSubmit}
                        onPress={() => handleSubmit()}
                        text={`Request for ${celebData.fee} INR  `}
                        loader={isFetching}
                        iconSource={require('../../../assets/coins.png')}
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
          <SuccessfulAlert />
          <ErrorModal />
        </PepupModal>
      )
    );
  }
}

export const ModalPepupReq = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
