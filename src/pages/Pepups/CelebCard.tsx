import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './CelebCard.styles';

import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

// import {
//   openPepupModal,
//   getCelebsByCategory,
//   getCeleb,
//   setCategory,
//   getFeaturedCelebs
// } from '../../pages/Pepups/actions';

// const { openPepupModal, getCeleb } = this.props;
// const getModal = () => {
//   openPepupModal();
//   getCeleb(item.userInfo.id);
// };

const CelebCard = ({ item }) => (
    <View style={{ flex: 0.5 }}>
    <Card style={styles.card}>
      <TouchableOpacity
        // onPress={getModal}
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
);

export default CelebCard;