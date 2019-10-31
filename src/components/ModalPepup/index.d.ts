import { Celeb, Review } from "../../pages/Pepups";

export type ModalPepupProps = {
  closePepupModal: () => void;
  openVideoModal: (videoUrl: string) => void;
  isModalShown: boolean;
  isFetching?: boolean;
  isFetchingCeleb: boolean;
  openPepupReqModal: () => void;
  celebData: Celeb | null;
  openReviewsModal: () => void;
  getAllReviews: (id: string) => Promise<any>;
  getCeleb?: (id: string) => Promise<any>;
};

export type ModalReviewsProps = {
  closeReviewsModal: () => void;
  isModalReviewShown: boolean;
  reviews: Array<Review>;
  celebData: Celeb | null;
  isFetching?: boolean;
};

export type RenderItemMedia = {
  date: string,
  title: string
}

