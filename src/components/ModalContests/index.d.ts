import { Contest } from "../../pages/Contests/index"

export type ModalContestsProps = {
  closeContestModal: () => void;
  showModal: boolean;
  contestData: Contest;
};
