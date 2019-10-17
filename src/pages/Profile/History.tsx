import * as React from 'react';
import {connect} from 'react-redux';
import {Text, View, FlatList, StyleSheet, Image} from 'react-native';

import {HistoryItemsProps} from './';
import {
  colorBlack,
  italicFont,
  semiboldFont,
  colorDotGray,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {Dispatch} from 'redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const mapStateToProps = (state: IGlobalState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export class Component extends React.PureComponent<HistoryItemsProps> {
  renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => alert('Open pepup')}>
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image
              resizeMode="cover"
              style={styles.avatar}
              source={require('../../../assets/mock_avatar.jpg')}
            />
          </View>
          <View style={styles.textWrap}>
            <View>
              <Text style={styles.text}>{item.date}</Text>
              <Text style={styles.text}>{`${item.who} > ${item.toWhom}`}</Text>
            </View>
            <View style={styles.pepupWrap}>
              <Text numberOfLines={3} ellipsizeMode="tail" style={styles.pepup}>
                {item.pepup}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={true}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={(item: any) => item.id}
      />
    );
  }
}

export const History = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginRight: 16,
    padding: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 32
  },
  avatarWrap: {
    borderRightColor: colorDotGray,
    borderRightWidth: 1,
  },
  avatar: {
    width: 90,
    height: 120,
    borderRadius: 16,
    marginRight: 10,
  },
  textWrap: {
    justifyContent: 'flex-start',
    marginLeft: 14,
  },
  text: {
    lineHeight: 24,
    fontSize: 14,
    fontFamily: semiboldFont,
    color: colorBlack,
  },
  pepupWrap:{
      width: 200
  },
  pepup: {
    lineHeight: 24,
    fontFamily: italicFont,
    fontSize: 14,
    color: colorBlack,
    marginRight: 14
  },
});
