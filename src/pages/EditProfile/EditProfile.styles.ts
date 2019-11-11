import { StyleSheet } from 'react-native';
import { deviceInfoCheck } from '../../helpers';
import {
  colorLightGray,
  colorTomato,
  semiboldFont,
  colorItalic,
  colorCancelButton,
} from '../../variables';

export default StyleSheet.create({
  wrapContent: {
    backgroundColor: colorLightGray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 20,
    flex: 1,
    marginTop: deviceInfoCheck() ? 10 : 0,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  formErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formError: {
    color: colorTomato,
    textAlign: 'center',
    paddingLeft: 40,
    fontSize: 14,
  },
  btnSubmit: {
    width: 120
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    flexGrow: 1,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnCancel: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: colorCancelButton,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  private: {
    marginTop: 55,
  },
  privateTitle: {
    color: colorItalic,
    fontFamily: semiboldFont,
    fontSize: 16,
    paddingLeft: 40,
    marginBottom: 25,
  },
  scrollview: { flexShrink: 1 },
  scrollContent: { paddingBottom: 90 },
});
