import { Celeb } from "../../pages/Pepups";

export type ModalPepupReqProps = {
  closePepupReqModal: () => void;
  showModalReq: boolean;
  isFetching?: boolean;
  celebData: Celeb;
  sendRequestForPepup: (req: any, reqFor: string) => Promise<any>;
};

export type RequestPepupScreenFromData = {
  name: string;
  text: string;
  shareCheckbox: boolean;
}

export type RequestPepupScreenFromProps = {
  celebId: string;
  categoryId: string;
}

export type RequestPepupProps = RequestPepupScreenFromData & RequestPepupScreenFromProps & ModalPepupReqProps;
