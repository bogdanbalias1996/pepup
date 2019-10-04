import { StyleSheet } from "react-native";
import { boldFont } from "../../variables";

export default StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0
  },
  title: {
    color: "white",
    fontSize: 24,
    fontFamily: boldFont,
    textAlign: "center"
  },
  leftContainer: {
    minWidth: 20,
    paddingRight: 5,
    flexDirection: "row"
  },
  rightContainer: {
    minWidth: 20
  },
  back: {
    marginRight: 15
  }
});
