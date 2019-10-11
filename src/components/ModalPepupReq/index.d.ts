import { Celeb } from "../../pages/Pepups";

export type ModalPepupReqProps = {
  closePepupReqModal: () => void;
  isModalReqShown: boolean;
  isFetching?: boolean;
  celebData: Celeb | null;
  sendRequestForPepup: (req: any, reqFor: string) => Promise<any>;
  openAlert: (data: any) => Promise<any>;
};

export type RequestPepupScreenFromData = {
  name: string;
  text: string;
  shareCheckbox: boolean;
}

export type RequestPepupScreenFromProps = {
  userId: string;
  categoryId: string;
}

export type RequestPepupProps = RequestPepupScreenFromProps & ModalPepupReqProps;
