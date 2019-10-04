import { StyleSheet } from "react-native";
import { colorEndButtonInput, colorLightGray, semiboldFont } from "../../variables";

export default StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 24
  },
  titleWrap: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: semiboldFont,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
    marginHorizontal: 10,
    flexShrink: 1
  },
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingLeft: 16,
    flex: 1
  },
  wrapHeaderRight: {
    flexDirection: "row"
  },
  wrapHeaderRightIcon: {
    backgroundColor: colorEndButtonInput,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: 40,
    height: 40
  },
  rateIcon: {
    width: 20,
    height: 20
  }
});