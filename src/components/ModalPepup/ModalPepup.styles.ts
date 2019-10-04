import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTextGray,
  colorTextViolet,
  colorLightGray,
  colorVioletGrey,
  colorSwipeLine,
  colorGreen,
  semiboldFont,
  defaultFont
} from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    paddingHorizontal: 24
  },
  avatar: {
    width: '100%',
    height: 390,
    borderRadius: 16,
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontFamily: semiboldFont,
    color: colorBlack
  },
  subTitle: {
    fontSize: 12,
    color: colorTextGray,
    marginTop: 3
  },
  swiperLine: {
    width: 64,
    height: 4,
    backgroundColor: colorSwipeLine,
    marginVertical: 20,
    alignSelf: 'center'
  },
  infoText: {
    color: colorTextGray,
    lineHeight: 22
  },
  modal: {
    marginTop: 20,
    zIndex: 100,
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  carouselCard: {
    borderRadius: 16,
    marginRight: 8
  },
  carouselAvatar: {
    width: 140,
    height: 200,
    borderRadius: 16
  },
  carouselTitle: {
    color: colorBlack,
    marginVertical: 6
  },
  carouselDate: {
    fontSize: 12,
    color: colorTextGray
  },
  carousel: {
    marginVertical: 24,
    marginLeft: 24
  },
  reviews: {
    paddingHorizontal: 24
  },
  rewiewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  numberRewiewsText: {
    fontSize: 12,
    color: colorTextGray
  },
  allRewiewsButton: {
    color: colorTextViolet
  },
  commentCard: {
    padding: 16,
    backgroundColor: colorLightGray,
    borderRadius: 8
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  commentTitle: {
    color: colorBlack
  },
  commentText: {
    color: colorVioletGrey,
    lineHeight: 22
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 50,
    marginHorizontal: 24,
    backgroundColor: 'transparent'
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },
  wrapVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30
  },
  rate: { flexDirection: "row" },
  rateText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actualR: {
    fontSize: 12,
    color: colorTextGray,
    fontFamily: defaultFont
  },
  generalR: {
    fontSize: 10,
    color: colorTextGray,
    fontFamily: defaultFont
  },
  rateImg: {
    marginHorizontal: 3
  },
  footerText: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-end',
    marginRight: 24,
  },
  greenText: {
    color: colorGreen,
    fontSize: 11,
    fontFamily: defaultFont
  },
  regularText: {
    color: colorTextGray,
    fontSize: 11,
    fontFamily: defaultFont
  },
  scrollview: { flex: 1, marginBottom: 10 },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
