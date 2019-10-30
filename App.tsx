/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, StatusBar, YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
import * as Font from 'expo-font';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { getStore } from './src/configureStore';
import { setTopLevelNavigator, navigate } from './src/navigationService';
import { Loader } from './src/components/Loader/Loader';
import { IGlobalState } from './src/coreTypes';
import SplashScreen from 'react-native-splash-screen';

import { AuthenticationNavigator } from './src/navigators/AuthenticationNavigator';
import { MainNavigator } from './src/navigators/MainNavigator';
import { PagesNavigator } from './src/navigators/PagesNavigator';
import { colorBlueberry } from './src/variables';
import { SuccessfulAlert } from './src/components/SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from './src/components/ErrorState/ErrorState';
import { setInternetConnection } from './src/utils/connectionCheck/actions';
import { openError, closeError } from './src/pages/ErrorModal/actions';
import { authenticate } from './src/common/utils/session';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const FCM_TOKEN = 'fcmToken';
const AppNavigator = createSwitchNavigator({
  Pages: PagesNavigator,
  Auth: AuthenticationNavigator,
  Main: MainNavigator
});

const AppContainer = createAppContainer(AppNavigator);
const AppWithFontLoadedComponent = ({ isFontLoaded }: any) => {
  return (
    <Loader color={colorBlueberry} isDataLoaded={isFontLoaded}>
      <AppContainer
        ref={(navigatorRef: any) => {
          setTopLevelNavigator(navigatorRef);
          authenticate();
        }}
      />
    </Loader>
  );
};

const AppWithFontLoaded = connect((state: IGlobalState) => ({
  isFontLoaded: state.FontState.isFontLoaded
}))(AppWithFontLoadedComponent);

export default class App extends Component {
  messageListener!: () => any;

  async componentDidMount(): Promise<any> {
    SplashScreen.hide();

    await NetInfo.fetch().then(state => {
      getStore().dispatch(setInternetConnection(state.isConnected));
    });

    await NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        getStore().dispatch(
          openError({
            type: 'connectionFail',
            onPress: () => {
              getStore().dispatch(closeError());
            }
          })
        );
      }
    });

    await Font.loadAsync({
      'icons-font': require('./assets/fonts/icon-font/icons-font.ttf'),
      'montserrat-medium': require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
      'montserrat-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
      'montserrat-semibold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
      'montserrat-italic': require('./assets/fonts/montserrat/Montserrat-MediumItalic.ttf'),
      'ss-bold': require('./assets/fonts/samsung-sharp/ss-bold.ttf'),
      'ss-regular': require('./assets/fonts/samsung-sharp/ss-regular.ttf'),
      'ss-medium': require('./assets/fonts/samsung-sharp/ss-medium.ttf'),
    });

    getStore().dispatch({
      type: 'FONT_LOADED'
    });

    this.checkPermission();
    this.createNotificationListeners();
  }

  // TODO: Handle correctly when component is unmounted.
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  notificationListener:any;
  notificationOpenedListener:any;

  // TODO: Handle notifications
  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  }

  // TODO: Remove this. This is not production code
  showAlert(title: any, body: any) {
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      }
    }
  }

  // TODO: Remove the console log and dispatch an event to firebase analytics
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    return (
      <Provider store={getStore()}>
        <StatusBar barStyle="light-content" />
        <AppWithFontLoaded />
        <SuccessfulAlert />
        <ErrorModal />
      </Provider>
    );
  }
}
