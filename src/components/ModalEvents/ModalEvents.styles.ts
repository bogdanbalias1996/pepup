import { StyleSheet, Dimensions } from 'react-native';
import {
  colorBlack,
  colorLightGray,
  colorTextViolet,
  semiboldFont,
  defaultFont,
  boldFont,
  colorDotGray,
  colorCancelButton,
  colorModalTextGrey,
  colorEventLabel,
  colorPicker
} from '../../variables';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 10
  },
  wrapModalContent: {
    flex: 1,
    paddingHorizontal: 24,
    position: 'relative',
    paddingTop: 20
  },
  modal: {
    zIndex: 100,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  imageLogo: {
    width: 72,
    height: '100%',
    marginRight: 16
  },
  title: {
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24,
    height: 24,
    marginVertical: 16
  },
  carousel: {
    marginTop: 0
  },
  imageCarouselWrap: {
    width: Dimensions.get('window').width - 64,
    marginHorizontal: 10,
    height: 170,
    marginVertical: 10
  },
  imageCarousel: {
    width: '100%',
    flex: 1,
    height: '100%',
    borderRadius: 8
  },
  infoBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24
  },
  infoItem: {
    width: '33%',
    paddingRight: 10,
    marginBottom: 24
  },
  infoLocation: {
    width: '67%'
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: defaultFont,
    color: colorEventLabel,
    marginBottom: 8
  },
  infoLabelQnt: {
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
    flexWrap: 'nowrap',
    width: 110
  },
  infoValue: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack
  },
  infoLocationValue: {
    fontSize: 16,
    fontFamily: boldFont,
    color: colorTextViolet
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: 1,
    marginBottom: 30,
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
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  infoText: {
    color: colorModalTextGrey,
    lineHeight: 22
  },
  btnSubmit: {
    flex: 0.7
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },
  imgSet: {
    flexDirection: 'row',
    flex: 1
  },
  insidePadding: { position: 'relative' },
  modalCancelContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 15
  },
  modalCancelStyle: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorLightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalOverlayStyle: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    paddingTop: 300,
    justifyContent: 'flex-end'
  },
  selector: {
    borderRadius: 30,
    width: 100,
    padding: 5,
    height: 44,
    justifyContent: 'center',
    borderColor: colorPicker
  },
  modalOptionStyle: {
    borderBottomColor: colorDotGray,
    borderBottomWidth: 1
  },
  modalCancelTextStyle: {
    color: colorBlack,
    fontFamily: semiboldFont,
    fontSize: 24
  },
  modalOptionContainer: {
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 0
  },
  modalOptionTextStyle: {
    color: colorBlack,
    fontSize: 20,
    fontFamily: semiboldFont
  },
  changeItem: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  scrollContent: { paddingBottom: 90 }
});
