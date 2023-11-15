import { ComponentType, ReactChildren } from 'react';

export type NotificationItemsProps = {
  item: {
    title: string;
    message: string;
    date: string;
  };
};

export type NotificationItemState = {
  isRead: boolean;
};

export type Wrapper = ComponentType<{ children: ReactChildren | JSX.Element }>;
