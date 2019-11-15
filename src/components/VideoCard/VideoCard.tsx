import React, { PureComponent } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import styles from './VideoCard.styles';
import Card from '../Card';
import CardGradient from '../CardGradient';
import { Video } from 'expo-av';
import { VideoCardProps } from './types';
import { connect } from 'react-redux';
import { openVideoModal } from '../../pages/Pepups/actions';

class VideoCard extends PureComponent<VideoCardProps> {
  render() {
    const { 
      videoUrl, 
      width, 
      height, 
      openVideoModal,
      withoutShadow = false,
      borderWidth = 4
    } = this.props;

    return (
      <View style={[styles.videoContainer, { width, height }]}>
        <Card radius={10} withoutShadow={withoutShadow} borderWidth={borderWidth}>
          <CardGradient />
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping={true}
            resizeMode="cover"
            useNativeControls={false}
            style={styles.video}
          />
        </Card>
        <TouchableOpacity
          style={styles.videoBtnPlayWrapper}
          onPress={() => openVideoModal(videoUrl)}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../../../assets/play.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    openVideoModal: (videoUrl: string) => dispatch(openVideoModal(videoUrl)),
  })
)(VideoCard);