import { IAction } from "../../coreTypes";

export const OPEN_SETTINGS_MODAL = 'OPEN_SETTINGS_MODAL';
export const CLOSE_SETTINGS_MODAL = 'CLOSE_SETTINGS_MODAL';

export const openSettingsModal = (link:string): IAction<string> => ({
    type: OPEN_SETTINGS_MODAL,
    data: link
});
export const closeSettingsModal = (): IAction<undefined> => ({
    type: CLOSE_SETTINGS_MODAL,
    data: undefined
});
