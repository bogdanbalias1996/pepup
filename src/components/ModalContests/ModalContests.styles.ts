import { StyleSheet } from 'react-native';
import {
  colorBlack,
  colorTomato,
  boldFont,
  semiboldFont,
  defaultFont,
  colorCancelButton,
  colorModalTextGrey,
  colorEventLabel
} from '../../variables';

export default StyleSheet.create({
  wrapModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flexGrow: 1,
    paddingHorizontal: 24
  },
  modal: {
    marginTop: 40,
    zIndex: 100,
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  descriptionTitle: {
    fontSize: 14,
    fontFamily: boldFont,
    color: colorBlack
  },
  title: {
    fontSize: 18,
    fontFamily: boldFont,
    color: colorBlack,
    lineHeight: 24,
    marginVertical: 16,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  infoBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15
  },
  infoItem: {
    width: '33%',
    paddingRight: 10
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: defaultFont,
    color: colorEventLabel,
    marginBottom: 8
  },
  infoValue: {
    fontSize: 16,
    fontFamily: defaultFont,
    color: colorBlack
  },
  modalFooter: {
    flexDirection: 'row',
    left: 0,
    right: 0,
    marginHorizontal: 24,
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0
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
  infoText: {
    color: colorModalTextGrey,
    lineHeight: 22,
    marginBottom: 10
  },
  btnSubmit: {
    flex: 1
  },
  text: {
    fontSize: 14,
    fontFamily: defaultFont
  },
  avatar: {
    flex: 1,
    height: 180,
    borderRadius: 8,
    shadowColor: colorBlack,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  conTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20
  },
  form: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  formErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formError: {
    color: colorTomato,
    textAlign: 'center',
    paddingLeft: 40,
    fontSize: 14
  },
  itemWrap: {
    marginTop: 25
  },
  wrap: {
    flex: 1,
    position: 'relative'
  },
  subTitle: {
    fontSize: 16,
    fontFamily: semiboldFont,
    color: colorBlack,
    marginBottom: 10
  },
  scrollContent: { paddingBottom: 90 },
  mediaWrap: {
    flexDirection: 'row'
  },
  mediaGrad: {
    height: 130,
    width: 80,
    borderRadius: 8
  },
  mediaBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemGalleryWrap: {
    height: 130,
    width: 80,
    borderRadius: 8,
    position: 'relative',
    marginLeft: 10
  },
  itemGallery: {
    height: 130,
    width: 80,
    borderRadius: 8
  },
  btnDelete: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    zIndex: 20
  },
  upperWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 75
  },
  gradient: {
    borderRadius: 8
  },
  cardAvatar: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 16,
    marginLeft: 4    
  },
  contestImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  }
});
