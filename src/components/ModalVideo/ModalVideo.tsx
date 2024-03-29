import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
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
import { colorLightOrange, colorBlack } from '../../variables';
import { ModalPostReview } from '../ModalReviewForm/ModalPostReview';

const mapStateToProps = (state: IGlobalState) => ({
  isVideoModalShown: state.PepupState.isVideoModalShown,
  videoUrl: state.PepupState.videoUrl
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
    path: '',
    downloadProgress: 0
  };

  saveFile = () => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4'
    })
      .fetch('GET', this.props.videoUrl)
      .progress({ interval: 250 }, (received, total) => {
        this.setState({
          downloadProgress: (received / total) * 100
        });
      })
      .then(res => {
        CameraRoll.saveToCameraRoll(res.path(), 'video');
        this.setState({ downloadProgress: 0 });
      })
      .catch(console.log);
  }

  async downloadTheVideo() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (Platform.OS === 'android' && granted === PermissionsAndroid.RESULTS.GRANTED || Platform.OS === 'ios') {
      this.saveFile()
    }
  }

  handleShare = () => {
    Share.open({title: 'Share via',
    url: this.props.videoUrl,
    showAppsToView: true
})
    .catch(console.log);
};

  render() {
    const {
      closeVideoModal,
      isVideoModalShown,
      videoUrl,
      isPepup,
      openPostReviewModal
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
            style={styles.closeBtn}
            onPress={closeVideoModal}>
            <Icon size={20} name="cancel" color={colorBlack} />
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
                  onPress={this.downloadTheVideo}>
                  {this.state.downloadProgress > 0 ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Icon name="download" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={this.handleShare}>
                  <Icon name="share" />
                </TouchableOpacity>
              </View>
              <ButtonStyled
                type="border"
                text="SAY THANKS"
                normalFont
                style={styles.btnSend}
                onPress={openPostReviewModal}
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
