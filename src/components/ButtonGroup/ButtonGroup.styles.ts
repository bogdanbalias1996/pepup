import { StyleSheet } from "react-native";
import { colorVioletGrey, colorBlack, defaultFont } from "../../variables";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 14,
    padding: 4,
    flex: 1
  },
  item: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    height: 80
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 80
  },
  itemSelectedText: {
    color: colorBlack,
    fontSize: 24,
    fontFamily: defaultFont,
    lineHeight: 26
  }
});
