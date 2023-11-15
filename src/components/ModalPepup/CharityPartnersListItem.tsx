import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defaultFont, colorEventLabel } from '../../variables';
import FastImage from 'react-native-fast-image';

const CharityPartnersListItem = ({ item }: any) => {
  return (
    <View style={styles.itemWrapper}>
      <FastImage
        style={styles.charityImage}
        source={{
          uri: item.img,
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.charityTitle}>{`${item.title}`.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginRight: 15
  },
  charityImage: {
    width: 86, 
    height: 60, 
    borderRadius: 6
  },
  charityTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: colorEventLabel,
    fontFamily: defaultFont,
    marginTop: 4
  },
})

export default CharityPartnersListItem;