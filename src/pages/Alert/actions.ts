import { IAction } from "../../coreTypes";
import { AlertProps } from "../../components/SuccessfulAlert/index";

export const OPEN_ALERT = 'OPEN_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const openAlert = ({title, text, onPress} : any): IAction<any> => {
  return {
    type: OPEN_ALERT,
    data: {title, text, onPress}
  };
};
export const closeAlert = (): IAction<undefined> => {
  return {
    type: CLOSE_ALERT,
    data: undefined
  };
};