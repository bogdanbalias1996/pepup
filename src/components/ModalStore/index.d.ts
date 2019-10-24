import { Product } from "../../pages/Store";

export type ModalStoreProps = {
  closeStoreModal: () => void;
  isModalShown: boolean;
  prodData: Product;
};
