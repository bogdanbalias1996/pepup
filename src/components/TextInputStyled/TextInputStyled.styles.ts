import { StyleSheet } from "react-native";
import { colorTomato, colorBlack, colorInputBackground, defaultFont } from "../../variables";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 8,
    height: 50
  },
  error: {
    borderWidth: 1,
    borderColor: colorTomato
  },
  input: {
    flexGrow: 1,
    paddingLeft: 0,
    color: colorBlack
  },
  inputBorder:{
    flexGrow: 1,
    color: colorBlack,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  errorText: {
    backgroundColor: colorTomato,
    paddingHorizontal: 10,
    paddingVertical: 3,
    zIndex: -10,
    fontSize: 15,
    color: "white",
    fontFamily: defaultFont
  },
  inputGradient: {
    borderRadius: 8,
    padding: 1
  }
});
