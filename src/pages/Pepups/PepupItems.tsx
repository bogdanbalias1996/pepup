import * as React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Dispatch } from 'redux';

import {
  openPepupModal,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs,
} from './actions';
import { PepupItemsProps, Celeb } from './';
import {
  colorLightGray,
  colorBlueberry,
  boldFont,
  semiboldFont,
  colorPastelPurple,
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  celebs: state.PepupState.celebs,
  isFetching: state.PepupState.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openPepupModal: () => dispatch(openPepupModal()),
  getCelebsByCategory: (id: string) => dispatch(getCelebsByCategory(id) as any),
  getFeaturedCelebs: () => dispatch(getFeaturedCelebs() as any),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  setCategory: (cat: string) => dispatch(setCategory(cat) as any),
});

export class Component extends React.PureComponent<PepupItemsProps> {
  renderItem = ({ item }: any) => {
    const { openPepupModal, getCeleb } = this.props;
    const getModal = () => {
      openPepupModal();
      getCeleb(item.userInfo.id);
    };

    return (
      <View style={{ flex: 0.5 }}>
        <TouchableOpacity
          onPress={() => getModal()}
          style={styles.card}
          activeOpacity={1}>
          <Loader color={colorPastelPurple} size="large" isDataLoaded={!!item}>
            <View style={styles.avatarWrapper}>
              <FastImage
                style={styles.avatar}
                source={{
                  uri: item.userInfo.icon,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <LinearGradient
                start={[0.5, 0.3]}
                end={[0.5, 1]}
                colors={['rgba(42, 41, 46, 0)', 'rgba(42, 41, 46, 0.6)']}
                style={styles.wrapContent}>
                <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{item.userInfo.name}</Text>
                <Text style={styles.status} numberOfLines={1} ellipsizeMode="tail">
                  {item.dataInfo.intro}
                </Text>
              </LinearGradient>
            </View>
          </Loader>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    const {
      getCelebsByCategory,
      categoryId,
      setCategory,
      getFeaturedCelebs,
    } = this.props;

    setCategory(categoryId);

    categoryId === 'Featured'
      ? getFeaturedCelebs()
      : getCelebsByCategory(categoryId);
  }

  render() {
    const { celebs, isFetching, categoryId } = this.props;
    const categoryName = categoryId.toLowerCase()
    const celebsArr = celebs[categoryName];

    return (
      <View style={styles.celebsWrapper}>
        <Loader isDataLoaded={(celebsArr && celebsArr.length) || !isFetching} color={colorBlueberry} size="large">
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
  mapDispatchToProps,
)(Component);

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  card: {
    padding: 4,
    marginVertical: 6,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 220
  },
  avatarWrapper: {
    backgroundColor: colorPastelPurple, width: '100%', borderRadius: 20
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  wrapContent: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    padding: 4,
    justifyContent: 'flex-end',
    borderRadius: 20,
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
    justifyContent: 'center',
  },
});
