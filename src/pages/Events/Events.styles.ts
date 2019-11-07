import { StyleSheet } from "react-native";
import { colorEndButtonInput, colorLightGray } from "../../variables";

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingHorizontal: 14,
    flex: 1,
    marginTop: 10
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
  },
  tabs: {
    flex: 1
  },
  stylesTabsContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    paddingLeft: 5
  }
});
