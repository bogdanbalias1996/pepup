import {
  NavigationScreenProp,
  NavigationScreenOptions
} from 'react-navigation';

export type WebViewPageScreenStateProps = {
  modalData: any;
  isSettingsModalOpen: boolean;
};

export type WebViewPageScreenDispatchProps = {
  closeSettingsModal: () => void;
};

export type WebViewPageScreenProps = WebViewPageScreenStateProps &
  WebViewPageScreenDispatchProps;
