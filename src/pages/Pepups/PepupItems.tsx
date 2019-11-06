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

const mapStateToProps = (state: IGlobalState) => ({
  celebs: state.PepupState.celebs,
  isFetching: state.PepupState.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openPepupModal: () => dispatch(openPepupModal()),
  getCelebsByCategory: (id: string) => dispatch(getCelebsByCategory(id) as any),
  getFeaturedCelebs: () => dispatch(getFeaturedCelebs() as any),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  setCategory: (cat: string) => dispatch(setCategory(cat) as any)
});

export class Component extends React.Component<PepupItemsProps> {
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
            onPress={() => getModal()}
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
    const { celebs, isFetching, categoryId } = this.props;
    const categoryName = categoryId.toLowerCase();
    const celebsArr = celebs[categoryName];

    return (
      <View style={styles.celebsWrapper}>
        <Loader
          isDataLoaded={(celebsArr && celebsArr.length) || !isFetching}
          color={colorBlueberry}
          size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={styles.row}
            data={celebsArr}
            renderItem={this.renderItem}
            keyExtractor={(item: Celeb) => item.mappedUserId}
          />
        </Loader>
      </View>
    );
  }
}

export const PepupItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

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
