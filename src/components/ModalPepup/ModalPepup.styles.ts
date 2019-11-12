import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTextGrey,
  colorTextViolet,  
  colorGreen,
  colorTomato,
  semiboldFont,
  boldFont,
  defaultFont,  
  colorTextGreyIntro,
  colorModalTextGrey,
  colorCancelButton,
  colorInput,
} from '../../variables';

export default StyleSheet.create({       
  title: {
    fontSize: 22,
    fontFamily: boldFont,
    color: colorBlack
  },
  subTitle: {
    fontSize: 14,
    color: colorModalTextGrey,
    fontFamily: semiboldFont,
    marginTop: 7
  },
  nopepups: {
    textAlign: 'center',
    width: '100%',
    marginVertical: 30,
    fontSize: 16,
    color: colorTomato,
    fontFamily: defaultFont
  },
  contentBlock: {
    flexDirection: 'row', 
    marginTop: 19,
    marginBottom: 39
  },
  infoText: {
    flexShrink: 1, 
    color: colorTextGreyIntro,
    lineHeight: 22,
    marginLeft: 17
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
    color: colorTextGrey
  },
  carousel: {
    margin: 24,
    alignSelf: 'center'
  },
  reviews: {
    marginVertical: 10
  },
  rewiewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  numberRewiewsText: {
    fontSize: 12,
    color: colorTextGrey
  },
  allRewiewsButton: {
    color: colorTextViolet
  },
  commentCard: {
    padding: 16,
    backgroundColor: colorInput,
    borderRadius: 8
  },
  commentCardOnModal: {
    marginVertical: 8
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
    color: colorModalTextGrey,
    lineHeight: 22
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 24,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  modalFooterReviews: {
    justifyContent: 'center'
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 17,
    top: 23,
    zIndex: 999
  },
  btnSubmit: {
    flex: 1
  },
  btnSubmitClose: {
    width: 120
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },  
  rate: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rateText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  actualR: {
    fontSize: 12,
    color: colorTextGrey,
    fontFamily: defaultFont
  },
  generalR: {
    fontSize: 10,
    color: colorTextGrey,
    fontFamily: defaultFont
  },
  rateImg: {
    marginHorizontal: 3,
    width: 22,
    height: 22
  },
  footerText: {
    textAlign: 'right',
    fontSize: 11,
    fontFamily: defaultFont
  },
  greenText: {
    color: colorGreen
  },
  regularText: {
    color: colorTextGrey
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerReviews: {
    marginBottom: 35,
    marginTop: 15
  },
  rewiewsNumber: {
    justifyContent: 'flex-start',
    marginBottom: 8
  },
  scrollContent: { 
    paddingBottom: 190, 
    position: 'relative',
    marginHorizontal: 24    
  },
  section: {
    marginBottom: 33
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    marginBottom: 14
  }
});
