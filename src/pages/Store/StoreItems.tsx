import * as React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  openStoreModal,
  setFilterValue,
  getProductsCategoryType,
  getProduct
} from './actions';
import { StoreItemsProps, Product } from './';
import {
  colorBlack,
  colorTextRed,
  colorTextGray,
  colorOrange,
  defaultFont,
  semiboldFont,
  colorLightOrange,
  colorLightGray
} from '../../variables';
import { RadioButtons } from '../../components/RadioButtons/RadioButtons';
import { IGlobalState } from '../../coreTypes';
import { Loader } from '../../components/Loader/Loader';
import FastImage from 'react-native-fast-image';

const mapStateToProps = (state: IGlobalState) => ({
  isFetchingCat: state.StoreState.isFetchingCat,
  filterValue: state.StoreState.filterValue,
  isFetching: state.StoreState.isFetching,
  goods: state.StoreState.goods,
  dataType: state.StoreState.dataType
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openStoreModal: () => dispatch(openStoreModal()),
  setFilterValue: (val: boolean) => dispatch(setFilterValue(val)),
  getProductsCategoryType: (type: string) =>
    dispatch(getProductsCategoryType(type) as any),
  getProduct: (val: string) => dispatch(getProduct(val) as any)
});

const options = [
  {
    key: '1',
    text: 'All'
  },
  {
    key: '2',
    text: 'Featured'
  },
  {
    key: '3',
    text: 'Deals'
  }
];

export class Component extends React.PureComponent<StoreItemsProps> {
  componentDidMount() {
    const { getProductsCategoryType, prodCatType } = this.props;

    getProductsCategoryType(prodCatType);
  }

  renderItem = ({ item }: any) => {
    const { openStoreModal, dataType, getProduct } = this.props;
    const getModal = () => {
      openStoreModal();
      getProduct(item.id);
    };

    return (
      dataType && (
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            onPress={() => getModal()}
            style={styles.card}
            activeOpacity={1}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: `${dataType.mediaBasePath}${item.icon}`,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.wrapInfo}>
              <Text style={styles.name}>{item.name}</Text>
              {item.discount ? (
                <View style={styles.wrapPrices}>
                  <Text
                    style={
                      styles.salePriceText
                    }>{`${item.defaultCurrency} ${item.sellingPrice}`}</Text>
                  <Text
                    style={
                      styles.priceText
                    }>{`${item.defaultCurrency} ${item.markedPrice}`}</Text>

                  <View style={styles.wrapSale}>
                    <Text
                      style={styles.saleText}>{`${item.discount}% OFF`}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.wrapPrices}>
                  <Text
                    style={
                      styles.salePriceText
                    }>{`${item.defaultCurrency} ${item.markedPrice}`}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )
    );
  };

  render() {
    const { filterValue, setFilterValue, goods, isFetching } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <RadioButtons
          options={options}
          value={filterValue}
          onPress={val => setFilterValue(val)}
        /> */}
        <Loader isDataLoaded={!isFetching} size="large" color={colorLightOrange}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={styles.row}
            data={goods}
            renderItem={this.renderItem}
            keyExtractor={(item: Product) => item.id}
          />
        </Loader>
      </View>
    );
  }
}

export const StoreItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  card: {
    flex: 0.5,
    padding: 8,
    marginVertical: 10,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative'
  },
  avatar: {
    width: '100%',
    height: 212,
    borderRadius: 16,
    backgroundColor: colorLightGray
  },
  wrapInfo: {
    width: '100%',
    justifyContent: 'space-between',
    flex: 1
  },
  name: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack,
    marginVertical: 8,
    lineHeight: 22
  },
  wrapPrices: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
    flexWrap: 'wrap'
  },
  salePriceText: {
    color: colorTextRed,
    fontSize: 14,
    fontFamily: semiboldFont
  },
  priceText: {
    color: colorTextGray,
    fontSize: 14,
    paddingHorizontal: 5,
    fontFamily: defaultFont,
    textDecorationLine: 'line-through'
  },
  wrapSale: {
    backgroundColor: colorOrange,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  saleText: {
    color: colorBlack,
    fontSize: 10,
    fontFamily: defaultFont
  }
});
