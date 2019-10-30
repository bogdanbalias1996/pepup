import { IAction } from '../../coreTypes';

export const VIDEO_RECORD_MODAL_OPEN = 'VIDEO_RECORD_MODAL_OPEN';
export const videoRecordModalOpen = (): IAction<undefined> => {
  return {
    type: VIDEO_RECORD_MODAL_OPEN,
    data: undefined,
  };
};

export const VIDEO_RECORD_MODAL_CLOSE = 'VIDEO_RECORD_MODAL_CLOSE';
export const videoRecordModalClose = (): IAction<undefined> => {
  return {
    type: VIDEO_RECORD_MODAL_CLOSE,
    data: undefined,
  };
};
