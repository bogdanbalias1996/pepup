import { ComponentType } from 'react';
import { Category } from "../../pages/Pepups";

export interface CategoryViewerProps {
  onTabChange: (tabIndex: number) => void;
  activeTabIndex: number;
  categories: Category[];
  pageComponent: ComponentType;
}