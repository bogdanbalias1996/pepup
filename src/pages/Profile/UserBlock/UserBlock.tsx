import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ImagePicker from 'react-native-image-picker';

import { openPepupModal, getCeleb } from '../../Pepups/actions';
import { updateProfilePhoto } from '../../EditProfile/actions';

import { isUserCelebritySelector } from '../../../selectors';

import { CardGradient } from '../../../components/CardGradient/CardGradient';
import { Card } from '../../../components/Card/Card';
import { Icon } from '../../../components/Icon/Icon';

import { IGlobalState } from '../../../coreTypes';
import { Profile } from '../types';
import { UserBlockProps } from './types';

import styles from './UserBlock.styles';
import { colorDarkPurple } from '../../../variables';

class UserBlock extends PureComponent<UserBlockProps, any> {
  private static readonly avatarPlaceholder = require('../../../../assets/avatarPlaceholder.png');
  private static readonly celebAvatar = require('../../../../assets/celebAvatar.png');

  onPress = () => {
    const { profileData, openPepupModal, getCeleb } = this.props;

    openPepupModal();

    if (profileData) {
      getCeleb(profileData.id);
    }
  };

  generateUserAvatar = (profileData: Profile) => {
    const { icon } = profileData;

    return icon
      ? {
          uri: `${icon}?random_number=${new Date().getTime()}`,
          priority: FastImage.priority.normal
        }
      : UserBlock.avatarPlaceholder;
  };

  chooseAvatar = () => {
    const options = {
      title: 'Select Profile Picture',
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality: 0.5
    };

    ImagePicker.showImagePicker(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const avatar = {
          uri: `data:${response.type};base64,${response.data}`
        };
        this.props.updateProfilePhoto(avatar);
      }
    });
  };

  render() {
    const { profileData, isCelebrity } = this.props;

    const userAvatar = this.generateUserAvatar(profileData);

    return (
      <View style={styles.avatarsWrap}>
        <Card style={styles.avatar} radius={6}>
          <CardGradient style={styles.gradient} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.chooseAvatar}
            style={styles.avatarButton}>
            <FastImage
              style={styles.image}
              source={userAvatar}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.iconWrapper}>
              <Icon name="add" color={colorDarkPurple} size={12} />
            </View>
          </TouchableOpacity>
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
  isUserCelebritySelector,
  (state: IGlobalState) => state.ProfileState.profileData,
  (isCelebrity: boolean, profileData: Profile | null) => ({
    isCelebrity,
    profileData
  })
);

const mapDispatchToProps = { openPepupModal, getCeleb, updateProfilePhoto };

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock as any);
