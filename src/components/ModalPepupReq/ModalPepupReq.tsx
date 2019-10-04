import * as React from 'react';
import { Dispatch } from 'redux';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  closePepupReqModal,
  sendRequestForPepup
} from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { TextInputBorderStyled } from '../../components/TextInputStyled/TextInputBorderStyled';
import { ModalPepupReqProps, RequestPepupProps } from './';
import styles from './ModalPepupReq.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { CheckboxStyled } from '../CheckboxStyled/CheckboxStyled';

const mapStateToProps = (state: IGlobalState) => ({
  showModalReq: state.PepupState.showModalReq,
  celebData: state.PepupState.celebData,
  celebId: state.PepupState.celebData.id,
  categoryId: state.PepupState.selectedCategory,
  isFetching: state.PepupState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePepupReqModal: () => dispatch(closePepupReqModal()),
  sendRequestForPepup: (data: RequestPepupProps, setErrors: any) =>
    dispatch(sendRequestForPepup(data, setErrors) as any)
});

const RequestSchema = Yup.object().shape({
  name: Yup.string().required('Please type your request'),
  text: Yup.string().required("Please type person's name")
});

export class Component extends React.PureComponent<ModalPepupReqProps> {
  handleSubmit = (values: RequestPepupProps, { setErrors }: any) => {
    const { sendRequestForPepup } = this.props;
    sendRequestForPepup(values, setErrors);
  };

  render() {
    const {
      closePepupReqModal,
      showModalReq,
      isFetching,
      celebData
    } = this.props;

    const fullName = celebData.userInfo.name.split(' ');

    return (
      <Modal
        isOpen={showModalReq}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closePepupReqModal()}
        style={styles.modal}
      >
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <Formik
            initialValues={{
              name: '',
              text: '',
              shareCheckbox: false
            }}
            validationSchema={RequestSchema}
            onSubmit={this.handleSubmit}
          >
            {(props: any) => {
              const { handleSubmit, errors, touched, setFieldValue, values } = props;

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
                <View style={styles.wrap}>
                  <ScrollView style={styles.scrollview}>
                    <View>
                      <View style={styles.reqTitle}>
                        <Image
                          style={styles.avatar}
                          source={require('../../../assets/mock_avatar.jpg')}
                          resizeMode="cover"
                        />
                        <Text style={[styles.title, { textAlign: 'center' }]}>
                          Book{' '}
                          <Text style={[styles.title, { textAlign: 'center' }]}>
                            {'\n'}
                            {celebData.userInfo.name}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.form}>
                      {Boolean(formattedErrorString) && (
                        <View style={styles.formErrorContainer}>
                          <Text style={styles.formError}>
                            {formattedErrorString}
                          </Text>
                        </View>
                      )}
                      <View style={{ justifyContent: 'space-between' }}>
                        <View style={styles.inputWrap}>
                          <Text style={styles.subTitle}>This Pepup is for</Text>
                          <TextInputBorderStyled
                            name="name"
                            label="Requested for..."
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
                            label="Type your request here"
                            inputStyle={{ height: 180 }}
                            multiline={true}
                            numberOfLines={5}
                            formProps={props}
                          />
                          <View style={styles.checkboxWrap}>
                            <CheckboxStyled
                              checked={values.shareCheckbox}
                              onPress={() =>
                               setFieldValue('shareCheckbox', !values.shareCheckbox)
                              }
                            />
                            <Text style={[styles.subTitle, styles.checkText]}>{`Feature video on ${fullName[0]}'s Pepup Page`}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>

                  <View style={styles.footerWrap}>
                    <Text style={styles.disclaimerText}>
                      DISCLAIMER: We will issue you a refund, if we are unable
                      to fulfill your request in 7 days.{' '}
                    </Text>
                    <View style={styles.modalFooter}>
                      <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => closePepupReqModal()}
                      >
                        <Icon size={24} name="cancel" color={colorBlack} />
                      </TouchableOpacity>
                      <ButtonStyled
                        style={styles.btnSubmit}
                        onPress={() => handleSubmit()}
                        text={`Request for ${celebData.billRate} INR`}
                        loader={isFetching}
                        iconSource={require('../../../assets/coins.png')}
                        width="250"
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </Modal>
    );
  }
}

export const ModalPepupReq = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);