import { ComponentType } from 'react';
import { Category } from "../../pages/Pepups";

export interface ViewerData {
  [key: string]: object[];
}

export interface CategoryViewerProps {
  onTabChange: (tabIndex: number) => void;
  activeTabIndex: number;
  categories: Category[];
  data: ViewerData;
}

export interface ListProps {
  data: ViewerData;
  route: {
    key: string;
  }
}