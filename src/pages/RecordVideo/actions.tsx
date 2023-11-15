import { IAction } from '../../coreTypes';

export const VIDEO_RECORD_MODAL_OPEN = 'VIDEO_RECORD_MODAL_OPEN';
export const videoRecordModalOpen = (entityId: string, videoType: string): IAction<{ videoType: string, entityId: string }> => {
  return {
    type: VIDEO_RECORD_MODAL_OPEN,
    data: {
      videoType,
      entityId
    }
  };
};

export const VIDEO_RECORD_MODAL_CLOSE = 'VIDEO_RECORD_MODAL_CLOSE';
export const videoRecordModalClose = (): IAction<undefined> => {
  return {
    type: VIDEO_RECORD_MODAL_CLOSE,
    data: undefined,
  };
};

export const VIDEO_RECORD_MODAL_UPLOAD = 'VIDEO_RECORD_MODAL_UPLOAD';
export const videoRecordModalUpload = (isUploading: boolean): IAction<boolean> => {
  return {
    type: VIDEO_RECORD_MODAL_UPLOAD,
    data: isUploading
  };
};