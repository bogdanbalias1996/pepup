import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Countdown } from '../Countdown/Countdown'
import { closeVideoRecordModal } from '../../pages/Profile/actions';
import { Icon } from '../Icon/Icon';
import { ModalRecordVideoProps, ModalRecordVideoState } from '.';
import styles from './ModalRecordVideo.styles';
import { RNCamera } from 'react-native-camera';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Video } from 'expo-av';
import { ButtonStyled } from '../ButtonStyled/ButtonStyled'

const minAcceptableVideoDuration = 5;
const maxAcceptableVideoDuration = 10;

const mapStateToProps = (state: IGlobalState) => ({
  isModalShown: state.ProfileState.isModalShown,
  durationInSeconds: maxAcceptableVideoDuration
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeVideoRecordModal: () => dispatch(closeVideoRecordModal())
});

export class Component extends React.PureComponent<ModalRecordVideoProps, ModalRecordVideoState> {
  state = {
    isRecording: false,
    durationInSeconds: maxAcceptableVideoDuration,
    isVideoDurationAceptable: false,
    recordOptions: {
      mirrorVideo: true
    },
    videoData: undefined,
    isReadyForPost: false
  }
  camera = React.createRef<RNCamera>();
  video = React.createRef<Video>();

  stopRecording = () => {
    this.setState({ isRecording: false })

    if (this.camera.current) {
      this.camera.current.stopRecording();
    }
  }

  rejectVideo = () => {
    this.setState({
      videoData: undefined,
      isVideoDurationAceptable: false
    })
  }

  postVideo = () => {
    //this.props.onVideoSave(this.state.videoData)
    alert('Action!');
  }

  acceptVideo = () => {
    this.stopRecording();
    this.setState({
      isReadyForPost: true
    })
  }

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
        onPress={this.rejectVideo}
      >
        <Icon name="cancel" color="black" size={16} />
      </TouchableOpacity>
    )
  }

  getButtonRecordVideo = () => {
    const { videoData, isVideoDurationAceptable, isRecording } = this.state;

    return (
      <View style={[
        styles.btnRecordWrapper,
        videoData && !isRecording && isVideoDurationAceptable ? { opacity: 0 } : {}
      ]} >
        <TouchableOpacity
          style={isRecording ? styles.btnRecordInProcess : styles.btnRecord}
          disabled={!isRecording && isVideoDurationAceptable}
          onPress={() => {
            isRecording ? this.stopRecording() : this.startRecording()
          }}
        ></TouchableOpacity>
      </View>
    )
  }

  getButtonAcceptVideo = () => {
    const { isVideoDurationAceptable } = this.state;

    return (
      (
        <TouchableOpacity
          style={[
            styles.btnAcceptVideo,
            isVideoDurationAceptable ? {} : { opacity: 0 }
          ]}
          onPress={this.acceptVideo}
          disabled={!isVideoDurationAceptable}
        >
          <Icon name="check" />
        </TouchableOpacity>
      )
    )
  }

  render() {
    const { closeVideoRecordModal, isModalShown } = this.props;
    const {
      isRecording,
      durationInSeconds,
      isVideoDurationAceptable,
      videoData,
      isReadyForPost
    } = this.state;

    return (
      <Modal
        position="bottom"
        isOpen={isModalShown}
        swipeToClose={true}
        coverScreen={true}
        useNativeDriver={false}
        swipeArea={100}
        onClosed={() => closeVideoRecordModal()}
        style={styles.modal}>

        <View style={styles.wrapper}>
          <SafeAreaView>
            {
              videoData
                ? (
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
                )
                : (
                  <RNCamera
                    ref={this.camera}
                    style={styles.cameraView}
                    type={RNCamera.Constants.Type.front}
                    androidCameraPermissionOptions={{
                      title: 'Permission to use camera',
                      message: 'We need your permission to use your camera',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                      title: 'Permission to use audio recording',
                      message: 'We need your permission to use your audio',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                  />
                )
            }

            <View style={styles.videoControlsContainer}>
              <View style={styles.videoControlsTop}>
                <ProgressBar
                  seconds={durationInSeconds}
                  isRunning={isRecording}
                  style={isReadyForPost ? { opacity: 0 } : {}}
                />
                {
                  isReadyForPost
                    ? (
                      <View>
                        <TouchableOpacity onPress={() => {
                          this.setState({ isReadyForPost: false })
                        }}>
                          <Icon name="left" />
                        </TouchableOpacity>
                      </View>
                    )
                    : (
                      <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => closeVideoRecordModal()}>
                            <Icon name="cancel" />
                          </TouchableOpacity>

                          <Countdown
                            timeInSeconds={durationInSeconds}
                            isRunning={isRecording}
                            onFinish={this.stopRecording}
                            onTick={(currentValue) => {
                              if (currentValue <= minAcceptableVideoDuration && !isVideoDurationAceptable) {
                                this.setState({ isVideoDurationAceptable: true })
                              }
                            }}
                          />
                        </View>
                      </>
                    )
                }
              </View>

              <View style={styles.videoControlsBottom}>
                {
                  isReadyForPost
                    ? (
                      <ButtonStyled
                        type="border"
                        text="POST"
                        textBold={true}
                        style={{ width: 128 }}
                        onPress={this.postVideo}
                      />
                    )
                    : (
                      <>
                        <View style={[styles.videoButtonWrapper, { justifyContent: 'flex-start', marginLeft: 22 }]}>
                          {this.getButtonRejectVideo()}
                        </View>
                        <View style={styles.videoButtonWrapper}>
                          {this.getButtonRecordVideo()}
                        </View>
                        <View style={[styles.videoButtonWrapper, { justifyContent: 'flex-end', marginRight: 22 }]}>
                          {this.getButtonAcceptVideo()}
                        </View>
                      </>
                    )
                }
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
  mapDispatchToProps,
)(Component);
