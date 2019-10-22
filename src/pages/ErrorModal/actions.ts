import { IAction } from "../../coreTypes";
import { ErrorActionProps } from './'

export const OPEN_ERROR = 'OPEN_ERROR';
export const CLOSE_ERROR = 'CLOSE_ERROR';
export const openError = ({ type, onPress }: ErrorActionProps): IAction<ErrorActionProps> => {
  let data;
  switch (type) {
    case 'connectionFail':
      data = {
        title: 'What ze French Toast!',
        text: 'Connection Failed. Could not connect to the network. Please try again.',
        buttonText: 'OK',
        imgSource: require('../../../assets/connection.png'),
      }
      break;
    case 'itemUnavailable':
      data = {
        title: 'Blistering Barnacles!',
        text: 'Item Unavailable. There, there… we’ve got plenty else you don’t want to miss. ',
        buttonText: 'OK',
        imgSource: require('../../../assets/item.png'),
      }
      break;
    case 'paymentFail':
      data = {
        title: 'Ailaa!',
        text: 'Payment Rejected. Please verify you entered details correctly.',
        buttonText: 'TRY AGAIN',
        imgSource: require('../../../assets/payment.png'),
      }
      break;
    case 'noResults':
      data = {
        title: 'Let it go!',
        text: 'No Results. Dang! Sometimes s**t hits the fan but we’ll all come out alright.',
        buttonText: 'TRY AGAIN',
        imgSource: require('../../../assets/results.png'),
      }
      break;
    default:
      data = {
        title: 'Oh My Science!',
        text: 'Unknown unknown. We are crunching a ton at the back. Please try again.',
        buttonText: 'TRY AGAIN',
        imgSource: require('../../../assets/unknown.png'),
      }
  }
  return {
    type: OPEN_ERROR,
    data: { ...data, onPress }
  };
};
export const closeError = (): IAction<undefined> => {
  return {
    type: CLOSE_ERROR,
    data: undefined
  };
};