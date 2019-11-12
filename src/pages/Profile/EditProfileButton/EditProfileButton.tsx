import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { navigate } from '../../../navigationService';

import { Icon } from '../../../components/Icon/Icon';

import styles from './EditProfileButton.styles';
import { IGlobalState } from '../../../coreTypes';
import { ROLE_CELEB } from '../Profile';
import { EditProfileButtonProps } from './types';

class EditProfileButton extends PureComponent<EditProfileButtonProps> {
  onPress = () => {
    const { isCelebrity } = this.props;

    navigate({
      routeName: isCelebrity ? 'EditProfileCeleb' : 'EditProfile'
    });
  };

  render() {
    const { name } = this.props;

    return (
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity onPress={this.onPress}>
          <Icon name="edit" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = createSelector(
  (state: IGlobalState) => {
    const { profileData } = state.ProfileState;

    return (profileData && profileData.name) || ' ';
  },
  (state: IGlobalState) => {
    const { profileData } = state.ProfileState;

    return Boolean(profileData && profileData.role === ROLE_CELEB);
  },
  (name: string, isCelebrity: boolean) => ({
    name,
    isCelebrity
  })
);

export default connect(mapStateToProps)(EditProfileButton);
