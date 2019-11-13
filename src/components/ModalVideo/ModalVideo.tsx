import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'
import RNFetchBlob from 'rn-fetch-blob'
import { Video } from 'expo-av';
import { connect } from 'react-redux';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { PepupModal } from '../PepupModal/PepupModal';

import {
  closeVideoModal,
  openPostReviewModal
} from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ModalVideoProps } from '.';
import styles from './ModalVideo.styles';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import { colorLightOrange } from '../../variables';
import { ModalPostReview } from '../ModalReviewForm/ModalPostReview';

const mapStateToProps = (state: IGlobalState) => ({
  isVideoModalShown: state.PepupState.isVideoModalShown,
  videoUrl: state.PepupState.videoUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeVideoModal: () => dispatch(closeVideoModal()),
  openPostReviewModal: () => dispatch(openPostReviewModal())
});

export class Component extends React.PureComponent<ModalVideoProps> {
  videoRef: any;
  constructor(props: ModalVideoProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  state = {
    isLoaded: false,
    isPlaying: false,
    isEnd: false,
    path: ''
  };

  downloadTheVideo() {
    RNFetchBlob
    .config({
      fileCache : true,
      appendExt : 'mp4'
    })
    .fetch('GET', this.props.videoUrl)
    .then((res) => {
      this.setState({path: res.path()});
      this.saveToCameraRoll()
    })
  }

  handlePressDownload = () => {
    CameraRoll.saveToCameraRoll(this.state.path).then(alert('Success'))
  };

  render() {
    const {
      closeVideoModal,
      isVideoModalShown,
      videoUrl,
      isPepup,
      openPostReviewModal,
    } = this.props;
    const { isPlaying, isLoaded, isEnd } = this.state;

    return (
      <PepupModal visible={isVideoModalShown} onRequestClose={closeVideoModal}>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black'
          }}>
          <Video
            ref={this.videoRef}
            source={{ uri: videoUrl }}
            onPlaybackStatusUpdate={(val: any) => {
              val.isLoaded !== isLoaded &&
                this.setState({ isLoaded: val.isLoaded });

              val.isPlaying !== isPlaying &&
                this.setState({ isPlaying: val.isPlaying });

              val.didJustFinish && this.setState({ isEnd: true });
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping={false}
            shouldPlay
            resizeMode="contain"
            useNativeControls={false}
            style={{ width: '100%', height: '100%' }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, right: 24, zIndex: 40 }}
            onPress={() => closeVideoModal()}>
            <Icon name="cancel" size={20} />
          </TouchableOpacity>
          {!isLoaded ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ position: 'absolute', zIndex: 50 }}
            />
          ) : null}
          {!isPlaying ? (
            <TouchableOpacity
              onPress={() => {
                if (isEnd) {
                  this.videoRef.current.replayAsync();
                  this.setState({ isEnd: false });
                } else {
                  this.videoRef.current.playAsync();
                }
              }}
              style={styles.wrapVideo}>
              <Image
                style={{ width: 60, height: 60 }}
                source={require('../../../assets/play.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : null}
          {isPlaying ? (
            <TouchableOpacity
              onPress={() => this.videoRef.current.pauseAsync()}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                marginTop: 100
              }}
            />
          ) : null}
          {isPepup && (
            <View style={styles.bottomControlsWrap}>
              <View style={styles.downloadShare}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => this.handlePressDownload()}>
                  <Icon name="download" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => closeVideoModal()}>
                  <Icon name="share" />
                </TouchableOpacity>
              </View>
              <ButtonStyled
                type="border"
                text="SAY THANKS"
                normalFont
                style={styles.btnSend}
                onPress={() => openPostReviewModal()}
                loaderColor={colorLightOrange}
              />
            </View>
          )}
        </View>
        <ModalPostReview />
      </PepupModal>
    );
  }
}

export const ModalVideo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
