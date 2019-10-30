import { Contest } from '../../pages/Contests/index';

export type ModalContestsProps = {
  closeContestModal: () => void;
  isModalShown: boolean;
  isFetchingContest: boolean;
  contestData: Contest | null;
  openContestQuizModal: () => void;
  text?: string;
};

export type ModalContestQuizProps = {
  closeContestTestModal: () => void;
  closeContestQuizModal: () => void;
  submitEnrty: (
    values: any,
    id: string,
    type: string,
    contestType: string
  ) => void;
  isModalTestShown: boolean;
  isFetching: boolean;
  contestData: Contest;
  values: any;
  handleSubmit: any;
  errors: any;
  touched: any;
  setFieldValue: any;
};
