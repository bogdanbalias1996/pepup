export type ButtonGroupStylesProps = {
  style?: any
  stylesFirstItem?: any
  stylesLastItem?: any
  stylesItem?: any
  stylesItemText?: any
  stylesSelectedItem?: any
  stylesSelectedItemText?: any
}

export type ButtonGroupComponentProps = {
  items: ButtonGroupItem[]
  getActiveIndicator?: () => JSX.Element
  value?: any
}

export type ButtonGroupProps = ButtonGroupStylesProps & ButtonGroupComponentProps

export type ButtonGroupItem = {
  title?: string
  component?: (isActive: boolean) => JSX.Element
  value: any
  onPress?: () => void
}