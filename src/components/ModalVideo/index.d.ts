export type ModalVideoStateProps = {
  isVideoModalShown: boolean;
  videoUrl: string;
  isPepup?: boolean;
};

export type ModalVideoDispatchProps = {
  closeVideoModal: () => void;
  openPostReviewModal: () => void;
};

export type ModalVideoProps = ModalVideoStateProps & ModalVideoDispatchProps;
