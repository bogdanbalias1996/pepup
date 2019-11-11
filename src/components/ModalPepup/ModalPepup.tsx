import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  ListRenderItem
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Video } from 'expo-av';

import {
  closePepupModal,
  openPepupReqModal,
  openVideoModal,
  getAllReviews,
  openReviewsModal
} from '../../pages/Pepups/actions';
import { PepupModal } from '../PepupModal/PepupModal';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalPepupProps, RenderItemMedia } from './';
import styles from './ModalPepup.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ModalVideo } from '../ModalVideo/ModalVideo';
import { ModalPepupReq } from '../ModalPepupReq/ModalPepupReq';
import { ModalReviews } from './ModalReviews';
import { ErrorModal } from '../ErrorState/ErrorState';
import { Pepup } from '../../pages/Profile';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.PepupState.isModalShown,
  celebData: state.PepupState.celebData,
  isFetching: state.PepupState.isFetching,
  isFetchingCeleb: state.PepupState.isFetchingCeleb,
  reviews: state.PepupState.reviews,
  userId: state.LoginState.userId
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePepupModal: () => dispatch(closePepupModal()),
  openPepupReqModal: () => dispatch(openPepupReqModal()),
  openVideoModal: (videoUrl: string) => dispatch(openVideoModal(videoUrl)),
  openReviewsModal: () => dispatch(openReviewsModal()),
  getAllReviews: (id: string) => dispatch(getAllReviews(id) as any)
});

export class Component extends React.PureComponent<ModalPepupProps> {
  state = {
    heightDescription: 0
  };

  getReviews = () => {
    const { celebData, openReviewsModal, getAllReviews } = this.props;

    openReviewsModal();
    celebData && getAllReviews(celebData.userInfo.id);
  }

  renderItem = (item: RenderItemMedia & ListRenderItem<Pepup>) => {
    return (
      <View style={styles.carouselCard}>
        <View style={styles.carouselAvatar}>
          <Video
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
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
      userId
    } = this.props;

    const videoUrl =
      celebData && celebData.dataInfo['intro-video']
        ? `${celebData.mediaBasePath}${celebData.dataInfo['intro-video']}`
        : 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

    return (
      <PepupModal
        visible={isModalShown}
        isLoading={this.props.isFetchingCeleb}
        onRequestClose={() => closePepupModal()}
        heightContent={this.state.heightDescription}>
        {!!celebData && (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={styles.scrollContent}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  Object.keys(celebData).length !== 0 &&
                    this.setState({ heightDescription: height });
                }}>
                <View style={{ paddingHorizontal: 24 }}>
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
                <View style={{ overflow: 'hidden', position: 'relative' }}>
                  <Card style={styles.avatarWrapper}>
                    <CardGradient />
                    <Video
                      source={{ uri: videoUrl }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      isLooping={true}
                      resizeMode="cover"
                      useNativeControls={false}
                      style={styles.avatar}
                    />
                  </Card>
                  <TouchableOpacity
                    style={styles.wrapVideo}
                    onPress={() => openVideoModal(videoUrl)}>
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={require('../../../assets/play.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 24 }}>
                  <Text style={[styles.text, styles.infoText]}>
                    {celebData.dataInfo.who}
                  </Text>
                  {/* <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={celebData.media}
                    renderItem={this.renderItem}
                    keyExtractor={(item: Pepup) => item.id}
                    style={styles.carousel}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  /> */}
                  {celebData.dataInfo.review && (
                    <View style={styles.reviews}>
                      <View style={styles.rewiewsHeader}>
                        <Text style={[styles.text, styles.numberRewiewsText]}>
                          {`${celebData.reviews} reactions`}
                        </Text>
                        <TouchableOpacity onPress={() => this.getReviews()}>
                          <Text style={[styles.text, styles.allRewiewsButton]}>
                            Check all reactions
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.commentCard}>
                        <View style={styles.commentHeader}>
                          <Text style={[styles.text, styles.commentTitle]}>
                            {celebData.dataInfo.review.submitterUserInfo.name}
                          </Text>
                        </View>
                        <Text style={[styles.text, styles.commentText]}>
                          {celebData.dataInfo.review.review}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              {userId === celebData.mappedUserId ? (
                <ButtonStyled
                  style={styles.btnSubmitClose}
                  onPress={() => closePepupModal()}
                  text="CLOSE"
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => closePepupModal()}>
                    <Icon size={20} name="cancel" color={colorBlack} />
                  </TouchableOpacity>
                  <ButtonStyled
                    style={styles.btnSubmit}
                    onPress={() => openPepupReqModal()}
                    text="Fill out request form"
                  />
                </>
              )}
            </View>
          </View>
        )}
        <ModalPepupReq />
        <ModalVideo />
        <ModalReviews />
        <ErrorModal />
      </PepupModal>
    );
  }
}

export const ModalPepup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
