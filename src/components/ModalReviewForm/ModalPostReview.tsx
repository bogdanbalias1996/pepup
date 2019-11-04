import * as React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StarRating from 'react-native-star-rating';

import { closePostReviewModal, postReview } from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { TextInputBorderStyled } from '../../components/TextInputStyled/TextInputBorderStyled';
import { ModalPostReviewProps, PostReviewFormProps } from './';
import styles from './ModalPostReview.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { SuccessfulAlert } from '../SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from '../ErrorState/ErrorState';
import { PepupModal } from '../PepupModal/PepupModal';

const mapStateToProps = (state: IGlobalState) => ({
  isModalPostReviewShown: state.PepupState.isModalPostReviewShown,
  celebData: state.PepupState.celebData,
  isFetching: state.PepupState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePostReviewModal: () => dispatch(closePostReviewModal()),
  postReview: (data: PostReviewFormProps, setErrors: any) =>
    dispatch(postReview(data, setErrors) as any)
});

const ReviewSchema = Yup.object().shape({
  review: Yup.string().required('Please type your review'),
  rating: Yup.string().required('Please rate celebrity')
});

export class Component extends React.PureComponent<ModalPostReviewProps> {
  handleSubmit = (values: PostReviewFormProps, { setErrors }: any) => {
    const { postReview } = this.props;

    postReview(values, setErrors);
  };

  state = {
    heightDescription: 0
  };

  render() {
    const {
      closePostReviewModal,
      isModalPostReviewShown,
      isFetching,
      celebData
    } = this.props;

    const [, totalRating] = celebData
      ? celebData.weightedRating.split('/')
      : [, ''];

    return (
      celebData && (
        <PepupModal
          visible={isModalPostReviewShown}
          onRequestClose={() => closePostReviewModal()}
          isLoading={isFetching}
          heightContent={this.state.heightDescription}>
          {celebData && Object.keys(celebData).length !== 0 && (
            <View style={styles.wrapModalContent}>
              <Formik
                initialValues={{
                  review: '',
                  rating: 0
                }}
                validationSchema={ReviewSchema}
                onSubmit={this.handleSubmit}>
                {(props: any) => {
                  const {
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                    values
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
                        <View style={styles.scrollContent}>
                          <View
                            style={styles.form}
                            onLayout={event => {
                              const { height } = event.nativeEvent.layout;
                              Object.keys(celebData).length !== 0 &&
                                this.setState({ heightDescription: height });
                            }}>
                            {Boolean(formattedErrorString) && (
                              <View style={styles.formErrorContainer}>
                                <Text style={styles.formError}>
                                  {formattedErrorString}
                                </Text>
                              </View>
                            )}
                            <View style={{ justifyContent: 'space-between' }}>
                              <View style={styles.inputWrap}>
                                <Text style={styles.subTitle}>
                                  {`Say Thanks to ${celebData.userInfo.name}`}
                                </Text>
                                <TextInputBorderStyled
                                  name="review"
                                  label="Type your review here"
                                  inputStyle={{ height: 180 }}
                                  multiline={true}
                                  numberOfLines={5}
                                  formProps={props}
                                  blurOnSubmit={true}
                                />
                              </View>
                              <View style={styles.starsWrap}>
                                <StarRating
                                  name="rating"
                                  disabled={false}
                                  starSize={45}
                                  maxStars={+totalRating}
                                  rating={values.rating}
                                  emptyStar={require('../../../assets/emptyStar.png')}
                                  fullStar={require('../../../assets/fullStar.png')}
                                  selectedStar={rating =>
                                    setFieldValue('rating', rating)
                                  }
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </ScrollView>

                      <View style={styles.footerWrap}>
                        <View style={styles.modalFooter}>
                          <TouchableOpacity
                            style={styles.btnCancel}
                            onPress={() => closePostReviewModal()}>
                            <Icon size={20} name="cancel" color={colorBlack} />
                          </TouchableOpacity>
                          <ButtonStyled
                            style={styles.btnSubmit}
                            onPress={() => handleSubmit()}
                            text="SUBMIT"
                            loader={isFetching}
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </View>
          )}
          <SuccessfulAlert />
          <ErrorModal />
        </PepupModal>
      )
    );
  }
}

export const ModalPostReview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
