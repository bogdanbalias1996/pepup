export type ModalVideoStateProps = {
  isVideoModalShown: boolean;
  videoUrl: string;
};

export type ModalVideoDispatchProps = {
  closeVideoModal: () => void;
};

export type ModalVideoProps = ModalVideoStateProps & ModalVideoDispatchProps;
