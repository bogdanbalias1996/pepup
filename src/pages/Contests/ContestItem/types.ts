import { Contest } from '../types';

export interface ContestItemProps {
  openContestModal: () => void;
  getContest: (contest: string) => void;
  item: Contest;
}
