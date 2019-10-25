import { Contest } from "../../pages/Contests/index"

export type ModalContestsProps = {
  closeContestModal: () => void;
  isModalShown: boolean;
  contestData: Contest | null;
  openContestQuizModal: () => void;
  text?: string;
};

export type ModalContestQuizProps = {
  closeContestQuizModal: () => void;
  isModalTestShown: boolean;
  contestData: Contest | null;
}

