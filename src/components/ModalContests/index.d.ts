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
  submitEnrty: (values: any, id: string, type: string) => void;
  isModalTestShown: boolean;
  isFetching: boolean;
  contestData: Contest;
  values: any;
  handleSubmit: any;
  errors: any;
  touched: any;
  setFieldValue: any;
};
