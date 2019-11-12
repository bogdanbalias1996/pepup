import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoize from 'memoize-one';

import { ROLE_CELEB } from '../Profile';
import { IGlobalState } from '../../../coreTypes';

import { openPepupModal, getCeleb } from '../../Pepups/actions';

import { CardGradient } from '../../../components/CardGradient/CardGradient';
import { Card } from '../../../components/Card/Card';

import { Profile } from '../types';
import { UserBlockProps } from './types';

import styles from './UserBlock.styles';

class UserBlock extends PureComponent<UserBlockProps> {
  private static readonly avatarPlaceholder = require('../../../../assets/avatarPlaceholder.png');
  private static readonly celebAvatar = require('../../../../assets/celebAvatar.png');

  onPress = () => {
    const { profileData, openPepupModal, getCeleb } = this.props;

    openPepupModal();

    if (profileData) {
      getCeleb(profileData.id);
    }
  };

  generateUserAvatar = memoize((profileData: Profile) => {
    const { icon } = profileData;

    return icon
      ? {
          uri: profileData.icon,
          priority: FastImage.priority.normal
        }
      : UserBlock.avatarPlaceholder;
  });

  render() {
    const { profileData, isCelebrity } = this.props;

    const userAvatar = this.generateUserAvatar(profileData);

    return (
      <View style={styles.avatarsWrap}>
        <Card style={styles.avatar} radius={6}>
          <CardGradient style={styles.gradient} />
          <FastImage
            style={styles.image}
            source={userAvatar}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Card>
        {isCelebrity && (
          <Card style={styles.avatar} radius={6}>
            <CardGradient style={styles.gradient} />
            <TouchableOpacity activeOpacity={1} onPress={this.onPress}>
              <Image
                style={[styles.image, styles.avatarCeleb]}
                source={UserBlock.celebAvatar}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Card>
        )}
      </View>
    );
  }
}

const mapStateToProps = createSelector(
  (state: IGlobalState) => {
    const { profileData } = state.ProfileState;

    return Boolean(profileData && profileData.role === ROLE_CELEB);
  },
  (state: IGlobalState) => state.ProfileState.profileData,
  (isCelebrity: boolean, profileData: Profile | null) => ({
    isCelebrity,
    profileData
  })
);

const mapDispatchToProps = { openPepupModal, getCeleb };

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock as any);
