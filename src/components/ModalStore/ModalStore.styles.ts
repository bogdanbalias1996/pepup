import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGrey,
  colorLightGray,
  colorTextViolet,
  colorOrange,
  colorSwipeLine,
  semiboldFont,
  defaultFont
} from "../../variables";

export default StyleSheet.create({
  scrollView: { 
    flex: 1, 
    marginBottom: 10 
  },
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
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24
  },
  imagesWrap:{ flexDirection: "row", flex: 1 },
  carousel: {
    marginVertical: 24
  },
  imageCarousel: {
    width: 180,
    flex: 1,
    height: 200,
    marginRight: 8,
    borderRadius: 8
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },
  infoItem: {
    paddingRight: 10
  },
  infoLocation: {
    width: "67%"
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGrey,
    marginBottom: 8
  },
  infoValue: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack
  },
  infoLocationValue: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorTextViolet
  },
  modalFooter: {
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: 70,
    marginHorizontal: 24,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
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
    color: colorTextGrey,
    lineHeight: 22
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },
  wrapSale: {
    backgroundColor: colorOrange,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  saleText: {
    color: "#c5672a",
    fontSize: 14,
    fontFamily: defaultFont
  },
  wrapChanging: {
    flexDirection: "row",
    width: "100%",
    marginTop: 16
  },
  changeItem: {
    width: "50%"
  },
  sizeWrap: {
    flexDirection: "row"
  },
  sizeItem: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  sizeItemText: {
    color: colorBlack,
    fontSize: 14
  },
  modalCancelStyle: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15
  },
  modalOverlayStyle: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    paddingTop: 300,
    justifyContent: "flex-end"
  },
  modalCancelTextStyle: {
    color: "#1d7ee2",
    fontFamily: semiboldFont,
    fontSize: 20
  },
  modalOptionContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 0
  },
  modalOptionTextStyle: {
    color: colorBlack,
    fontSize: 20
  },
  insidePadding: { paddingHorizontal: 24, position: 'relative' },
  scrollContent:{ paddingBottom: 90 }
});
