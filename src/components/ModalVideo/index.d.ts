export type ModalVideoStateProps = {
  isVideoModalShown: boolean;
};

export type ModalVideoDispatchProps = {
  closeVideoModal: () => void;
};

export type ModalVideoProps = ModalVideoStateProps & ModalVideoDispatchProps;
