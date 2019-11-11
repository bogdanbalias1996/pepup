import { ComponentType } from 'react';
import { StyleProp } from 'react-native';

export type keyExtractorType = (item: object) => string | number;

export interface ViewerCategory {
  title: string;
  component: ComponentType<any>;
  keyExtractor?: keyExtractorType;
}

export interface ViewerRoute {
  key: string;
  title: string;
  component: ComponentType<any>;
  keyExtractor?: keyExtractorType;
}

export interface ViewerData {
  [key: string]: object[];
}

export interface CategoryViewerProps {
  onTabChange: (tabIndex: number) => void;
  activeTabIndex: number;
  categories: ViewerCategory[];
  data: ViewerData;
  flatListStyle?: StyleProp<any>;
}

export interface ListProps {
  data: ViewerData;
  route: ViewerRoute;
  flatListStyle?: StyleProp<any>;
}
