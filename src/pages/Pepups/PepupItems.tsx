import * as React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  openPepupModal,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs
} from './actions';
import { PepupItemsProps, Celeb } from './';
import {
  colorLightGray,
  colorBlueberry,
  boldFont,
  semiboldFont
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

export class Component extends React.Component<PepupItemsProps> {
  keyExstractor = (item: Celeb) => item.mappedUserId;

  shouldComponentUpdate(nextProps: PepupItemsProps) {
    const oldCelebs = this.extractCelebsByCategory(this.props.celebs, this.props.route.key);
    const newCelebs = this.extractCelebsByCategory(nextProps.celebs, nextProps.route.key);

    return newCelebs.length !== oldCelebs.length;
  }

  extractCelebsByCategory(celebs: { [key: string]: Array<Celeb> }, category: string): Celeb[]  {
    const categoryName = category.toLowerCase();
    const categoryCelebs = celebs[categoryName] || [];

    return categoryCelebs;
  }

  renderItem = ({ item }: any) => {
    const { openPepupModal, getCeleb } = this.props;
    const getModal = () => {
      openPepupModal();
      getCeleb(item.userInfo.id);
    };
    
    return (
      <View style={{ flex: 0.5 }}>
        <Card style={styles.card}>
          <TouchableOpacity
            onPress={getModal}
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
  };

  render() {
    const { celebs, route } = this.props;
    const celebsArr = this.extractCelebsByCategory(celebs, route.key);

    return (
      <View style={styles.celebsWrapper}>
        <Loader
          isDataLoaded={Boolean(celebsArr.length)}
          color={colorBlueberry}
          size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={styles.row}
            data={celebsArr}
            renderItem={this.renderItem}
            keyExtractor={this.keyExstractor}
          />
        </Loader>
      </View>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  celebs: state.PepupState.celebs,
  isFetching: state.PepupState.isFetching
});

const mapDispatchToProps = {
  openPepupModal,
  getCelebsByCategory,
  getFeaturedCelebs,
  getCeleb,
  setCategory
};

export const PepupItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  card: {
    marginVertical: 6,
    marginHorizontal: 6,
    height: 220
  },
  avatarWrapper: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  name: {
    fontSize: 16,
    fontFamily: boldFont,
    color: 'white',
    letterSpacing: 0.5,
    marginLeft: 8
  },
  status: {
    fontSize: 12,
    fontFamily: semiboldFont,
    color: colorLightGray,
    marginBottom: 10,
    marginLeft: 8
  },
  celebsWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});
