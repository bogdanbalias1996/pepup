import { Celeb, Review } from "../../pages/Pepups";

export type ModalPepupProps = {
  closePepupModal: () => void;
  openVideoModal: () => void;
  isModalShown: boolean;
  isFetching?: boolean;
  openPepupReqModal: () => void;
  celebData: Celeb;
  openReviewsModal: () => void;
  getAllReviews: (id: string) => Promise<any>;
  getCeleb: (id: string) => Promise<any>;
};

export type ModalReviewsProps = {
  closeReviewsModal: () => void;
  isModalReviewShown: boolean;
  reviews: Array<Review>;
  celebData: Celeb;
  isFetching?: boolean;
};

