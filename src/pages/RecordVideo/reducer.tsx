import { IAction } from '../../coreTypes';

import {
  VIDEO_RECORD_MODAL_OPEN,
  VIDEO_RECORD_MODAL_CLOSE,
} from './actions';

export class RecordVideoState {
  isVideoRecordModalVisible: boolean;

  constructor() {
    this.isVideoRecordModalVisible = false;
  }
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
        isVideoRecordModalVisible: true
      };


    case VIDEO_RECORD_MODAL_CLOSE:
      return {
        ...state,
        isVideoRecordModalVisible: false
      };

    default:
      return state;
  }
};
