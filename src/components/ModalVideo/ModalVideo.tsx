import * as React from 'react';
import { TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { connect } from 'react-redux';
import { IGlobalState } from '../../coreTypes';
import { Dispatch } from 'redux';
import { PepupModal } from '../PepupModal/PepupModal';

import { closeVideoModal } from '../../pages/Pepups/actions';
import { Icon } from '../../components/Icon/Icon';
import { ModalVideoProps } from '.';
import styles from './ModalVideo.styles';
import { colorBlack } from '../../variables';

const mapStateToProps = (state: IGlobalState) => ({
  isVideoModalShown: state.PepupState.isVideoModalShown,
  videoUrl: state.PepupState.videoUrl
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeVideoModal: () => dispatch(closeVideoModal())
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
    isEnd: false
  };

  render() {
    const { closeVideoModal, isVideoModalShown, videoUrl } = this.props;
    const { isPlaying, isLoaded, isEnd } = this.state;

    return (
      <PepupModal
        visible={isVideoModalShown}        
        onRequestClose={closeVideoModal}        
      >        
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black'            
          }}
        >
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
            onPress={() => closeVideoModal()}
          >
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
              style={styles.wrapVideo}
            >
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
            ></TouchableOpacity>
          ) : null}
        </View>
      </PepupModal>
    );
  }
}

export const ModalVideo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
