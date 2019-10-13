import { StyleSheet } from "react-native";
import { colorTextRed } from "../../variables";

export default StyleSheet.create({
  modal: {
    maxHeight: '100%',
    height: '100%'
  },
  wrapper: {
    height: `100%`,
    backgroundColor: 'black'
  },
  cameraView: {
    height: '100%'
  },
  videoControlsContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    top: 12,
    left: 22,
    bottom: 5,
    right: 22
  },
  videoControlsTop: {
    marginTop: 10
  },
  videoControlsBottom: {
    marginBottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btnRecordWrapper: {
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 36,
    width: 72,
    height: 72,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnRecord: {
    width: 56,
    height: 56,
    backgroundColor: colorTextRed,
    borderRadius: 28
  },
  btnRecordInProcess: {
    width: 32,
    height: 32,
    backgroundColor: colorTextRed,
    borderRadius: 4
  },
  time: {
    color: 'white',
    flexGrow: 1,
    textAlign: 'center'
  },
  btnCancelVideo: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAcceptVideo: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: colorTextRed,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
