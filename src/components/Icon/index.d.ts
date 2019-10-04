
export type IconProps = {
  size?: number
  name: string
  color?: string
  style?: any
}

export type IconComponentProps = IconProps & {
  isFontLoaded: boolean
}
