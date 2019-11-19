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
  colorModalTextGrey,
  colorCancelButton,
  colorInput,
  colorEventLabel
} from '../../variables';

export default StyleSheet.create({       
  text: {
    fontSize: 14,
    fontFamily: semiboldFont
  },  
  title: {
    fontSize: 24,
    fontFamily: boldFont,
    lineHeight: 30,    
    color: colorBlack,
    letterSpacing: 0.5
  },
  subTitle: {
    fontSize: 12,
    color: colorModalTextGrey,
    fontFamily: semiboldFont,
    paddingTop: 7
  },
  celebInfoBlock: {
    flexDirection: 'row', 
    marginTop: 21,
    marginBottom: 6
  },  
  infoText: {
    flexShrink: 1, 
    color: colorModalTextGrey,
    lineHeight: 22,
    marginLeft: 17
  },
  section: {
    marginTop: 33
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    marginBottom: 14
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
    marginTop: 32,
    marginBottom: 15    
  },
  rewiewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9
  },
  numberRewiewsText: {
    fontSize: 14,
    color: colorEventLabel
  },
  allRewiewsButton: {
    color: colorTextViolet,
    fontFamily: boldFont,
    fontSize: 15
  },
  commentCard: {
    paddingVertical: 19,  
    paddingHorizontal: 16,
    backgroundColor: colorInput,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(198, 198, 202, 0.25)'
  },  
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5    
  },
  commentTitle: {    
    fontFamily: boldFont,
    color: colorBlack
  },
  commentText: {
    color: colorModalTextGrey,
    lineHeight: 22
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
    paddingBottom: 30, 
    position: 'relative',
    marginHorizontal: 24    
  },  
  nopepups: {
    textAlign: 'center',
    width: '100%',
    marginVertical: 30,
    fontSize: 16,
    color: colorTomato,
    fontFamily: defaultFont
  }  
});
