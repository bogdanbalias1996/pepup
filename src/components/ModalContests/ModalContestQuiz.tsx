import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import FastImage from 'react-native-fast-image';

import {
  closeContestQuizModal,
  submitEnrty
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
import Card from '../Card';
import CardGradient from '../CardGradient';
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const mapStateToProps = (state: IGlobalState) => ({
  isModalTestShown: state.ContestState.isModalTestShown,
  contestData: state.ContestState.contestData,
  isFetching: state.ContestState.isFetching,
  submitEntryData: state.ContestState.submitEntryData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitEnrty: (values: any, id: string, type: string, contestType: string) =>
    dispatch(submitEnrty(values, id, type, contestType) as any),
  closeContestQuizModal: () => dispatch(closeContestQuizModal())
});

const getInitValues = (arr: any) => {
  return arr.reduce((acc: any, cur: any) => {
    const { question } = cur;
    return { ...acc, [question]: '' };
  }, {});
};

export class Component extends React.PureComponent<ModalContestQuizProps> {
  state = {
    heightDescription: 0
  };

  isAllFieldsFilled = (obj: any) => {
    for (var i in obj) {
      if (obj[i] === '') return false;
    }
    return true;
  };

  render() {
    const {
      closeContestQuizModal,
      isModalTestShown,
      contestData,
      isFetching,
      values,
      handleSubmit,
      setFieldValue
    } = this.props;

    return (
      contestData && (
        <PepupModal
          visible={isModalTestShown}
          onRequestClose={() => closeContestQuizModal()}
          heightContent={this.state.heightDescription}>
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 55 }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeContestQuizModal()}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>

            <View style={styles.wrap}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={[styles.scrollContent, { paddingBottom: 0 }]}
                  onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    Object.keys(contestData).length !== 0 &&
                      this.setState({ heightDescription: height });
                  }}>
                  <View style={styles.conTitle}>
                    <Card style={styles.cardAvatar} radius={8}>
                      <CardGradient style={styles.gradient} />
                      <FastImage
                        style={styles.contestImage}
                        source={{
                          uri: `${contestData.mediaBasePath}${
                            contestData.organizerLogo
                          }`,
                          priority: FastImage.priority.normal
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </Card>
                    <Text style={styles.title}>{contestData.title}</Text>
                  </View>
                  
                  <View style={styles.form}>
                    <View style={{ justifyContent: 'space-between' }}>
                      <View style={styles.itemWrap}>
                        {contestData.dataInfo[
                          'contest-info'
                        ].submissionInfo.questions.map(
                          (val: any, index: number) => {
                            return (
                              <RadioButtonsContest
                                options={val.options.map(
                                  (answer: string, index: number) => {
                                    return `${alphabet[
                                      index
                                    ].toUpperCase()}. ${answer}`;
                                  }
                                )}
                                onPress={(item: any) => {
                                  setFieldValue(val.question, item);
                                }}
                                question={`${index + 1}. ${val.question}`}
                                value={values[val.question]}
                                key={index}
                              />
                            );
                          }
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={[styles.modalFooter, { position: 'relative' }]}>
                    <ButtonStyled
                      style={styles.btnSubmit}
                      type={ this.isAllFieldsFilled(values) ? '' : 'grey' } 
                      loader={isFetching}
                      onPress={() =>
                        this.isAllFieldsFilled(values) ? handleSubmit() : {}
                      }
                      text="Submit"
                    />
                  </View>
                </View>
              </ScrollView>
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
    return getInitValues(
      props.contestData.dataInfo['contest-info'].submissionInfo.questions
    );
  },

  handleSubmit: (values, { props }) => {
    props.submitEnrty(
      values,
      props.contestData.id,
      props.contestData.dataInfo['contest-info'].submissionInfo.mediaType,
      props.contestData.type
    );
  }
})(Component);

export const ModalContestQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestForm);
