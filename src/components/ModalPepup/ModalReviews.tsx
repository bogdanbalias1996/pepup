import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { closeReviewsModal } from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ModalReviewsProps } from './';
import styles from './ModalPepup.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { PepupModal } from '../PepupModal/PepupModal';

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
  state = {
    heightDescription: 0
  };

  render() {
    const {
      closeReviewsModal,
      isModalReviewShown,
      reviews,
      celebData
    } = this.props;

    return (
      celebData &&
      reviews && (
        <PepupModal
          visible={isModalReviewShown}
          isLoading={this.props.isFetching}
          onRequestClose={() => closeReviewsModal()}
          heightContent={this.state.heightDescription}>
          <View style={{ flex: 1, paddingTop: 55, paddingHorizontal: 24 }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closeReviewsModal()}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={styles.scrollContent}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(celebData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}>
                <View style={styles.headerReviews}>
                  <View style={styles.header}>
                    <Text style={styles.title}>{celebData.userInfo.name}</Text>
                  </View>
                  <Text style={[styles.text, styles.subTitle]}>
                    {celebData.dataInfo.intro}
                  </Text>
                  <Text
                    style={[styles.text, styles.subTitle, { marginTop: 5 }]}>
                    {`${celebData.totalPepupsFulfilled} Pepups`}
                  </Text>
                </View>
                <View style={styles.rewiewsNumber}>
                  <Text style={[styles.text, styles.numberRewiewsText]}>
                    {`${celebData.reviews} reactions`}
                  </Text>
                </View>
                <View>
                  {reviews.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={[styles.commentCard, styles.commentCardOnModal]}>
                        <View style={styles.commentHeader}>
                          <Text style={[styles.text, styles.commentTitle]}>
                            {item.submitterUserInfo.name}
                          </Text>
                        </View>
                        <Text style={[styles.text, styles.commentText]}>
                          {item.review}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={[styles.modalFooter, styles.modalFooterReviews]} />
        </PepupModal>
      )
    );
  }
}

export const ModalReviews = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
