import { StyleSheet } from "react-native";
import { colorVioletGrey, colorBlack, defaultFont } from "../../variables";

export default StyleSheet.create({
  container: {
    marginTop: 14,
    flexGrow: 0,
    flexShrink: 1
  },
  item: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative"
  },
  itemText: {
    color: colorVioletGrey,
    fontSize: 14,
    fontFamily: defaultFont,
    textAlign: "left",
    lineHeight: 29
  },
  itemFirst: {},
  itemLast: {},
  itemSelected: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  itemSelectedText: {
    color: colorBlack,
    fontSize: 24,
    fontFamily: defaultFont,
    lineHeight: 29
  }
});
