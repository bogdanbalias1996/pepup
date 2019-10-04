import { StyleSheet } from "react-native";
import { colorVioletGrey, colorBlack, defaultFont } from "../../variables";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 14,
    padding: 4
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "relative"
  },
  itemText: {
    color: colorVioletGrey,
    fontSize: 14,
    fontFamily: defaultFont,
    textAlign: "left",
    lineHeight: 24
  },
  itemFirst: {},
  itemLast: {},
  itemSelected: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  itemSelectedText: {
    color: colorBlack,
    fontSize: 24,
    fontFamily: defaultFont,
    lineHeight: 26
  }
});
