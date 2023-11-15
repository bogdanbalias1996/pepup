import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { openContestModal, getContest } from '../actions';

import styles from './ContestItem.styles';
import { ContestItemProps } from './types';
import Card from '../../../components/Card';
import CardGradient from '../../../components/CardGradient';

class ContestItem extends Component<ContestItemProps> {
  onPress = () => {
    const { openContestModal, getContest, item } = this.props;

    openContestModal();
    getContest(item.id);
  };

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.card}
        activeOpacity={1}
      >      
        <View style={styles.cardHeader}>
          <Text style={styles.text}>{`${item.entries} entries`}</Text>
          <Text style={styles.text}>{`Ends: ${item.endDt}`}</Text>
        </View>
        
        <View style={styles.wrapTitle}>
          <Card style={styles.avatar} radius={8}>
            <CardGradient style={styles.gradient} />
            <FastImage
              style={styles.imageLogo}
              source={{
                uri: item.mediaBasePath + item.organizerLogo,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Card>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  { openContestModal, getContest }
)(ContestItem as any);
