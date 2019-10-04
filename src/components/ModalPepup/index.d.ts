import { Celeb } from "../../pages/Pepups";

export type ModalPepupProps = {
  closePepupModal: () => void;
  openVideoModal: () => void;
  showModal: boolean;
  isFetching?: boolean;
  openPepupReqModal: () => void;
  celebData: Celeb;
};
