import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { openEventModal, getEvent } from '../actions';

import { EventCardProps } from './types';
import styles from './EventCard.styles';

class EventCard extends PureComponent<EventCardProps> {
  onPress = () => {
    const { openEventModal, getEvent, item } = this.props;

    openEventModal();
    getEvent(item.id);
  };

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.text}>
              {`${item.soldSeats} going • ${item.remainingSeats} spots left`}
            </Text>
            <Text style={styles.text}>{item.startDt}</Text>
          </View>
          <View style={styles.wrapTitle}>
            <Image
              style={styles.imageLogo}
              source={{ uri: item.mediaBasePath + item.organizerLogo }}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.coverImage && (
            <Image
              style={styles.avatar}
              source={{ uri: item.mediaBasePath + item.coverImage }}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { openEventModal, getEvent })(EventCard as any);
