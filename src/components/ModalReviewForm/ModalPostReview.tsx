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
  pepupData: state.ProfileState.pepupData,
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
      pepupData
    } = this.props;

    const [, totalRating] = pepupData
      ? pepupData.celebInfo.weightedRating.split('/')
      : [, ''];

    return (
      pepupData && (
        <PepupModal
          visible={isModalPostReviewShown}
          onRequestClose={closePostReviewModal}
          heightContent={this.state.heightDescription}>
          {pepupData && Object.keys(pepupData).length !== 0 && (
            <View style={styles.wrapModalContent}>
              <Formik
                initialValues={{
                  review: '',
                  rating: 0
                }}
                validationSchema={ReviewSchema}
                onSubmit={this.handleSubmit}>
                {(props: any) => {
                  const { handleSubmit, setFieldValue, values } = props;

                  return (
                    <View style={styles.wrap}>
                      <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={closePostReviewModal}>
                        <Icon size={20} name="cancel" color={colorBlack} />
                      </TouchableOpacity>
                      <ScrollView>
                        <View style={styles.scrollContent}>
                          <View
                            style={styles.form}
                            onLayout={event => {
                              const { height } = event.nativeEvent.layout;
                              Object.keys(pepupData).length !== 0 &&
                                this.setState({ heightDescription: height });
                            }}>
                            <View style={{paddingBottom: 55, justifyContent: 'space-between' }}>
                              <View style={styles.inputWrap}>
                                <Text style={styles.subTitle}>
                                  {`Say Thanks to ${
                                    pepupData.celebInfo.userInfo.name
                                  }`}
                                </Text>
                                <TextInputBorderStyled
                                  name="review"
                                  label="Type your reaction here"
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
                                  activeOpacity={1}
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
                          <ButtonStyled
                            style={styles.btnSubmit}
                            onPress={handleSubmit}
                            text='SUBMIT'
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
