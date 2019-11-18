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
import { colorBlack, boldFont, colorTextViolet, colorModalTextGrey } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { CheckboxStyled } from '../CheckboxStyled/CheckboxStyled';
import { openAlert } from '../../pages/Alert/actions';
import { AlertProps } from '../SuccessfulAlert';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupModal } from '../PepupModal/PepupModal';

const mapStateToProps = (state: IGlobalState) => ({
  isModalReqShown: state.PepupState.isModalReqShown,
  celebData: state.PepupState.celebData,
  isFetching: state.PepupState.isFetching,
  name: state.LoginState.name
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePepupReqModal: () => dispatch(closePepupReqModal()),
  sendRequestForPepup: (data: RequestPepupScreenFromData, setErrors: any) =>
    dispatch(sendRequestForPepup(data, setErrors) as any),
  openAlert: (data: AlertProps) => dispatch(openAlert(data))
});

const RequestSchema = Yup.object().shape({
  name: Yup.string().required(),
  text: Yup.string().required()
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
      celebData,
      name
    } = this.props;

    return (
      celebData && (
        <PepupModal
          visible={isModalReqShown}
          onRequestClose={() => closePepupReqModal()}
          heightContent={this.state.heightDescription}>
          <View style={styles.upperWrap}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closePepupReqModal()}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>
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
                          <Text style={styles.title}>{`Hi ${name},`}</Text>
                          <Text style={[styles.text, { color: colorModalTextGrey }]}>
                            How can I pepup yo life? I can answer some questions
                            or give you advice or simply wish you or your loved
                            ones for a special occassion. Tell me more below!
                            Don’t be shy 😎 -{' '}
                            <Text style={{ color: colorTextViolet }}>
                              {celebData.userInfo.name}
                            </Text>
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
                                label="Jaggu"
                                returnKeyType="done"
                                formProps={props}
                              />
                            </View>
                            <View style={styles.inputWrap}>
                              <Text style={styles.subTitle}>
                                Provide specific instructions
                              </Text>
                              <TextInputBorderStyled
                                name="text"
                                label={`Please be as specific as possible. If it’s a birthday or an anniversary wish, please specify dates and names.`}
                                inputStyle={{
                                  height: 180,
                                  marginVertical: 20,
                                  lineHeight: 21
                                }}
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
                                  ]}>{`Feature video on ${
                                    celebData.userInfo.name
                                    }'s Pepup Page`}</Text>
                              </View>
                              
                              <Text>
                                <Text
                                  style={[
                                    styles.disclaimerText,
                                    { fontFamily: boldFont }
                                  ]}>
                                  NOTE:{' '}
                                </Text>
                                <Text style={styles.disclaimerText}>
                                  We will only charge you when we fulfill your
                                  Pepup request. Your Pepup will be ready within
                                  7 days.
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                    <View style={styles.modalFooter}>
                      <ButtonStyled
                        style={styles.btnSubmit}
                        onPress={handleSubmit}
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
