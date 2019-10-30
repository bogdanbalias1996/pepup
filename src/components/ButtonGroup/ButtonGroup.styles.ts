import { StyleSheet } from "react-native";
import { colorVioletGrey, colorBlack, defaultFont, boldFont, semiboldFont } from "../../variables";

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
    fontSize: 16,
    fontFamily: semiboldFont,
    textAlign: "left",
    lineHeight: 20,
    letterSpacing: 2
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
    fontSize: 20,
    fontFamily: boldFont,
    letterSpacing: 2,
    lineHeight: 22
  }
});
