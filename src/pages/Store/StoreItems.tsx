import * as React from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import { openStoreModal, setFilterValue } from "./actions";
import { StoreItemsProps } from "./";
import {
  colorBlack,
  colorTextRed,
  colorTextGray,
  colorOrange,
  defaultFont,
  semiboldFont
} from "../../variables";
import { RadioButtons } from "../../components/RadioButtons/RadioButtons";

const mapStateToProps = state => ({
  filterValue: state.StoreState.filterValue
});
const mapDispatchToProps = dispatch => ({
  openStoreModal: () => dispatch(openStoreModal()),
  setFilterValue: (val: boolean) => dispatch(setFilterValue(val))
});

const options = [
  {
    key: "1",
    text: "All"
  },
  {
    key: "2",
    text: "Featured"
  },
  {
    key: "3",
    text: "Deals"
  }
];

export class Component extends React.PureComponent<StoreItemsProps> {
  renderItem = ({ item }) => {
    const { openStoreModal } = this.props;
    return (
      <TouchableOpacity
        onPress={() => openStoreModal()}
        style={styles.card}
      >
        <Image style={styles.avatar} source={item.avatar} resizeMode="cover" />
        <View style={styles.wrapInfo}>
          <Text style={styles.name}>{item.name}</Text>

          {item.sale ? (
            <View style={styles.wrapPrizes}>
              <Text style={styles.salePrizeText}>{`$ + ${item.salePrize}`}</Text>
              <Text style={styles.prizeText}>{`$ + ${item.prize}`}</Text>
              <View style={styles.wrapSale}>
                <Text style={styles.saleText}>{`${item.sale}% OFF`}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.wrapPrizes}>
              <Text style={styles.salePrizeText}>{`$ + ${item.prize}`}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { filterValue, setFilterValue } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <RadioButtons
          options={options}
          value={filterValue}
          onPress={val => setFilterValue(val)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export const StoreItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative"
  },
  avatar: {
    width: "100%",
    height: 200,
    borderRadius: 16
  },
  wrapInfo: {
    width: "100%",
    justifyContent: "space-between",
    flex: 1
  },
  name: {
    width: "100%",
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack,
    marginVertical: 8,
    lineHeight: 22
  },
  wrapPrizes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4
  },
  salePrizeText: {
    color: colorTextRed,
    fontSize: 14,
    fontFamily: semiboldFont
  },
  prizeText: {
    color: colorTextGray,
    fontSize: 14,
    fontFamily: defaultFont,
    textDecorationLine: "line-through"
  },
  wrapSale: {
    backgroundColor: colorOrange,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  saleText: {
    color: colorBlack,
    fontSize: 10,
    fontFamily: defaultFont
  }
});
