import { IAction } from "../../coreTypes";

import { OPEN_ALERT, CLOSE_ALERT } from "./actions";

export class AlertState {
    isAlertShown: boolean;
    title: string;
    text: string;
    onPress!: () => void;

    constructor() {
        this.isAlertShown = false;
        this.title = '';
        this.text = '';
        this.onPress = () => {}
    }
}

export const initialState = new AlertState();

export const AlertReducer = (
    state: AlertState = initialState,
    action: IAction<any>
): AlertState => {
    switch (action.type) {
        case OPEN_ALERT:
            return {
                ...state,
                isAlertShown: true,
                ...action.data
            };
        case CLOSE_ALERT:
            return {
                ...state,
                isAlertShown: false
            };
        default:
            return state;
    }
}