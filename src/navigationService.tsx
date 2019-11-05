import {
  NavigationActions,
  NavigationNavigateActionPayload
} from 'react-navigation';

let _navigator: any;

export const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef;
};

export const navigate = (
  { routeName, params }: NavigationNavigateActionPayload,
  dublicate?: boolean
) => {
  const action = NavigationActions.navigate({
    routeName,
    params,
    action: dublicate
      ? NavigationActions.navigate({
          routeName,
          params
        })
      : undefined
  });

  _navigator.dispatch(action);
};

export const goBack = () => {
  if (!_navigator) return;

  _navigator.dispatch(NavigationActions.back());
};
