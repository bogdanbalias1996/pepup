import { ComponentType } from 'react';
import { Category } from "../../pages/Pepups";

export interface ViewerCategory {
  title: string;
  component: ComponentType<any>
}

export interface ViewerRoute {
  key: string;
  title: string;
  component: ComponentType<any>;
}

export interface ViewerData {
  [key: string]: object[];
}

export interface CategoryViewerProps {
  onTabChange: (tabIndex: number) => void;
  activeTabIndex: number;
  categories: ViewerCategory[];
  data: ViewerData;
}

export interface ListProps {
  data: ViewerData;
  route: ViewerRoute;
}