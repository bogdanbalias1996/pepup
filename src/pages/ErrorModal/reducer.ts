import { IAction } from "../../coreTypes";

import { OPEN_ERROR, CLOSE_ERROR } from "./actions";

export class ErrorState {
    isErrorShown: boolean;
    title: string;
    text: string;
    buttonText: string;
    onPress!: () => void;
    imgSource: any

    constructor() {
        this.isErrorShown = false;
        this.title = '';
        this.buttonText = '';
        this.text = '';
        this.onPress = () => {}
        this.imgSource = ''
    }
}

export const initialState = new ErrorState();

export const ErrorReducer = (
    state: ErrorState = initialState,
    action: IAction<any>
): ErrorState => {
    switch (action.type) {
        case OPEN_ERROR:
            console.log('OPEN_ERROR: ', action.data)
            return {
                ...state,
                isErrorShown: true,
                ...action.data
            };
        case CLOSE_ERROR:
            return {
                ...state,
                isErrorShown: false
            };
        default:
            return state;
    }
}