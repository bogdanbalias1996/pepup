export type ErrorProps = {
  closeError: () => void;
  isErrorShown: boolean;
  onPress: () => void;
  isFetching: boolean;
};

export type ErrorStateProps = {
  closeError: any;
  isErrorShown: any;
  title: any;
  text: any;
  imgSource: any;
  onPress: any;
  isFetching: any;
  isFetchingContest: boolean;
  isFetchingProfile: boolean;
  buttonText: any;
};
