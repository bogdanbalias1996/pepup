export type PepupModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  heightContent: number;
  children: any;
  isLoading?: boolean;
};
