import { ButtonGroupStylesProps } from '../ButtonGroup';

export type Tab = {
  title: string;
  titleComponent?: (isActive: boolean) => JSX.Element;
  component: any;
  tabStyles?: any;
  tabTitleStyles?: any;
  onPress?: (index: number) => void;
};

export type TabsComponentProps = {
  config: Array<Tab>;
  stylesTabsContainer?: any;
  activeTabIndex?: number;
};

export type TabsProps = TabsComponentProps & ButtonGroupStylesProps;
