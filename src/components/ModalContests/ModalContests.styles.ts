import { StyleSheet } from "react-native";
import {
  colorBlack,
  colorTextGray,
  colorLightGray,
  colorSwipeLine,
  colorTomato,
  boldFont,
  semiboldFont,
  defaultFont
} from "../../variables";

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flexGrow: 1,
    paddingHorizontal: 24
  },
  swiperLine: {
    width: 64,
    height: 4,
    backgroundColor: colorSwipeLine,
    marginVertical: 20,
    alignSelf: "center"
  },
  modal: {
    marginTop: 40,
    zIndex: 100,
    flex: 1,
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
    left: 0,
    right: 0,
    marginHorizontal: 24,
    marginTop: 15,
    marginBottom: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0
  },
  modalFooterContest: {
    marginBottom: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0
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
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 15,
    marginRight: 10
  },
  conTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  form: {
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  formErrorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formError: {
    color: colorTomato,
    textAlign: "center",
    paddingLeft: 40,
    fontSize: 14
  },
  itemWrap: {
    marginTop: 25
  },
  wrap: {
    flex: 1, 
    marginBottom: 10,
    position: 'relative'
  },
  subTitle: {
    fontSize: 16,
    fontFamily: semiboldFont,
    color: colorBlack,
    marginBottom: 10
  },
  scrollContent:{ paddingBottom: 90 }
});
