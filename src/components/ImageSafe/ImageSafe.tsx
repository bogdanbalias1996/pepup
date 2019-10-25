import * as React from 'react';
import { Image } from 'react-native';
import { ImageSafeProps } from './';
import { Loader } from '../Loader/Loader';
import { colorBlueberry } from '../../variables';

export const ImageSafe = ({
  isLoaded = true,
  iconSource = '',
  resizeModeImg = '',
  style = {},
  loaderSize= ''
}: ImageSafeProps) => {
  return iconSource ? (
    <Loader isDataLoaded={isLoaded} size={loaderSize ? loaderSize : 'large' } color={colorBlueberry}>
      <Image source={iconSource} resizeMode={resizeModeImg} style={style} />
    </Loader>
  ) : null;
};
