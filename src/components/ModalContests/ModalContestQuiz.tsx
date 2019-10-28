import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import {
  closeContestQuizModal,
  submitEnrty,
} from '../../pages/Contests/actions';
import { Icon } from '../Icon/Icon';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { ModalContestQuizProps } from '.';
import styles from './ModalContests.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { RadioButtonsContest } from '../RadioButtons/RadioButtonsContest';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupModal } from '../PepupModal/PepupModal';

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData,
  isFetching: state.ContestState.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitEnrty: (values: any, id: string, type: string, contestType: string) =>
    dispatch(submitEnrty(values, id, type, contestType) as any),
  closeContestQuizModal: () => dispatch(closeContestQuizModal()),
});

const getValidationSchema = (keys: string[]) => {
  const schema = Yup.object().shape({
    ...keys.reduce((acc, cur) => {
      return { ...acc, [cur]: Yup.string().required() };
    }, {}),
  });

  return schema;
};

const getInitValues = (arr: any) => {
  return arr.reduce((acc: any, cur: any) => {
    const { question } = cur;
    return { ...acc, [question]: '' };
  }, {});
};

export class Component extends React.PureComponent<ModalContestQuizProps> {
  state = {
    heightDescription: 0,
  };

  render() {
    const {
      closeContestQuizModal,
      isModalTestShown,
      contestData,
      isFetching,
      values,
      handleSubmit,
      errors,
      touched,
      setFieldValue,
    } = this.props;

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
      contestData && (
        <PepupModal
          visible={isModalTestShown}
          onRequestClose={() => closeContestQuizModal()}
          heightContent={this.state.heightDescription}>
          <View style={{ flex: 1, paddingHorizontal: 24 }}>
            <View style={styles.swiperLine} />
            <View style={styles.wrap}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={styles.scrollContent}
                  onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    Object.keys(contestData).length !== 0 &&
                      this.setState({ heightDescription: height });
                  }}>
                  <View style={styles.conTitle}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri:
                          contestData.mediaBasePath + contestData.organizerLogo,
                      }}
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
                        {contestData.dataInfo[
                          'contest-info'
                        ].submissionInfo.questions.map(
                          (val: any, index: number) => {
                            return (
                              <RadioButtonsContest
                                options={val.options}
                                onPress={(item: any) => {
                                  setFieldValue(val.question, item);
                                }}
                                question={val.question}
                                value={values[val.question]}
                                key={index}
                              />
                            );
                          },
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => closeContestQuizModal()}>
                  <Icon size={24} name="cancel" color={colorBlack} />
                </TouchableOpacity>
                <ButtonStyled
                  style={styles.btnSubmit}
                  loader={isFetching}
                  onPress={() => handleSubmit()}
                  text="Submit"
                />
              </View>
            </View>
          </View>
          <SuccessfulAlert />
          <ErrorModal />
        </PepupModal>
      )
    );
  }
}

const ContestForm = withFormik({
  mapPropsToValues: (props: any) => {
    return {
      ...getInitValues(
        props.contestData.dataInfo['contest-info'].submissionInfo.questions,
      ),
      globalError: false,
    };
  },

  validate: (values, props) => {
    const initKeys = Object.keys(
      getInitValues(
        props.contestData.dataInfo['contest-info'].submissionInfo.questions,
      ),
    );
    const isValid = getValidationSchema(initKeys)
      .validate(values)
      .then(values => values)
      .catch(err => {
        throw { globalError: 'All fields are required' };
      });
    return isValid;
  },

  handleSubmit: (values, { props }) => {
    props.submitEnrty(
      values,
      props.contestData.id,
      props.contestData.dataInfo['contest-info'].submissionInfo.mediaType,
      props.contestData.type,
    );
  },
})(Component);

export const ModalContestQuiz = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContestForm);
