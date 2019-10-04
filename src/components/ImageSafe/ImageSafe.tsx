import * as React from 'react'
import { Image } from 'react-native'
import { ImageSafeProps } from './'

export const ImageSafe = (
  {
    iconSource='',
    style={}
  }: ImageSafeProps
) => {
  return iconSource ? (<Image source={iconSource} resizeMode="contain" style={style} />) : null
}
