import * as React from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Countdown } from '../Countdown/Countdown';
import { videoRecordModalClose } from '../../pages/RecordVideo/actions';
import {
  fulfillPepupRequest,
  updateCelebIntroVideo
} from '../../pages/Profile/actions';
import { Icon } from '../Icon/Icon';
import { ModalRecordVideoProps, ModalRecordVideoState } from '.';

import { RNCamera } from 'react-native-camera';
import { Video } from 'expo-av';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled';
import styles from './ModalRecordVideo.styles';
import { colorLightOrange } from '../../variables';
import { AlertProps } from '../SuccessfulAlert';

const minAcceptableVideoDuration = 30;
const maxAcceptableVideoDuration = 60;

const mapStateToProps = (state: IGlobalState) => ({
  isVideoRecordModalVisible: state.RecordVideoState.isVideoRecordModalVisible,
  videoType: state.RecordVideoState.videoType,
  entityId: state.RecordVideoState.entityId,
  isSendingVideo: state.RecordVideoState.isSendingVideo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  videoRecordModalClose: () => dispatch(videoRecordModalClose()),
  updateCelebIntroVideo: (entityId: string, video: any) =>
    dispatch(updateCelebIntroVideo(entityId, video) as any),
  fulfillPepupRequest: (entityId: string, video: any) =>
    dispatch(fulfillPepupRequest(entityId, video) as any)
});

const initialState = {
  isRecording: false,
  isVideoDurationAceptable: false,
  recordOptions: {
    mirrorVideo: true
  },
  videoData: undefined,
  isReadyForPost: false
};

export class Component extends React.PureComponent<
  ModalRecordVideoProps,
  ModalRecordVideoState
> {
  state = initialState;
  camera = React.createRef<RNCamera>();
  video = React.createRef<Video>();

  static getDerivedStateFromProps(props: ModalRecordVideoProps) {
    if (!props.isVideoRecordModalVisible) {
      return initialState;
    }

    return null;
  }

  stopRecording = () => {
    if (this.camera.current) {
      this.camera.current.stopRecording();
    }

    this.setState({ isRecording: false });
  };

  rejectVideo = () => {
    this.setState({
      videoData: undefined,
      isVideoDurationAceptable: false
    });
  };

  postVideo = () => {
    const {
      videoType,
      entityId,
      updateCelebIntroVideo,
      fulfillPepupRequest
    } = this.props;
    const { videoData } = this.state;

    switch (videoType) {
      case 'celebIntroVideo':
        return updateCelebIntroVideo(entityId, videoData);
      case 'fulfillPepupRequest':
        return fulfillPepupRequest(entityId, videoData);
    }
  };

  acceptVideo = () => {
    this.stopRecording();
    this.setState({
      isReadyForPost: true
    });
  };

  startRecording = async () => {
    if (this.camera.current) {
      const { recordOptions } = this.state;

      try {
        const promise = this.camera.current.recordAsync(recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;

          this.setState({
            isRecording: false,
            videoData: data
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  getButtonRejectVideo = () => {
    const { videoData, isRecording } = this.state;

    return (
      <TouchableOpacity
        style={[
          styles.btnCancelVideo,
          videoData && !isRecording ? {} : { opacity: 0 }
        ]}
        disabled={!videoData}
        onPress={this.rejectVideo}>
        <Icon name="cancel" color="black" size={16} />
      </TouchableOpacity>
    );
  };

  getButtonRecordVideo = () => {
    const { videoData, isVideoDurationAceptable, isRecording } = this.state;

    return (
      <View
        style={[
          styles.btnRecordWrapper,
          videoData && !isRecording && isVideoDurationAceptable
            ? { opacity: 0 }
            : {}
        ]}>
        <TouchableOpacity
          style={isRecording ? styles.btnRecordInProcess : styles.btnRecord}
          disabled={!isRecording && isVideoDurationAceptable}
          onPress={() => {
            isRecording ? this.stopRecording() : this.startRecording();
          }}
        />
      </View>
    );
  };

  getButtonAcceptVideo = () => {
    const { isVideoDurationAceptable } = this.state;

    return (
      <TouchableOpacity
        style={[
          styles.btnAcceptVideo,
          isVideoDurationAceptable ? {} : { opacity: 0 }
        ]}
        onPress={this.acceptVideo}
        disabled={!isVideoDurationAceptable}>
        <Icon name="check" />
      </TouchableOpacity>
    );
  };

  getVideoCamera = () => {
    const { videoData } = this.state;

    return videoData ? (
      <Video
        ref={this.video}
        source={videoData}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        isLooping={true}
        resizeMode="cover"
        useNativeControls={false}
        shouldPlay={true}
        style={styles.cameraView}
      />
    ) : (
      <RNCamera
        ref={this.camera}
        style={styles.cameraView}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
      />
    );
  };

  render() {
    const {
      videoRecordModalClose,
      isVideoRecordModalVisible,
      isSendingVideo
    } = this.props;
    const {
      videoData,
      isRecording,
      isVideoDurationAceptable,
      isReadyForPost
    } = this.state;
    const durationInSeconds = maxAcceptableVideoDuration;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVideoRecordModalVisible}
        onRequestClose={() => {
          this.setState(initialState);
        }}>
        <View style={styles.wrapper}>
          <SafeAreaView style={{ flex: 1 }}>
            {this.getVideoCamera()}

            <View style={styles.videoControlsContainer}>
              <View style={styles.videoControlsTop}>
                <ProgressBar
                  seconds={durationInSeconds}
                  isRunning={isRecording}
                  style={isReadyForPost || !isRecording ? { opacity: 0 } : {}}
                />
                {isReadyForPost ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ isReadyForPost: false });
                      }}>
                      <Icon name="back" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  !videoData && (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {!isRecording && (
                        <TouchableOpacity
                          onPress={() => videoRecordModalClose()}>
                          <Icon name="cancel" />
                        </TouchableOpacity>
                      )}

                      <Countdown
                        timeInSeconds={durationInSeconds}
                        isRunning={isRecording}
                        onFinish={this.stopRecording}
                        onTick={currentValue => {
                          if (
                            currentValue <= minAcceptableVideoDuration &&
                            !isVideoDurationAceptable
                          ) {
                            this.setState({ isVideoDurationAceptable: true });
                          }
                        }}
                      />
                    </View>
                  )
                )}
              </View>

              <View style={styles.videoControlsBottom}>
                {isReadyForPost ? (
                  <ButtonStyled
                    type="border"
                    text="POST"
                    style={{ width: 128 }}
                    onPress={this.postVideo}
                    loader={isSendingVideo}
                    loaderColor={colorLightOrange}
                  />
                ) : (
                  <>
                    <View
                      style={[
                        styles.videoButtonWrapper,
                        { justifyContent: 'flex-start', marginLeft: 22 }
                      ]}>
                      {this.getButtonRejectVideo()}
                    </View>
                    <View style={styles.videoButtonWrapper}>
                      {this.getButtonRecordVideo()}
                    </View>
                    <View
                      style={[
                        styles.videoButtonWrapper,
                        { justifyContent: 'flex-end', marginRight: 22 }
                      ]}>
                      {this.getButtonAcceptVideo()}
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}

export const ModalRecordVideo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
