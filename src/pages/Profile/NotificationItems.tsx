import * as React from "react";
import { connect } from "react-redux";
import { Text, View, FlatList, StyleSheet } from "react-native";

import { NotificationItemsProps } from "./";
import {
  colorTextGray,
  colorBlack,
  colorInputBackground,
  defaultFont
} from "../../variables";

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export class Component extends React.PureComponent<NotificationItemsProps> {
  renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
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

export const NotificationItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: colorInputBackground
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorTextGray
  },
  date: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    flexShrink: 1
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorBlack
  }
});
