import { Celeb } from "../types";

export interface CelebCardProps {
  openPepupModal: () => void;
  getCeleb: (id: number) => void;
  item: Celeb;
}