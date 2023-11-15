import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VideoCard from '../VideoCard';
import { semiboldFont, colorEventLabel, colorGrey2 } from '../../variables';

const FeaturedPepupListItem = ({ item }: any) => {
    return (
      <View style={{ marginRight: 16 }}>
        <VideoCard
          height={208}
          width={144}
          videoUrl='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
          withoutShadow={true}
          borderWidth={0}
        />
        <Text style={styles.title}>{item.for}</Text>
        <Text>{item.date}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
  title: {
    color: colorGrey2,
    marginTop: 9,
    fontFamily: semiboldFont,
    fontSize: 14,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: semiboldFont,
    color: colorEventLabel,
    marginTop: 6
  }
})

export default FeaturedPepupListItem;