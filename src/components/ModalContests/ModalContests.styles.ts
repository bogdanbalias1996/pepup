import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGray,
  colorLightGray,
  colorSwipeLine,
  boldFont,
  semiboldFont,
  defaultFont
} from "../../variables";

export default StyleSheet.create({
  scrollView: { flex: 1, marginBottom: 10 },
  wrapModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1
  },
  swiperLine: {
    width: 64,
    height: 4,
    backgroundColor: colorSwipeLine,
    marginVertical: 20,
    alignSelf: "center"
  },
  modal: {
    zIndex: 100,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    marginTop: 5
  },
  descriptionTitle: {
    fontSize: 14,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24,
    marginVertical: 16
  },
  infoBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24
  },
  infoItem: {
    width: "33%",
    paddingRight: 10
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    marginBottom: 8
  },
  infoValue: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 70,
    marginHorizontal: 24
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorLightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  infoText: {
    color: colorTextGray,
    lineHeight: 22
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },
  insidePadding: { paddingHorizontal: 24 }
});
