import { RecordOptions } from 'react-native-camera';

export type ModalRecordVideoProps = {
  videoRecordModalClose: () => void;
  isVideoRecordModalVisible: boolean;
  durationInSeconds: number | null;
  recordOptions?: any;
  onVideoSave: (video: any) => void;
};

export type ModalRecordVideoState = {
  isRecording: boolean;
  durationInSeconds: number;
  isVideoDurationAceptable: boolean;
  recordOptions: RecordOptions;
  videoData: any;
  isReadyForPost: boolean;
}
