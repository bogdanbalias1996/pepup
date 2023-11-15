import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  closePepupModal,
  openPepupReqModal,
  getAllReviews,
  openReviewsModal
} from '../../pages/Pepups/actions';
import { PepupModal } from '../PepupModal/PepupModal';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalPepupProps } from './';
import styles from './ModalPepup.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ModalVideo } from '../ModalVideo/ModalVideo';
import { ModalPepupReq } from '../ModalPepupReq/ModalPepupReq';
import { ModalReviews } from './ModalReviews';
import { ErrorModal } from '../ErrorState/ErrorState';
import VideoCard from '../VideoCard';
import EmojiBar from '../EmojiBar';
import FeaturedPepupListItem from './FeaturedPepupListItem';
import CharityPartnersListItem from './CharityPartnersListItem';

const EmojiBarData = [
  {
    name: 'thinking_face',
    description: 'Question'
  },
  {
    name: 'hugging_face',
    description: 'Advice'
  },
  {
    name: 'nerd_face',
    description: 'Idea'
  },
  {
    name: 'smile',
    description: 'Wish'
  }
]

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
  openReviewsModal: () => dispatch(openReviewsModal()),
  getAllReviews: (id: string) => dispatch(getAllReviews(id) as any)
});

const featuredPepupsMock = [
  {
    date: '14 Aug 2019',
    for: 'for Trish Devato',
    video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  },
  {
    date: '14 Aug 2019',
    for: 'for Trish Devato',
    video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  },
  {
    date: '14 Aug 2019',
    for: 'for Trish Devato',
    video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  }
]

const supportsCharitiesMock = [
  {
    title: 'Peta',
    img: 'https://placedog.net/86/60'
  },
  {
    title: 'UNICEF',
    img: 'http://placekitten.com/86/60'
  },
  {
    title: 'UNICEF',
    img: 'https://placedog.net/86/60'
  }
]

export class Component extends React.PureComponent<ModalPepupProps> {
  state = {
    heightDescription: 0
  };

  getReviews = () => {
    const { celebData, openReviewsModal, getAllReviews } = this.props;

    openReviewsModal();
    celebData && getAllReviews(celebData.userInfo.id);
  };

  render() {
    const {
      closePepupModal,
      openPepupReqModal,
      isModalShown,
      celebData,
      userId
    } = this.props;

    const isSameUser = celebData ? userId === celebData.mappedUserId : false;

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
          <View style={{ flex: 1, paddingTop: 70 }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => closePepupModal()}>
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

                <View style={styles.header}>
                  <Text style={styles.title}>{celebData.userInfo.name}</Text>
                </View>
                <Text style={[styles.text, styles.subTitle]}>
                  {`${celebData.dataInfo.intro} • ${celebData.totalPepupsFulfilled} Pepups`}
                </Text>

                <View style={styles.celebInfoBlock}>
                  <VideoCard
                    videoUrl={videoUrl}
                    height={164}
                    width={94}
                  />
                  <Text style={[styles.text, styles.infoText]}>
                    {celebData.dataInfo.who}
                  </Text>
                </View>

                {
                  !isSameUser && (
                    <View>
                      <EmojiBar data={EmojiBarData} />
                      <ButtonStyled
                        style={styles.btnSubmit}
                        styleGradient={{ borderRadius: 6 }}
                        onPress={() => openPepupReqModal()}
                        text="ASK ME ANYTHING"
                      />
                    </View>
                  )
                }

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Featured Pepups</Text>
                  <FlatList
                    data={featuredPepupsMock}
                    renderItem={FeaturedPepupListItem}
                    keyExtractor={(item: any, index: number) => `${index}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Supports Charities</Text>
                  <FlatList
                    data={supportsCharitiesMock}
                    renderItem={CharityPartnersListItem}
                    keyExtractor={(item: any, index: number) => `${index}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                {celebData.dataInfo.review && (
                  <View style={styles.reviews}>
                    <View style={styles.rewiewsHeader}>
                      <Text style={[styles.text, styles.numberRewiewsText]}>
                        {`${celebData.reviews} reactions`}
                      </Text>
                      <TouchableOpacity onPress={() => this.getReviews()}>
                        <Text style={[styles.text, styles.allRewiewsButton]}>
                          See all reactions
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
            </ScrollView>
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
