import * as React from "react";
import { connect } from "react-redux";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import format from 'date-fns/format';

import { openEventModal, getEvent } from "./actions";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { EventItemsProps } from "./";
import { colorTextGray, colorBlack, defaultFont, semiboldFont } from "../../variables";

const mapDispatchToProps = dispatch => ({
  openEventModal: () => dispatch(openEventModal()),
  getEvent: (val: string) => dispatch(getEvent(val))
});

export class Component extends React.PureComponent<EventItemsProps> {
  renderItem = ({ item }) => {
    const { openEventModal, getEvent } = this.props;
    const getModal = () => {
      openEventModal();
      getEvent(item.id);
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.text}>
            {`${item.soldSeats} going • ${item.remainingSeats} spots left`}
          </Text>
          <Text style={styles.text}>{format(item.startDate, 'H:mm')}</Text>
        </View>
        <View style={styles.wrapTitle}>
          <Image
            style={styles.imageLogo}
            source={item.imageLogo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        {item.avatar && (
          <Image
            style={styles.avatar}
            source={item.avatar}
            resizeMode="cover"
          />
        )}
        <ButtonStyled
          type="border"
          onPress={() => getModal()}
          text="View Details"
        />
      </View>
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

export const EventItems = connect(
  null,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    padding: 16,
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
    marginVertical: 24,
    alignItems: "center"
  },
  imageLogo: {
    width: 72,
    height: "100%",
    marginRight: 16
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24
  },
  avatar: {
    width: "100%",
    height: 190,
    borderRadius: 8,
    marginBottom: 16
  }
});
