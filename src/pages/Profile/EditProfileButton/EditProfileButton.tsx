import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { navigate } from '../../../navigationService';

import { Icon } from '../../../components/Icon/Icon';

import { isUserCelebritySelector } from '../../../selectors';

import { IGlobalState } from '../../../coreTypes';
import { EditProfileButtonProps } from './types';

import styles from './EditProfileButton.styles';

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
  isUserCelebritySelector,
  (state: IGlobalState) => {
    const { profileData } = state.ProfileState;

    return (profileData && profileData.name) || ' ';
  },
  (isCelebrity: boolean, name: string) => ({
    isCelebrity,
    name
  })
);

export default connect(mapStateToProps)(EditProfileButton);
