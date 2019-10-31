import { StyleSheet } from "react-native";
import { colorVioletGrey, colorBlack, defaultFont, boldFont, semiboldFont } from "../../variables";

export default StyleSheet.create({
  container: {
    marginTop: 14,
    flexGrow: 0,
    flexShrink: 1,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  itemText: {
    color: colorVioletGrey,
    fontSize: 16,
    fontFamily: semiboldFont,
    alignSelf: 'center',
    textAlign: "left",
    letterSpacing: 2,
    paddingTop: 4,
  },
  itemFirst: {},
  itemLast: {},
  itemSelected: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  itemSelectedText: {
    paddingTop: 6,
    color: colorBlack,
    fontSize: 20,
    fontFamily: boldFont,
    letterSpacing: 2,
    alignSelf: 'center'
  }
});
