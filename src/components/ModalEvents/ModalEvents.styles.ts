import { StyleSheet, Dimensions } from "react-native";
import {
  colorBlack,
  colorTextGray,
  colorLightGray,
  colorTextViolet,
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
  wrapTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
    alignItems: "center"
  },
  imageLogo: {
    width: 72,
    height: "100%",
    marginRight: 16
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: semiboldFont,
    color: colorBlack,
    lineHeight: 24
  },
  carousel: {
    marginTop: 0,
    marginLeft: 24,
  },
  imageCarouselWrap: {width: Dimensions.get("window").width - 48, marginRight: 10},
  imageCarousel: {
    width: Dimensions.get("window").width - 48,
    flex: 1,
    height: 170,
    borderRadius: 8
  },
  infoBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24
  },
  infoItem: {
    width: "33%",
    paddingRight: 10,
    marginBottom: 24
  },
  infoLocation: {
    width: "67%"
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorTextGray,
    marginBottom: 8
  },
  infoLabelQnt: {
    position: 'absolute',
    bottom: 40,
    flexWrap: 'nowrap',
    width: 101
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
    marginBottom: 60,
    paddingBottom: 20,
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
  },
  infoText: {
    color: colorTextGray
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont,
    lineHeight: 20
  },
  imgSet: {
    flexDirection: "row",
    flex: 1,
  },
  insidePadding: { paddingHorizontal: 24, position: 'relative' },
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
    paddingHorizontal: 0,
  },
  modalOptionTextStyle: {
    color: colorBlack,
    fontSize: 20,
  },
  changeItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative'
  },
  scrollContent: { paddingBottom: 90 }
});
