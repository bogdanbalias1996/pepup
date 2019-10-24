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

import { closeContestTestModal } from '../../pages/Contests/actions';
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
  closeContestTestModal: () => dispatch(closeContestTestModal())
});

const media = [
  {
    id: '01',
    avatar: require('../../../assets/mock_avatar.jpg')
  }
];

const TestSchema = Yup.object().shape({
  name: Yup.string().required('Please type your request'),
  text: Yup.string().required("Please type person's name")
});

const testData = [
  {
    id: '1',
    question: '1. Who was the first person in space?',
    options: [
      { key: '1', text: 'A. Gagarin' },
      { key: '2', text: 'B. Armstrong' },
      { key: '3', text: 'C. Tereshkova' },
      { key: '4', text: 'D. Aldrin' }
    ]
  },
  {
    id: '2',
    question: '2. What was the Hatiko breed?',
    options: [
      { key: '1', text: 'A. Beagle' },
      { key: '2', text: 'B. Doberman' },
      { key: '3', text: 'C. Akita Inu' },
      { key: '4', text: 'D. Huskie' }
    ]
  },
  {
    id: '3',
    question: '3. How many goals did Pele score for his career',
    options: [
      { key: '1', text: 'A. 1281' },
      { key: '2', text: 'B. 77' },
      { key: '3', text: 'C. 650' },
      { key: '4', text: 'D. 1300' }
    ]
  }
];

export class Component extends React.PureComponent<ModalContestQuizProps> {
  handleSubmit = () => {};

  getInitValues = (arr: { reduce: (arg0: (el: any) => string) => void; }) => {
    arr.reduce((el: { id: any; }) => {
      return [el.id] = '';
    });
  };

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
            initialValues={this.getInitValues(testData)}
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
                          {testData.map(val => {
                            return (
                              <RadioButtonsContest
                                options={val.options}
                                onPress={(item: { key: any; }) => {
                                  setFieldValue(val.id, item.key);
                                }}
                                question={val.question}
                                value={values[val.id]}
                              />
                            );
                          })}
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
                      onPress={() => alert('ok')}
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
