import * as React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import {Dispatch} from 'redux';

import {
  openPepupModal,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs,
} from './actions';
import {PepupItemsProps, Celeb, Category, PepupsScreenDispatchProps} from './';
import {
  colorLightGray,
  colorBlueberry,
  semiboldFont,
  defaultFont,
} from '../../variables';
import {IGlobalState} from '../../coreTypes';
import {Loader} from '../../components/Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  celebs: state.PepupState.celebs,
  isFetching: state.PepupState.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openPepupModal: () => dispatch(openPepupModal()),
  getCelebsByCategory: (id: string) => dispatch(getCelebsByCategory(id) as any),
  getFeaturedCelebs: () => dispatch(getFeaturedCelebs() as any),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  setCategory: (cat: Category) => dispatch(setCategory(cat) as any),
});

export class Component extends React.PureComponent<PepupItemsProps> {
  renderItem = ({item}: any) => {
    const {openPepupModal, getCeleb} = this.props;
    const getModal = () => {
      openPepupModal();
      getCeleb(item.userInfo.id);
    };

    return (
      <TouchableOpacity onPress={() => getModal()} style={styles.card}>
        <Image
          style={styles.avatar}
          source={{uri: item.userInfo.icon}}
          resizeMode="cover"
        />
        <LinearGradient
          start={[0.5, 0.3]}
          end={[0.5, 1]}
          colors={['rgba(42, 41, 46, 0)', 'rgba(42, 41, 46, 0.6)']}
          style={styles.wrapContent}>
          <Text style={styles.name}>{item.userInfo.name}</Text>
          <Text style={styles.status} numberOfLines={2} ellipsizeMode="tail">
            {item.dataInfo.intro}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
    const {celebs, isFetching} = this.props;
    return (
      <View style={styles.celebsWrapper}>
        <Loader isDataLoaded={!isFetching} color={colorBlueberry} size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
            data={celebs}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
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
    justifyContent: "space-around"
  },
  card: {
    flex: 0.5,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 4,
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
    height: 220,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  wrapContent: {
    position: 'absolute',
    top: 8,
    width: '100%',
    height: '100%',
    padding: 12,
    justifyContent: 'flex-end',
    borderRadius: 16,
  },
  name: {
    fontSize: 18,
    fontFamily: semiboldFont,
    color: 'white',
    marginBottom: 10,
  },
  status: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorLightGray,
  },
  celebsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
