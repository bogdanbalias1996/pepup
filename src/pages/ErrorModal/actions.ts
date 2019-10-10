import { IAction } from "../../coreTypes";

export const OPEN_ERROR = 'OPEN_ERROR';
export const CLOSE_ERROR = 'CLOSE_ERROR';
export const openError = ({title, text, buttonText, onPress, imgSource} : any): IAction<any> => {
  return {
    type: OPEN_ERROR,
    data: {title, text, onPress, buttonText, imgSource}
  };
};
export const closeError = (): IAction<undefined> => {
  return {
    type: CLOSE_ERROR,
    data: undefined
  };
};