import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Dispatch } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { closeContestTestModal } from '../../pages/Contests/actions';
import { Icon } from '../Icon/Icon';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { ModalContestTestProps } from '.';
import styles from './ModalContests.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { TextInputBorderStyled } from '../TextInputStyled/TextInputBorderStyled';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestTestModal: () => dispatch(closeContestTestModal())
});

const TestSchema = Yup.object().shape({
  text: Yup.string().required("Please type person's name")
});

export class Component extends React.PureComponent<ModalContestTestProps> {
  handleSubmit = () => {};

  render() {
    const { closeContestTestModal, isModalTestShown, contestData } = this.props;

    return (
      <Modal
        isOpen={isModalTestShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeContestTestModal()}
        style={styles.modal}
      >
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <Formik
            initialValues={{ text: '' }}
            //validationSchema={TestSchema}
            onSubmit={this.handleSubmit}
          >
            {(props: any) => {
              const {
                values,
                handleSubmit,
                errors,
                touched,
                setFieldValue
              } = props;
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
                  <ScrollView>
                    <View style={styles.conTitle}>
                      <Image
                        style={styles.avatar}
                        source={require('../../../assets/mock_avatar.jpg')}
                        resizeMode="cover"
                      />
                      <Text style={styles.title}>{contestData.title}</Text>
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
                        <View style={styles.itemWrap}>
                          <Text style={styles.subTitle}>
                            Describe your design and the inspiration behind it
                          </Text>
                          <TextInputBorderStyled
                            name="text"
                            label="Type your description here"
                            inputStyle={{ height: 100 }}
                            multiline={true}
                            numberOfLines={3}
                            formProps={props}
                          />
                        </View>
                        <View style={styles.itemWrap}>

                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  <View style={[styles.modalFooter, styles.modalFooterContest]}>
                    <TouchableOpacity
                      style={styles.btnCancel}
                      onPress={() => closeContestTestModal()}
                    >
                      <Icon size={24} name="cancel" color={colorBlack} />
                    </TouchableOpacity>
                    <ButtonStyled
                      style={styles.btnSubmit}
                      onPress={() => handleSubmit()}
                      text="Submit"
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
        <SuccessfulAlert />
        <ErrorModal />
      </Modal>
    );
  }
}

export const ModalContestDesign = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
