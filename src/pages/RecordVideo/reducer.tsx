import { IAction } from '../../coreTypes';
import { VideoType } from '../../components/ModalRecordVideo';

import {
  VIDEO_RECORD_MODAL_OPEN,
  VIDEO_RECORD_MODAL_CLOSE,
  VIDEO_RECORD_MODAL_UPLOAD
} from './actions';

export class RecordVideoState {
  isVideoRecordModalVisible: boolean;
  isSendingVideo: boolean;
  videoType: VideoType;
  entityId: string;

  constructor() {
    this.isVideoRecordModalVisible = false;
    this.isSendingVideo = false;
    this.videoType = '';
    this.entityId = '';
;  }
}

export const initialState = new RecordVideoState();

export const RecordVideoReducer = (
  state: RecordVideoState = initialState,
  action: IAction<any>,
): RecordVideoState => {
  switch (action.type) {
    case VIDEO_RECORD_MODAL_OPEN:
      return {
        ...state,
        isVideoRecordModalVisible: true,
        videoType: action.data.videoType,
        entityId: action.data.entityId
      };

    case VIDEO_RECORD_MODAL_CLOSE:
      return {
        ...state,
        isVideoRecordModalVisible: false,
        videoType: '',
        entityId: ''
      };

    case VIDEO_RECORD_MODAL_UPLOAD:
      return {
        ...state,
        isSendingVideo: action.data        
      };

    default:
      return state;
  }
};
