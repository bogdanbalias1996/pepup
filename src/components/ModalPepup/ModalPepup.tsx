import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  ListRenderItem,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-native-modalbox';
import StarRating from 'react-native-star-rating';
import { Video } from 'expo-av';

import {
  closePepupModal,
  openPepupReqModal,
  openVideoModal,
  getAllReviews,
  openReviewsModal,
} from '../../pages/Pepups/actions';
import { PepupModal } from '../PepupModal/PepupModal';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalPepupProps, RenderItemMedia } from './';
import styles from './ModalPepup.styles';
import { colorBlack, colorBlueberry } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ModalVideo } from '../ModalVideo/ModalVideo';
import { ModalPepupReq } from '../ModalPepupReq/ModalPepupReq';
import { ModalReviews } from './ModalReviews';
import { ErrorModal } from '../ErrorState/ErrorState';
import { Pepup } from '../../pages/Profile';
import { Loader } from '../Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.PepupState.isModalShown,
  celebData: state.PepupState.celebData,
  isFetching: state.PepupState.isFetching,
  reviews: state.PepupState.reviews,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePepupModal: () => dispatch(closePepupModal()),
  openPepupReqModal: () => dispatch(openPepupReqModal()),
  openVideoModal: () => dispatch(openVideoModal()),
  openReviewsModal: () => dispatch(openReviewsModal()),
  getAllReviews: (id: string) => dispatch(getAllReviews(id) as any),
});

export class Component extends React.PureComponent<ModalPepupProps> {
  state = {
    heightDescription: 0,
  };

  getReviews = () => {
    const { celebData, openReviewsModal, getAllReviews } = this.props;

    openReviewsModal();
    celebData ? getAllReviews(celebData.userInfo.id) : () => {};
  };

  renderItem = (item: RenderItemMedia & ListRenderItem<Pepup>) => {
    return (
      <View style={styles.carouselCard}>
        <View style={styles.carouselAvatar}>
          <Video
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping={true}
            resizeMode="contain"
            useNativeControls={true}
            style={[styles.carouselAvatar, { overflow: 'hidden' }]}
          />
        </View>
        <Text style={[styles.text, styles.carouselTitle]}>{item.title}</Text>
        <Text style={[styles.text, styles.carouselDate]}>{item.date}</Text>
      </View>
    );
  };

  render() {
    const {
      closePepupModal,
      openPepupReqModal,
      isModalShown,
      celebData,
      openVideoModal,
    } = this.props;

    const videoUrl = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
    const [rating, totalRating] = celebData
      ? celebData.weightedRating.split('/')
      : ['0', '0'];

    return (
      celebData && (
        <PepupModal
          visible={isModalShown}
          onRequestClose={() => closePepupModal()}
          heightContent={this.state.heightDescription}>
          <View style={styles.swiperLine} />
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}>
            <View
              style={styles.scrollContent}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                Object.keys(celebData).length !== 0 &&
                  this.setState({ heightDescription: height });
              }}>
              <View style={{ position: 'relative' }}>
                <View>
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
                  <View
                    style={[
                      styles.avatar,
                      { overflow: 'hidden', marginVertical: 20 },
                    ]}>
                    <Loader
                      isDataLoaded={!!videoUrl}
                      size="large"
                      color={colorBlueberry}>
                      <Video
                        source={{
                          uri: videoUrl,
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        isLooping={true}
                        resizeMode="cover"
                        useNativeControls={false}
                        style={styles.avatar}
                      />
                    </Loader>
                    <TouchableOpacity
                      style={styles.wrapVideo}
                      onPress={() => openVideoModal()}>
                      <Image
                        style={{ width: 60, height: 60 }}
                        source={require('../../../assets/play.png')}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.text, styles.infoText]}>
                    {celebData.dataInfo.who}
                  </Text>
                </View>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={celebData.media}
                  ListEmptyComponent={() =>
                    !celebData.media ? (
                      <Text style={styles.nopepups}>No Pepups fulfilled!</Text>
                    ) : null
                  }
                  renderItem={this.renderItem}
                  keyExtractor={(item: Pepup) => item.id}
                  style={styles.carousel}
                  contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                {celebData.dataInfo.review ? (
                  <View style={styles.reviews}>
                    <View style={styles.rewiewsHeader}>
                      <Text style={[styles.text, styles.numberRewiewsText]}>
                        {`${celebData.reviews} reviews`}
                      </Text>
                      <TouchableOpacity onPress={() => this.getReviews()}>
                        <Text style={[styles.text, styles.allRewiewsButton]}>
                          Check all reviews
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.commentCard}>
                      <View style={styles.commentHeader}>
                        <Text style={[styles.text, styles.commentTitle]}>
                          {celebData.dataInfo.review.submitterUserInfo.name}
                        </Text>
                        <StarRating
                          disabled={true}
                          starSize={20}
                          maxStars={+totalRating}
                          emptyStar={require('../../../assets/emptyStar.png')}
                          fullStar={require('../../../assets/fullStar.png')}
                          rating={celebData.dataInfo.review.rating}
                        />
                      </View>
                      <Text style={[styles.text, styles.commentText]}>
                        {celebData.dataInfo.review.review}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <Text style={styles.footerText}>
                  <Text style={styles.greenText}>24 Hour</Text>
                  <Text style={styles.regularText}>{' Response Time • '}</Text>
                  <Text style={styles.greenText}>100%</Text>
                  <Text style={styles.regularText}>{' Response Rate'}</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closePepupModal()}>
              <Icon size={24} name="cancel" color={colorBlack} />
            </TouchableOpacity>
            <ButtonStyled
              style={styles.btnSubmit}
              onPress={() => openPepupReqModal()}
              text="Fill out request form"
            />
          </View>
          <ModalPepupReq />
          <ModalVideo />
          <ModalReviews />
          <ErrorModal />
        </PepupModal>
      )
    );
  }
}

export const ModalPepup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
