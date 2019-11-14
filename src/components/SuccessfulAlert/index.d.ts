export type AlertProps = {
  closeAlert: () => void;
  isAlertShown: boolean;
  title: string;
  text: string;
  onPress: () => void;
  isDevAlert?: boolean;
  developerMode?: boolean;
  setDeveloperMode: (value: boolean) => void;
};

export type AlertState = {
  isSwitchOn: boolean | null | undefined;
};
