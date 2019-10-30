import { NavigationActions, NavigationNavigateActionPayload } from 'react-navigation'

let _navigator: any

export const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef
}

export const navigate = ({ routeName, params }: NavigationNavigateActionPayload) => {
  if (!_navigator) return

  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

export const goBack = () => {
  if (!_navigator) return

  _navigator.dispatch(
    NavigationActions.back()
  )
}
