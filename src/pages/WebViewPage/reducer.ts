import Storage from '../../common/utils/Storage';
import { IAction } from '../../coreTypes';
import { OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL } from './actions';

export class SettingsState {
    isSettingsModalOpen = false;
    modalData: any;
}

export const initialState = new SettingsState();

export const SettingsReducer = (
    state: SettingsState = initialState,
    action: IAction<any>
): SettingsState => {
    switch (action.type) {
        case OPEN_SETTINGS_MODAL:
            return {
                ...state,
                modalData: action.data,
                isSettingsModalOpen: true
            };
        case CLOSE_SETTINGS_MODAL:
            return {
                ...state,
                modalData: null,
                isSettingsModalOpen: false
            };
        default:
            return state;
    }
};
