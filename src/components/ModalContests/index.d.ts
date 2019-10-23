import {Contest} from '../../pages/Contests/index';

export type ModalContestsProps = {
  closeContestModal: () => void;
  isModalShown: boolean;
  contestData: Contest;
  openContestTestModal: () => void;
  text?: string;
};

export type ModalContestTestProps = {
  closeContestTestModal: () => void;
  submitEnrty: (video: any) => void;
  isModalTestShown: boolean;
  contestData: Contest;
  values: any;
  handleSubmit: any;
  errors: any;
  touched: any;
  setFieldValue: any;
};
