import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { HeaderRounded } from '../../../components/HeaderRounded/HeaderRounded';
import { Icon } from '../../../components/Icon/Icon';
import { navigate } from '../../../navigationService';

class ProfileHeader extends Component<any> {
  onButtonPress = () => navigate({ routeName: 'Settings' });

  getRightComponent = () => (
    <TouchableOpacity onPress={this.onButtonPress}>
      <Icon name="nut-icon" />
    </TouchableOpacity>
  );

  render() {
    return (
      <HeaderRounded
        title={'Profile'.toUpperCase()}
        getRightComponent={this.getRightComponent}
        {...this.props}
      />
    );
  }
}

export default ProfileHeader;
