import * as React from 'react';
import {View, Text, TouchableOpacity, NativeModules} from 'react-native';
import {Icon} from '../../components/Icon/Icon';
import styles from './HeaderRounded.styles';
import {goBack} from '../../navigationService';
import {deviceInfoCheck} from '../../helpers';

export const HeaderRounded = (props: {
  navigation?: any;
  title: any;
  getLeftComponent?: (() => any);
  getRightComponent?: (() => any);
}) => {
  const {
    navigation,
    title,
    getLeftComponent = () => null,
    getRightComponent = () => null,
  } = props;

  const heightCheck = {
    paddingTop: deviceInfoCheck() ? 50 : 40,
    paddingBottom: deviceInfoCheck() ? 25 : 15,
  };

  return (
    <View style={[styles.container, heightCheck]}>
      <View style={styles.leftContainer}>
        {getLeftComponent === null && navigation.state.routes.length > 1 && (
          <TouchableOpacity style={styles.back} onPress={goBack}>
            <Icon size={22} name={'left'} color={'white'} />
          </TouchableOpacity>
        )}
        {!!getLeftComponent && getLeftComponent()}
      </View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.rightContainer}>{getRightComponent()}</View>
    </View>
  );
};
