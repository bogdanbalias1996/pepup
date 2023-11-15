import { RecordOptions } from 'react-native-camera';
import { AlertProps } from '../SuccessfulAlert';

export type ModalRecordVideoProps = {
  videoRecordModalClose: () => void;
  updateCelebIntroVideo: (entityId: string, video: any) => void;
  fulfillPepupRequest: (entityId: string, video: any) => void;
  entityId: string;
  isVideoRecordModalVisible: boolean;
  isSendingVideo: boolean;  
  videoType: VideoType;
};

export type ModalRecordVideoState = {
  isRecording: boolean;
  isVideoDurationAceptable: boolean;
  recordOptions: RecordOptions;
  videoData: any;
  isReadyForPost: boolean;
}

export type VideoType = '' | 'celebIntroVideo' | 'fulfillPepupRequest';
