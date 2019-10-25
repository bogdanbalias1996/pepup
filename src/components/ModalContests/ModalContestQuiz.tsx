import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Dispatch } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { closeContestQuizModal } from '../../pages/Contests/actions';
import { Icon } from '../Icon/Icon';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { ModalContestQuizProps } from '.';
import styles from './ModalContests.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { RadioButtonsContest } from '../RadioButtons/RadioButtonsContest';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestQuizModal: () => dispatch(closeContestQuizModal())
});

const TestSchema = Yup.object().shape({
  name: Yup.string().required('Please type your request'),
  text: Yup.string().required("Please type person's name")
});


export class Component extends React.PureComponent<ModalContestQuizProps> {
  handleSubmit = (

  ) => {};

  getInitValues = (arr:any) => {
    arr.reduce((el: { id: any; }) => {
      return [el.id] = '';
    });
  };

  render() {
    const { closeContestQuizModal, isModalTestShown, contestData } = this.props;

    return (
      contestData && 
      <Modal
        isOpen={isModalTestShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeContestQuizModal()}
        style={styles.modal}
      >
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <Formik
            initialValues={this.getInitValues(contestData.dataInfo['contest-info'].submissionInfo.questions)}
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
                        source={{uri: contestData.mediaBasePath + contestData.organizerLogo}}
                        resizeMode="contain"
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
                          {contestData.dataInfo['contest-info'].submissionInfo.questions.map((val:any) => {
                            return (
                              <RadioButtonsContest
                                options={val.options}
                                onPress={(item:any) => {
                                  setFieldValue(val.question, item);
                                }}
                                question={val.question}
                                value={values[val.question]}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  <View style={[{backgroundColor: 'transparent'}, styles.modalFooter, styles.modalFooterContest, ]}>
                    <TouchableOpacity
                      style={styles.btnCancel}
                      onPress={() => closeContestQuizModal()}
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

export const ModalContestQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
