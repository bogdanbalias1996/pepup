import * as React from 'react';
import { WebViewPageScreenProps } from '.';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StatusBar } from 'react-native';

export class Component extends React.PureComponent<WebViewPageScreenProps> {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <WebView source={{ uri: params.uri }} />
      </SafeAreaView>
    );
  }
}

export const WebViewPageScreen = Component;
