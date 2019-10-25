import * as React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Icon } from '../../components/Icon/Icon';
import { goBack } from '../../navigationService';

const Header = (props: any) => (
  <HeaderRounded
    {...props}
    title={'Settings'.toUpperCase()}
    getLeftComponent={() => {
      return (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="left" />
        </TouchableOpacity>
      );
    }}
  />
);

export const ConnectedHeader = connect()(Header);