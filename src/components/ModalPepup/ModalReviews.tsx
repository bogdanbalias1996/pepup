import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-native-modalbox';
import StarRating from 'react-native-star-rating';

import { closeReviewsModal } from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ModalReviewsProps } from './';
import styles from './ModalPepup.styles';
import { colorBlack, colorBlueberry } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  isModalReviewShown: state.PepupState.isModalReviewShown,
  reviews: state.PepupState.reviews,
  celebData: state.PepupState.celebData,
  isFetching: state.PepupState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeReviewsModal: () => dispatch(closeReviewsModal())
});

export class Component extends React.PureComponent<ModalReviewsProps> {
  render() {
    const {
      closeReviewsModal,
      isModalReviewShown,
      reviews,
      celebData,
      isFetching
    } = this.props;

    const [rating, totalRating] = celebData ? celebData.weightedRating.split('/') : ['0', '0'];

    return (celebData && reviews &&
      <Modal
        isOpen={isModalReviewShown}
        swipeToClose={true}
        coverScreen={false}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeReviewsModal()}
        style={styles.modal}
        >
        <View style={styles.wrapModalContent}>
          <View style={styles.swiperLine} />
          <ScrollView style={styles.scrollview}>
            <View style={styles.headerReviews}>
              <View style={styles.header}>
                <Text style={styles.title}>{celebData.userInfo.name}</Text>
                <View style={styles.rate}>
                  <Image
                    style={styles.rateImg}
                    source={require('../../../assets/fullStar.png')}
                  />
                  <View style={styles.rateText}>
                    <Text style={styles.actualR}>{`${rating}/`}</Text>
                    <Text style={styles.generalR}>{totalRating}</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.text, styles.subTitle]}>
                {`${celebData.dataInfo.intro} • ${celebData.totalPepupsFulfilled} Pepups`}
              </Text>
            </View>
            <View style={styles.rewiewsNumber}>
              <Text style={[styles.text, styles.numberRewiewsText]}>
                {`${celebData.reviews} reviews`}
              </Text>
            </View>
            <Loader
              isDataLoaded={!isFetching}
              color={colorBlueberry}
              size="large"
            >
              <View>
                {reviews.map((item, i) => {
                  return (
                    <View
                      key={i}
                      style={[styles.commentCard, styles.commentCardOnModal]}
                    >
                      <View style={styles.commentHeader}>
                        <Text style={[styles.text, styles.commentTitle]}>
                          {item.submitterUserInfo.name}
                        </Text>
                        <StarRating
                          disabled={true}
                          starSize={20}
                          maxStars={+totalRating}
                          emptyStar={require('../../../assets/emptyStar.png')}
                          fullStar={require('../../../assets/fullStar.png')}
                          rating={item.rating}
                        />
                      </View>
                      <Text style={[styles.text, styles.commentText]}>
                        {item.review}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Loader>
          </ScrollView>
          <View style={[styles.modalFooter, styles.modalFooterReviews]}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeReviewsModal()}
            >
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export const ModalReviews = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
