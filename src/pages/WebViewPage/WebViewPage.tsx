import * as React from 'react';
import { WebView } from 'react-native-webview';
import { WebViewPageScreenProps } from './types';
import { SafeAreaView, StatusBar, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { IGlobalState } from '../../coreTypes';
import { closeSettingsModal } from './actions';
import PepupModal from '../../components/PepupModal/PepupModal';
import { Icon } from '../../components/Icon/Icon';
import { colorBlack } from '../../variables';
import styles from './WebViewPage.styles';

const mapStateToProps = (state: IGlobalState) => ({
  isSettingsModalOpen: state.SettingsState.isSettingsModalOpen,
  modalData: state.SettingsState.modalData || ''
});

const mapDispatchToProps = {
  closeSettingsModal
};

class WebViewPage extends React.PureComponent<WebViewPageScreenProps> {
  state = {
    heightDescription: 0
  };

  render() {
    const {
      isSettingsModalOpen,
      closeSettingsModal,
      modalData: link
    } = this.props;

    return (
      <PepupModal
        visible={isSettingsModalOpen}
        onRequestClose={closeSettingsModal}
        heightContent={this.state.heightDescription}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={styles.wrapModalContent}
            onLayout={event => {
              const { height } = event.nativeEvent.layout;
              this.setState({ heightDescription: height });
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={closeSettingsModal}>
              <Icon size={20} name="cancel" color={colorBlack} />
            </TouchableOpacity>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <WebView source={{ uri: link }} />
          </View>
        </SafeAreaView>
      </PepupModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);
