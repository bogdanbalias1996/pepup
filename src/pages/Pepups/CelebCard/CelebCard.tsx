import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import styles from './CelebCard.styles';

import { Card } from '../../../components/Card/Card';
import { CardGradient } from '../../../components/CardGradient/CardGradient';

import { openPepupModal, getCeleb } from '../../../pages/Pepups/actions';
import { CelebCardProps } from './types';

class CelebCard extends PureComponent<CelebCardProps> {
  onPress = () => {
    const { openPepupModal, getCeleb, item } = this.props;
  
    openPepupModal();
    getCeleb(item.userInfo.id);
  }

  render() {
    const { item } = this.props;

    return (
      <View style={styles.wrapper}>
        <Card style={styles.card} radius={24}>
          <TouchableOpacity
            onPress={this.onPress}
            style={styles.avatarWrapper}
            activeOpacity={1}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: item.userInfo.icon,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <CardGradient>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                {item.userInfo.name}
              </Text>
              <Text
                style={styles.status}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.dataInfo.intro}
              </Text>
            </CardGradient>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }
}

export default connect(null, {
  openPepupModal,
  getCeleb
})(CelebCard as any);