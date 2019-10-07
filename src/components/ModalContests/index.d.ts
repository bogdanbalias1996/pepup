import { Contest } from "../../pages/Contests/index"

export type ModalContestsProps = {
  closeContestModal: () => void;
  isModalShown: boolean;
  contestData: Contest;
  openContestTestModal: () => void;
  text?: string;
};

export type ModalContestTestProps = {
  closeContestTestModal: () => void;
  isModalTestShown: boolean;
  contestData: Contest;
}

