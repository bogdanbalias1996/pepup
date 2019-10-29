import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  closeContestModal,
  openContestQuizModal
} from '../../pages/Contests/actions';
import { Icon } from '../../components/Icon/Icon';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { ModalContestsProps } from './';
import styles from './ModalContests.styles';
import { colorBlack } from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { ModalContestQuiz } from './ModalContestQuiz';
import { ModalContestDesign } from './ModalContestDesign';
import { ErrorModal } from '../ErrorState/ErrorState';
import { ImageSafe } from '../ImageSafe/ImageSafe';
import { PepupModal } from '../PepupModal/PepupModal';

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.ContestState.isModalShown,
  contestData: state.ContestState.contestData,
  isFetchingContest: state.ContestState.isFetchingContest
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeContestModal: () => dispatch(closeContestModal()),
  openContestQuizModal: () => dispatch(openContestQuizModal())
});

export class Component extends React.PureComponent<ModalContestsProps> {
  state = {
    heightDescription: 0
  };

  render() {
    const {
      closeContestModal,
      isModalShown,
      contestData,
      openContestQuizModal,
      isFetchingContest
    } = this.props;
    return (
      <PepupModal
        visible={isModalShown}
        onRequestClose={() => closeContestModal()}
        isLoading={isFetchingContest}
        heightContent={this.state.heightDescription}>
        {contestData && Object.keys(contestData).length !== 0 ? (
          <View style={{ flex: 1, paddingHorizontal: 24 }}>
            <View style={styles.swiperLine} />
            <View style={styles.wrap}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.scrollContent}>
                  <View
                    onLayout={event => {
                      const { height } = event.nativeEvent.layout;
                      Object.keys(contestData).length !== 0 &&
                        this.setState({ heightDescription: height });
                    }}>
                    <ImageSafe
                      isLoaded={!!contestData.contestImage}
                      style={styles.image}
                      iconSource={{
                        uri:
                          contestData.mediaBasePath + contestData.contestImage
                      }}
                      resizeModeImg="contain"
                    />
                    <Text style={styles.title}>{contestData.title}</Text>
                    <Text style={styles.descriptionTitle}>
                      Contest details:
                    </Text>
                    <Text style={[styles.text, styles.infoText]}>
                      {contestData.dataInfo.details}
                    </Text>
                    <Text style={styles.descriptionTitle}>Contest rules:</Text>
                    <Text style={[styles.text, styles.infoText]}>
                      {contestData.dataInfo.rules}
                    </Text>
                    <View style={styles.infoBlock}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Prize</Text>
                        <Text style={styles.infoValue}>
                          {contestData.prize}
                        </Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>End Date</Text>
                        <Text style={styles.infoValue}>
                          {contestData.endDt}
                        </Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Participants</Text>
                        <Text style={styles.infoValue}>
                          {contestData.entries}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => closeContestModal()}>
                  <Icon size={24} name="cancel" color={colorBlack} />
                </TouchableOpacity>
                <ButtonStyled
                  style={styles.btnSubmit}
                  onPress={() => openContestQuizModal()}
                  text="Enter contest"
                />
              </View>
            </View>
          </View>
        ) : null}
        {contestData && contestData.type === 'QUIZ' ? (
          <ModalContestQuiz />
        ) : contestData && contestData.type === 'PHOTO' ? (
          <ModalContestDesign />
        ) : null}
        <ErrorModal />
      </PepupModal>
    );
  }
}

export const ModalContests = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
