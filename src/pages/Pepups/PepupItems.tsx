import * as React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import {
  openPepupModal,
  getCelebsByCategory,
  getCeleb,
  setCategory
} from './actions';
import { PepupItemsProps } from './';
import {
  colorLightGray,
  colorBlueberry,
  semiboldFont,
  defaultFont
} from '../../variables';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';

const mapStateToProps = (state: IGlobalState) => ({
  celebs: state.PepupState.celebs,
  isFetching: state.PepupState.isFetching
});

const mapDispatchToProps = dispatch => ({
  openPepupModal: () => dispatch(openPepupModal()),
  getCelebsByCategory: (id: string) => dispatch(getCelebsByCategory(id) as any),
  getCeleb: (val: string) => dispatch(getCeleb(val) as any),
  setCategory: (cat: string) => dispatch(setCategory(cat))
});

export class Component extends React.PureComponent<PepupItemsProps> {
  renderItem = ({ item }) => {
    const { openPepupModal, getCeleb } = this.props;
    const getModal = () => {
      openPepupModal();
      getCeleb(item.userInfo.id);
    };

    return (
      <TouchableOpacity onPress={() => getModal()} style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: item.userInfo.icon }}
          resizeMode="cover"
        />
        <LinearGradient
          start={[0.5, 0.3]}
          end={[0.5, 1]}
          colors={['rgba(42, 41, 46, 0)', 'rgba(42, 41, 46, 0.6)']}
          style={styles.wrapContent}
        >
          <Text style={styles.name}>{item.userInfo.name}</Text>
          <Text style={styles.status}  numberOfLines={2} ellipsizeMode="tail">{item.dataInfo.intro}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    const { getCelebsByCategory, categoryId, setCategory } = this.props;

    getCelebsByCategory(categoryId);
    setCategory(categoryId);
  }

  render() {
    const { celebs, isFetching } = this.props;
    return (
      <View style={styles.celebsWrapper}>
        <Loader isDataLoaded={!isFetching} color={colorBlueberry} size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
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
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 220
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16
  },
  wrapContent: {
    position: 'absolute',
    top: 8,
    width: '100%',
    height: '100%',
    padding: 12,
    justifyContent: 'flex-end',
    borderRadius: 16
  },
  name: {
    fontSize: 18,
    fontFamily: semiboldFont,
    color: 'white',
    marginBottom: 10
  },
  status: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorLightGray
  },
  celebsWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});
