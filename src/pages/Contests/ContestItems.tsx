import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import format from 'date-fns/format';

import { openContestModal, getContest } from "./actions";

import { ContestItemsProps } from "./";
import { colorTextGray, colorBlack, defaultFont, semiboldFont, colorBlueberry } from "../../variables";
import { IGlobalState } from "../../coreTypes";
import { Loader } from "../../components/Loader/Loader";

const mapDispatchToProps = dispatch => ({
  openContestModal: () => dispatch(openContestModal()),
  getContest: (contestId: string) => dispatch(getContest(contestId))
});

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.ContestState.isFetching
});


export class Component extends React.PureComponent<ContestItemsProps> {
  renderItem = ({ item }) => {
    const { openContestModal, getContest, isFetching } = this.props;

    const getModal = () => {
      openContestModal();
      getContest(item.id);
    };

    return (
      <Loader size="large" color={colorBlueberry} isDataLoaded={!isFetching}>
      <TouchableOpacity
        onPress={() => getModal()}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.text}>{`${item.entries} entries`}</Text>
          <Text style={styles.text}>{`Ends: ${format(item.endDate, 'd MMM y')}`}</Text>
        </View>
        <View style={styles.wrapTitle}>
          <Image
            style={styles.imageLogo}
            source={item.avatar}
            resizeMode="cover"
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
      </Loader>
    );
  };

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

export const ContestItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    padding: 24,
    marginBottom: 24,
    marginHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  wrapTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 24,
    alignItems: "center"
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 8
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24
  }
});
